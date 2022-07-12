import csv
from inventory_report.importer.importer import Importer


class CsvImporter(Importer):
    @classmethod
    def import_data(self, path_to_csv_file):
        if ".csv" not in path_to_csv_file:
            raise ValueError("Arquivo inválido")

        csv_extraction = []
        with open(path_to_csv_file, mode="r", encoding="utf-8") as csv_file:
            reader = csv.reader(csv_file)
            headers, *data_array = reader
            for data in data_array:
                csv_extraction.append(dict(zip(headers, data)))

        return csv_extraction
