import axios from "axios";
import { Map } from "leaflet";
import { startMapTemplate } from "../assets/template/content";
import { tileLayerSelect } from "../config/functions";
import { boundsData } from "./bounds-control";

// https://stackblitz.com/edit/angular-ivy-6e5zvw?file=src/app/app.component.ts

startMapTemplate(document, "Plantilla - Mapa con Typescript");

const mymap = new Map("map").setView([42.8540316, -2.7121775], 13);

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

// Call to Overpass API to take Overpass query with OverpassQL

/**
 * En Leaflet podemos obtenerlo de esta manera
 * southern-most latitude (1), western-most longitude (2), northern-most latitude(3), eastern-most longitude (4).
 * this.map.getBounds().getSouthWest().lat === this.map.getBounds().getSouth() (1),
 * this.map.getBounds().getSouthWest().lng === this.map.getBounds().getWest()  (2),
 * this.map.getBounds().getNorthEast().lat === this.map.getBounds().getNorth() (3),
 * this.map.getBounds().getNorthEast().lng === this.map.getBounds().getEast()  (4)
 */
const bbox2 = `${mymap.getBounds().getSouth()},${mymap
  .getBounds()
  .getWest()},${mymap.getBounds().getNorth()},${mymap.getBounds().getEast()}`;

console.log(`bbox:${bbox2}`);

const exampleSoraluze = `
[bbox:${bbox2}]
[out:json][timeout:25];(
node["amenity"="drinking_water"];
node["natural"="spring"];
node["drinking_water"="yes"];
);out center;>;`;

console.log(exampleSoraluze)

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

tileLayerSelect().addTo(mymap);
