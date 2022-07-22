from tech_news.database import search_news
import re
from datetime import datetime


# Requisito 6
def search_by_title(title):
    form_of_str_rgx = re.compile(title, re.IGNORECASE)
    array_from_mongo = search_news({"title": {"$regex": form_of_str_rgx}})

    array_of_tuples = [(obj["title"], obj["url"]) for obj in array_from_mongo]
    return array_of_tuples


# print(search_by_title("Bacana"))


# Requisito 7
def search_by_date(date):
    try:
        datetime_format_ISO = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise ValueError("Data inválida")
    else:
        str_date_br = datetime_format_ISO.strftime("%d/%m/%Y")
        array_from_mongo = search_news({"timestamp": str_date_br})

    array_of_tuples = [(obj["title"], obj["url"]) for obj in array_from_mongo]
    return array_of_tuples


# print(search_by_date("2003-10-23"))


# Requisito 8
def search_by_tag(tag):
    form_of_str_rgx = re.compile(tag, re.IGNORECASE)
    array_from_mongo = search_news(
        {"tags": {"$elemMatch": {"$regex": form_of_str_rgx}}}
    )

    array_of_tuples = [(obj["title"], obj["url"]) for obj in array_from_mongo]
    return array_of_tuples


# Requisito 9
def search_by_category(category):
    form_of_str_rgx = re.compile(category, re.IGNORECASE)
    array_from_mongo = search_news({"category": {"$regex": form_of_str_rgx}})

    array_of_tuples = [(obj["title"], obj["url"]) for obj in array_from_mongo]
    return array_of_tuples
