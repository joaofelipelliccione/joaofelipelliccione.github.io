import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):
    time.sleep(1)
    req_headers = {"user-agent": "Fake user-agent"}

    try:
        response = requests.get(url, timeout=3, headers=req_headers)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except requests.ReadTimeout:
        return None


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(text=html_content)
    return selector.css("a.cs-overlay-link::attr(href)").getall()


# html = fetch("https://blog.betrybe.com")
# print(scrape_novidades(html))


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(text=html_content)
    return selector.css("a.next::attr(href)").get()


# html = fetch("https://blog.betrybe.com")
# print(scrape_next_page_link(html))


# Requisito 4
def scrape_noticia(html_content):
    selector = Selector(text=html_content)
    num_of_comments = [0]
    result = {}

    result["url"] = selector.xpath('//link[@rel="canonical"]/@href').get()
    result["title"] = selector.css("h1.entry-title::text").get().strip()
    result["timestamp"] = selector.css("li.meta-date::text").get()
    result["writer"] = selector.css("span.author a::text").get()

    comments_text = selector.css("div.post-comments .title-block::text").get()
    if comments_text is not None:
        num_of_comments = [
            int(s) for s in comments_text.split() if s.isdigit()
        ]
    result["comments_count"] = num_of_comments[0]

    result["summary"] = "".join(
        (selector.css(".entry-content > p:nth-of-type(1) *::text").getall())
    ).strip()
    result["tags"] = selector.css("section.post-tags ul li a::text").getall()
    result["category"] = selector.css(".category-style .label::text").get()

    return result


# Requisito 5
def get_tech_news(amount):
    html = fetch("https://blog.betrybe.com/")
    news_page = scrape_novidades(html)

    news_array = []
    while len(news_array) < amount:
        for link in news_page:
            news_page_html = fetch(link)
            news_array.append(scrape_noticia(news_page_html))

        try:
            html = fetch(scrape_next_page_link(html))
            news_page = scrape_novidades(html)
        except FileNotFoundError:
            break

    news_array = news_array[:amount]
    create_news(news_array)

    return news_array
