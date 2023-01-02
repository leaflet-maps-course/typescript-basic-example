import axios from 'axios';
import { Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';


startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView([43.174250529842205, -2.4128723144531254], 13);

// Data to add in control
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

console.log(`${mapBounds.southWest.lat},${mapBounds.southWest.lng},${mapBounds.northEast.lat}, ${mapBounds.northEast.lng}`);

boundsData({
    bounds: mapBounds
}).addTo(mymap);

tileLayerSelect().addTo(mymap);

// Define boundaries box with dynamic limits use control reference
const bbox = `${mymap.getBounds().getSouth()},${mymap
    .getBounds()
    .getWest()},${mymap.getBounds().getNorth()},${mymap.getBounds().getEast()}`;
  
  const queryOverPass = `
  [bbox:${bbox}]
  [out:json][timeout:25];( 
  node["amenity"="drinking_water"]; 
  node["natural"="spring"]; 
  node["drinking_water"="yes"]; 
  );out center;>;`

axios
  .post("https://overpass-api.de/api/interpreter", queryOverPass)
  .then(({ data }) => console.log(data));