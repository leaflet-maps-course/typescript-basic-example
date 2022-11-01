import axios from 'axios';
import { circleMarker, geoJSON, Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { getColor } from './colors';
import { legendData } from './legend-control';
startMapTemplate(document, 'Plantilla - Mapa con Typescript');
const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);
tileLayerSelect().addTo(mymap);



function style(feature: any) {
  return {
    fillColor: getColor(feature.properties.mag), // Llama a la función para colorear
    weight: 1,
    color: "white",
    fillOpacity: 1, // Por defecto es 0.2, le damos para que no trasparente
  };
}

function bindPopup(feature: any, layer: any) {
  layer.bindPopup(
    "<h1>" +
    feature.properties.mag +
    "</h1><p>name: " +
    feature.properties.place +
    "</p>"
  );
}

function pointToLayer (feature: any, latlng: any) {
  return circleMarker(latlng, { radius: 4.5 * feature.properties.mag });
}

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';

axios.get(URL).then(({ data }) => {
  const geoJsonValue = geoJSON(data, {
    onEachFeature: bindPopup,
    pointToLayer,
    style
  }).addTo(mymap);

  mymap.fitBounds([
    [
      geoJsonValue.getBounds().getNorthEast().lat,
      geoJsonValue.getBounds().getNorthEast().lng,
    ],
    [
      geoJsonValue.getBounds().getSouthWest().lat,
      geoJsonValue.getBounds().getSouthWest().lng,
    ],
  ]);
});

legendData({
  title: 'World EarthQuakes'
}).addTo(mymap);