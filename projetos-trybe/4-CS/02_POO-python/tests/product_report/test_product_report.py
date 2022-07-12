from inventory_report.inventory.product import Product


def test_relatorio_produto():
    report = (
        "O produto cadeira fabricado em 2021-02-18 por Target Corporation"
        + " com validade até 2025-09-17 precisa ser armazenado empilhadas."
    )

    test_product = Product(
        1,
        "cadeira",
        "Target Corporation",
        "2021-02-18",
        "2025-09-17",
        "CR25",
        "empilhadas",
    )

    assert str(test_product) == report
