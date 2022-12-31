import { Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';

// https://stackblitz.com/edit/angular-ivy-6e5zvw?file=src/app/app.component.ts

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.3082977, -1.9837398], 10);

const mapBounds = {
    northEast: {
        lat: mymap.getBounds().getNorthEast().lat,
        lng: mymap.getBounds().getNorthEast().lng
    },
    southWest: {
        lat: mymap.getBounds().getSouthWest().lat,
        lng: mymap.getBounds().getSouthWest().lng
    },
};
boundsData({
    bounds: mapBounds
}).addTo(mymap);

tileLayerSelect().addTo(mymap);