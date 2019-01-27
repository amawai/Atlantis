var map = new maptalks.Map('map', {
  center: [0,20],
  zoom: 2.5,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    subdomains: ['a','b','c','d'],
    attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy;'
  })
});
map.config('draggable', true);
map.config('zoomable', true);

dontColor = '#3f3'
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

randomCircle = () => {
  return {
    "lng":Math.random()*180 - 90,
    "lat":Math.random()*180 - 90,
    "size":Math.random()*4,
  }
}


