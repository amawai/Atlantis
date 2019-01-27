import re
from bs4 import BeautifulSoup
import requests

def parse_data(filename):
    with open(filename, 'r') as file:
        list = []
        lines = file.readlines()
        for i in lines:
            if i == '\n':
                continue

            if i is None:
                continue

            else:
                data = []
                string = re.search(r'\| \[\[([A-Za-z\s]*)\]\].* \|\| .*\[\[([A-Za-z\s]*)\]\].* \|\| \[\[([A-Za-z\s]*)\]\] \|\| ([A-Z0-9{.}0-9]*) \|\| ([A-Z0-9{.}0-9]*) \|\|(.*)\|\| ([0-9]*)', i)
                if string:
                    # print(string.group(1) + ' ' + string.group(2) + ' ' + string.group(3) + ' ' + string.group(4) + ' ' + string.group(5) + ' ' + string.group(6) + ' ' + string.group(7))
                    data.append(string.group(1))
                    data.append(string.group(2))
                    data.append(string.group(3))
                    data.append(string.group(4))
                    data.append(string.group(5))
                    data.append(string.group(6))
                    data.append(string.group(7))
                    list.append(data)

        return list

def get_populations(list):
    for i in list:
        print(i)
        if not i[5].strip():
            url = "https://en.wikipedia.org/wiki/" + re.sub(' ','_',i[1].strip())
            r = requests.get(url)
            data = r.text
            soup = BeautifulSoup(data,'html.parser')
            vcard = soup.findAll("table", {"class": "infobox geography vcard"})[0]
            import ipdb; ipdb.set_trace()


get_populations(parse_data("./Elevations.txt"))
