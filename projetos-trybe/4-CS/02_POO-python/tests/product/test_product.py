from inventory_report.inventory.product import Product


def test_cria_produto():
    test_product = Product(
        1,
        "cadeira",
        "Target Corporation",
        "2021-02-18",
        "2025-09-17",
        "CR25",
        "empilhadas",
    )

    assert test_product.id == 1
    assert test_product.nome_do_produto == "cadeira"
    assert test_product.nome_da_empresa == "Target Corporation"
    assert test_product.data_de_fabricacao == "2021-02-18"
    assert test_product.data_de_validade == "2025-09-17"
    assert test_product.numero_de_serie == "CR25"
    assert test_product.instrucoes_de_armazenamento == "empilhadas"
