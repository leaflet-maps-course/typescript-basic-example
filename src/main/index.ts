import axios from 'axios';
// 3 añadir para leer información GeoJSON
import { geoJSON, Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
startMapTemplate(document, 'Plantilla - Mapa con Typescript');
const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);
tileLayerSelect().addTo(mymap);

// 5.- Formar Popup con información complementaria
function bindPopup(feature: any, layer: any) {
    layer.bindPopup(
      "<h1>" +
        feature.properties.mag +
        "</h1><p>name: " +
        feature.properties.place +
        "</p>"
    );
  }


// 1.- URL fuente de datos
const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
// 2.- Descargar datos de la fuente de datos
axios.get(URL).then(({ data }) => {
    // 3.- Asignamos en elemento "geoJSON"
  const geoJsonValue = geoJSON(data, {
    // 6.- Añadir apartado del popup
    onEachFeature: bindPopup
  }).addTo(mymap);

  // 4 Para centrar en base a la información del GeoJSON
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