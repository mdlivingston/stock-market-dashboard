import requests
from bs4 import BeautifulSoup
from flask import Response
from flask import jsonify


def main(request):
    quote_page = 'https://www.commerce.gov/index.php/data-and-reports/economic-indicators/dashboard'
    page = requests.get(quote_page)
    soup = BeautifulSoup(page.text, features="html.parser")
    mainSoup = soup.findAll(
        "h4")
    titleArray = []
    for h4 in mainSoup:
        for a in h4:
            isString = isinstance(a, str)
            if not isString:
                print(a.text)
                titleArray.append(a.text)

    mainSoup = soup.findAll(
        "h3", attrs={"class": ["year"]})

    yearArray = []
    for h3 in mainSoup:
        print(h3.text)
        yearArray.append(h3.text)

    mainSoup = soup.findAll(
        "td", attrs={"class": ["data", "label"]})

    dataArray = []
    for td in mainSoup:
        td = td.text.replace(' ', '')
        td = td.replace('\n', '')
        if(td != "CurrentRelease"):
            print(td)
            dataArray.append(td)

    mainArray = []
    mainArray.append(titleArray)
    mainArray.append(yearArray)
    mainArray.append(dataArray)

    return jsonify(mainArray)


#arr = indicators()
# print(arr)
