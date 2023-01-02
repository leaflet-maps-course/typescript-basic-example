import axios from 'axios';
import { Map } from 'leaflet';
import { startMapTemplate } from '../assets/template/content';
import { tileLayerSelect } from '../config/functions';
import { boundsData } from './bounds-control';
import { PLACES_LIST_LOCATIONS } from './locations';


startMapTemplate(document, 'Plantilla - Mapa con Typescript');

const mymap = new Map('map').setView(PLACES_LIST_LOCATIONS.ADDIS_ABEBA_ETIOPIA as [number, number], 13);

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