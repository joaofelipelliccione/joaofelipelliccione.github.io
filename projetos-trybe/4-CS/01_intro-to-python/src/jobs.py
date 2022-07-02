from functools import lru_cache
import csv


@lru_cache
def read(path):
    """Reads a file from a given path and returns its contents"""
    result_array = []
    with open(path, mode="r", encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        headers, *data_array = reader  # desempacotamento
        for data in data_array:
            result_array.append(dict(zip(headers, data)))

    return result_array


# print(read("./src/jobs.csv"))
# print(len(read("./src/jobs.csv")))
