import { Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { legendData } from './legend-control';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);

tileLayerSelect().addTo(mymap);

// https://www.coordenadas.com.es/espana/pueblos-de-guipuzcoa/20/2
const earthQuakesGipuzkoa = [
    {
        town: 'Soraluze',
        location: [43.318996,-1.969857], // latitude / longitude.
        maginute: 3.56 // 0 - 10
    }
]

legendData({
    title: 'Terremotos en Gipuzkoa'
}).addTo(mymap);