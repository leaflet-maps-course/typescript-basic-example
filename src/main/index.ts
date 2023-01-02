import { latLngBounds, Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';


startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);

// Data to add in control
const mapBounds = {
    northEast: {
        lat: 43.21180708932604,
        lng: -2.340774536132813
    },
    southWest: {
        lat: 43.13669397035837,
        lng: -2.484970092773438
    },
};

// Use data to center camera with correct zoom and position
const fitBoundsData = latLngBounds(mapBounds.southWest, mapBounds.northEast)

boundsData({
    bounds: mapBounds
}).addTo(mymap);

mymap.fitBounds(fitBoundsData);

tileLayerSelect().addTo(mymap);