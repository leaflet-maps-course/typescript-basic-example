import { circle, Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { legendData } from './legend-control';
import { earthQuakesGipuzkoa } from './earthqueakes-gipuzkoa';
import { getColor } from './colors';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);

tileLayerSelect().addTo(mymap);

earthQuakesGipuzkoa.forEach((point) =>
  circle([point.location.lat, point.location.lng], {
    // 1200 m máximo incluido y 200 el mínimo incluido
    radius: Math.floor(Math.random() * (1200 - 200 + 1)) + 200,
    // Coloreamos en base el valor de la magnitud
    color: getColor(point.magnitude)
  }).bindPopup(`
    <h3>${point.name}</h3>
    <hr>
    <h2>${point.magnitude}</h2>
  `).addTo(mymap)
);

legendData({
    title: 'Terremotos en Gipuzkoa'
}).addTo(mymap);