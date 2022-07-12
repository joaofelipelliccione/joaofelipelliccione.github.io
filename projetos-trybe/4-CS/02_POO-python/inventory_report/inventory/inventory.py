import csv
import json
import xmltodict
from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    def read_csv_files(path_to_csv_file):
        csv_extraction = []
        with open(path_to_csv_file, mode="r", encoding="utf-8") as csv_file:
            reader = csv.reader(csv_file)
            headers, *data_array = reader
            for data in data_array:
                csv_extraction.append(dict(zip(headers, data)))

        return csv_extraction

    def read_json_files(path_to_json_file):
        json_extraction = []
        with open(path_to_json_file) as json_file:
            data = json.load(json_file)
            json_extraction.append(data)

        return json_extraction

    def read_xml_files(path_to_xml_file):
        with open(path_to_xml_file, "r") as file:
            obj = xmltodict.parse(file.read())
            obj_json = json.dumps(obj)
            xml_array_extraction = json.loads(obj_json)["dataset"]["record"]

        return xml_array_extraction

    @classmethod
    def import_data(self, path_to_file, type_of_report):
        print(type_of_report)
        products_array = []

        if ".csv" in path_to_file:
            extraction = self.read_csv_files(path_to_file)
            products_array.append(extraction)
        if ".json" in path_to_file:
            extraction = self.read_json_files(path_to_file)[0]
            products_array.append(extraction)
        if ".xml" in path_to_file:
            extraction = self.read_xml_files(path_to_file)
            products_array.append(extraction)
        if type_of_report == "simples":
            return SimpleReport.generate(products_array[0])

        return CompleteReport.generate(products_array[0])


# print(
#     Inventory.import_data("./inventory_report/data/inventory.xml", "simples")
# )
