import json
from inventory_report.importer.importer import Importer


class JsonImporter(Importer):
    @classmethod
    def import_data(self, path_to_json_file):
        if ".json" not in path_to_json_file:
            raise ValueError("Arquivo inválido")

        json_extraction = []
        with open(path_to_json_file) as json_file:
            data = json.load(json_file)
            json_extraction.append(data)

        return json_extraction[0]
