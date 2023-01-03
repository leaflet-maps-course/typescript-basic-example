import axios from 'axios';
import { Map, marker } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';
import { PLACES_LIST_LOCATIONS } from './locations';

startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView(
  PLACES_LIST_LOCATIONS.HONOLULU_HAWAI_EEUU as [number, number],
  13
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

console.log(
  `${mapBounds.southWest.lat},${mapBounds.southWest.lng},${mapBounds.northEast.lat}, ${mapBounds.northEast.lng}`
);

boundsData({
  bounds: mapBounds,
}).addTo(mymap);

tileLayerSelect().addTo(mymap);

const queryOverPass = `[out:json][timeout:25];
  area(id:3602851736)->.searchArea;
  (
  node["natural"="peak"](area.searchArea);
  way["natural"="peak"](area.searchArea);
  relation["natural"="peak"](area.searchArea);
  );
  out body;`;

const results: Array<{ lat: number; lon: number }> = [];

axios
  .post('https://overpass-api.de/api/interpreter', queryOverPass)
  .then(({ data }) => {
    data.elements.map((element: {lat: number, lon: number, id: number, tags: {
        alt_name: string, name: string, ele: number
      }}) => {
        marker([element.lat, element.lon]).addTo(mymap).bindPopup(
            (element.tags && element.tags.name && element.tags.ele) ? `${element.tags.name} (${element.tags.ele}m)` : String(element.id)
          ); // AQUÍ ES DONDE EVALUAMOS SI EXISTE LA INFORMACIÓN Y LA ASIGNAMOS
      // Almacenar los resultados
      results.push({ lat: element.lat, lon: element.lon });
    });

    // Centrar cámara en base a los resultados
    mymap.fitBounds([
      ...results.map((point) => [point.lat, point.lon] as [number, number]),
    ]);
  });
