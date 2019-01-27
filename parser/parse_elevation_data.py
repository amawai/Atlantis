import re
from bs4 import BeautifulSoup
import requests

def parse_data(filename):
    with open(filename, 'r') as f:
        info = []
        lines = f.readlines()
        for i in lines:
            info.append([e.strip() for e in i.split("#")])
        return info
def get_populations(info):
    for i in info:
        if not i[5].strip():
            url = "https://en.wikipedia.org/wiki/" + re.sub(' ','_',i[1].strip())
            r = requests.get(url)
            data = r.text
            soup = BeautifulSoup(data,'html.parser')
            try:
                vcard = soup.findAll("table", {"class": "infobox geography vcard"})[0]
                i[5] = re.findall(r'Population(?:.|\n)* (?:\d+,){1,2}\d{3,}(?:\s|\n)', vcard.prettify())[0].split()[-1]
            except Exception as e:
                i[5] = '0'
            i[5] = str(int(i[5].replace(',', '').replace(' ','')))
            print(i)
    with open("ElevationsPop.txt", "w+") as f:
         f.write("\n".join(["|".join(i) for i in info]))

get_populations(parse_data("./Elevations.txt"))
