from inventory_report.reports.simple_report import SimpleReport
from datetime import date, datetime


class CompleteReport(SimpleReport):
    @classmethod
    def generate(self, products_array):
        todays_date = date.today()
        stock_per_company = {}

        fab_dates_array = [
            datetime.strptime(product["data_de_fabricacao"], "%Y-%m-%d").date()
            for product in products_array
        ]
        val_dates_array = [
            datetime.strptime(product["data_de_validade"], "%Y-%m-%d").date()
            for product in products_array
            if datetime.strptime(
                product["data_de_validade"], "%Y-%m-%d"
            ).date()
            > todays_date
        ]
        company_names_array = [
            product["nome_da_empresa"] for product in products_array
        ]

        most_frequent_company = max(
            set(company_names_array), key=company_names_array.count
        )

        for company in company_names_array:
            if not stock_per_company.get(company):
                stock_per_company[company] = 1
            else:
                stock_per_company[company] += 1

        stocked_products_report = "\n"
        for company in stock_per_company:
            stocked_products_report += (
                f"- {company}: {stock_per_company[company]}\n"
            )

        return (
            f"Data de fabricação mais antiga: {min(fab_dates_array)}\n"
            f"Data de validade mais próxima: {min(val_dates_array)}\n"
            f"Empresa com mais produtos: {most_frequent_company}\n"
            f"Produtos estocados por empresa:"
            f"{stocked_products_report}"
        )


# products_test_array = [
#     {
#         "id": 1,
#         "nome_do_produto": "CADEIRA",
#         "nome_da_empresa": "Forces of Nature",
#         "data_de_fabricacao": "2022-04-04",
#         "data_de_validade": "2023-02-09",
#         "numero_de_serie": "FR48",
#         "instrucoes_de_armazenamento": "Conservar em local fresco",
#     },
#     {
#         "id": 2,
#         "nome_do_produto": "Borracha",
#         "nome_da_empresa": "Papelaria Solar",
#         "data_de_fabricacao": "2021-07-04",
#         "data_de_validade": "2029-02-09",
#         "numero_de_serie": "FR48",
#         "instrucoes_de_armazenamento": "Ao abrigo de luz solar",
#     },
#     {
#         "id": 3,
#         "nome_do_produto": "Lápis",
#         "nome_da_empresa": "Papelaria Solar",
#         "data_de_fabricacao": "2018-02-08",
#         "data_de_validade": "2020-05-10",
#         "numero_de_serie": "FR10",
#         "instrucoes_de_armazenamento": "Ao abrigo de luz solar",
#     },
# ]

# print(CompleteReport.generate(products_test_array))
