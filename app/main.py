# -*- coding: utf-8 -*-
import math
from flask import Flask, render_template, json
app = Flask(__name__)

@app.route("/")
def index():
    circles = []
    with open ("elepop.txt") as f:
        for line in f:
            l = [e.strip() for e in line.split("|")]
            c = {}
            try:
                c["lng"] = float(l[3].replace("N", "").replace("S", "-")
                                 .replace("°",".").replace('′',"").replace("″",""))
                c["lat"] = float(l[4].replace("E", "").replace("W", "-")
                                 .replace("°",".").replace('′',"").replace("″",""))
                c["size"] = math.sqrt(math.sqrt(math.sqrt(
                    int(l[5].replace(" ","").replace(",",""))
                    )))/2.5
                c["alt"] = int(l[6].split()[-1])
                c["pop"] = int(l[5].replace(" ","").replace(",",""))
            except Exception as e:
                print(e)
                print(l)
            circles.append(c)
    return render_template("index.html", circles=circles)

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=True, port=80)
