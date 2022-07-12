import xmltodict
import json
from inventory_report.importer.importer import Importer


class XmlImporter(Importer):
    @classmethod
    def import_data(self, path_to_xml_file):
        if ".xml" not in path_to_xml_file:
            raise ValueError("Arquivo inválido")

        with open(path_to_xml_file, "r") as file:
            obj = xmltodict.parse(file.read())
            obj_json = json.dumps(obj)
            xml_array_extraction = json.loads(obj_json)["dataset"]["record"]

        return xml_array_extraction
