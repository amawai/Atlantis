import re
import json

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

        print(list)



parse_data("./Elevations.txt")