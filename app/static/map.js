var map = new maptalks.Map('map', {
  center: [0,20],
  zoom: 2.5,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
    subdomains: ['a','b','c','d'],
    attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy;'
  })
});
map.config('draggable', true);
map.config('zoomable', true);

dontColor = '#333'
floodColor = '#f33'

addCircles = (circles) => {
  circles = circles.map((c) => {
    let size = c.size * 120000;
    return new maptalks.Circle([c.lat, c.lng], size, {
      symbol: {
        lineColor: '#fff',
        lineWidth: 0.5,
        polygonFill: dontColor,
        polygonOpacity: 0.4
      }
    });
  });
  console.log(circles)
  new maptalks.VectorLayer('vector')
    .addGeometry(circles)
    .addTo(map);
  return circles
}

checkFloods = (circles__data, circles) => {
  let displacedPersons = 0;
  for (var i=0; i < circles__data.length; i++) {
    //console.log(circles_data[i]["alt"])
    if (parseFloat(circles__data[i]["alt"]) < 0) {
      circleFlood(circles[i]);
      displacedPersons += circles__data[i]["pop"];
    } else {
      circleDont(circles[i]);
    }
  }
  $("#displacedppl").text(displacedPersons.toLocaleString());
}

circleAppear = (circle) => {
  circle.updateSymbol({
    'polygonOpacity' : 0.4
  });
}
circleGone = (circle) => {
  circle.updateSymbol({
    'polygonOpacity' : 0
  });
}
circleFlood = (circle) => {
  circle.updateSymbol({
    'polygonFill' : floodColor
  });
}
circleDont = (circle) => {
  circle.updateSymbol({
    'polygonFill' : dontColor
  });
}


