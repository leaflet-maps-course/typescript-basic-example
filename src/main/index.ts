import axios from 'axios';
import { circleMarker, geoJSON, Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
startMapTemplate(document, 'Plantilla - Mapa con Typescript');
const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);
tileLayerSelect().addTo(mymap);

// Para personalizar las zonas con diferentes colores
function getColor(numberValue: number) {
  return numberValue >= 0 && numberValue < 1
    ? "white"
    : numberValue >= 1 && numberValue < 2
    ? "green"
    : numberValue >= 2 && numberValue < 3
    ? "#6e8c51"
    : numberValue >= 3 && numberValue < 4
    ? "yellow"
    : numberValue >= 4 && numberValue < 5
    ? "#f5d142"
    : numberValue >= 5 && numberValue < 6
    ? "orange"
    : numberValue >= 6 && numberValue < 7
    ? "red"
    : "pink";
}

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