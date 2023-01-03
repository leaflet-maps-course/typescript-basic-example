import axios from 'axios';
import { Map, marker, MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView(
  [43.13352167963092, -2.1722224000000168],
  10
);

// Data to add in control
const mapBounds = {
  northEast: {
    lat: mymap.getBounds().getNorthEast().lat,
    lng: mymap.getBounds().getNorthEast().lng,
  },
  southWest: {
    lat: mymap.getBounds().getSouthWest().lat,
    lng: mymap.getBounds().getSouthWest().lng,
  },
};

boundsData({
  bounds: mapBounds,
}).addTo(mymap);

tileLayerSelect().addTo(mymap);

const queryOverPass = `[out:json][timeout:25];
  area(id:3600349015)->.searchArea;
  (
  node["natural"="peak"](area.searchArea);
  way["natural"="peak"](area.searchArea);
  relation["natural"="peak"](area.searchArea);
  );
  out body;`;

// add new layer to group markers
const markersLayer = new MarkerClusterGroup();

const results: Array<{ lat: number; lon: number }> = [];

axios
  .post('https://overpass-api.de/api/interpreter', queryOverPass)
  .then(({ data }) => {
    data.elements.map(
      (element: {
        lat: number;
        lon: number;
        id: number;
        tags: {
          alt_name: string;
          name: string;
          ele: number;
        };
      }) => {
        marker([element.lat, element.lon])
          .addTo(markersLayer)
          .bindPopup(
            element.tags && element.tags.name && element.tags.ele
              ? `${element.tags.name} (${element.tags.ele}m)`
              : String(element.id)
          ); // AQUÍ ES DONDE EVALUAMOS SI EXISTE LA INFORMACIÓN Y LA ASIGNAMOS
        // Almacenar los resultados
        results.push({ lat: element.lat, lon: element.lon });
      }
    );

    markersLayer.addTo(mymap);

    // Centrar cámara en base a los resultados
    mymap.fitBounds([
      ...results.map((point) => [point.lat, point.lon] as [number, number]),
    ]);
  });
