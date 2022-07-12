from datetime import date, datetime


class SimpleReport:
    @classmethod
    def generate(self, products_array):
        todays_date = date.today()

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

        oldest_fab_date = min(fab_dates_array)
        youngest_val_date = min(val_dates_array)
        most_frequent_company = max(
            set(company_names_array), key=company_names_array.count
        )

        return (
            f"Data de fabricação mais antiga: {oldest_fab_date}\n"
            f"Data de validade mais próxima: {youngest_val_date}\n"
            f"Empresa com mais produtos: {most_frequent_company}"
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
#         "id": 2,
#         "nome_do_produto": "Lápis",
#         "nome_da_empresa": "Papelaria Solar",
#         "data_de_fabricacao": "2018-02-08",
#         "data_de_validade": "2020-05-10",
#         "numero_de_serie": "FR10",
#         "instrucoes_de_armazenamento": "Ao abrigo de luz solar",
#     },
# ]

# print(SimpleReport.generate(products_test_array))
