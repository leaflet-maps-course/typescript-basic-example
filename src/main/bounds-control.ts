import { DomUtil } from 'leaflet';
import { Util } from 'leaflet';
import { ControlPosition } from 'leaflet';
import { Control } from 'leaflet';

const BoundsData = Control.extend({
    // Inicialización
    initialize: function (options: {
        position: ControlPosition, bounds?: {
            northEast: { lat: number, lng: number },
            southWest: { lat: number, lng: number }
        }
    }) {
        if (!options.bounds) {
            throw Error('You must add North East and South West positions');
        }
        Util.setOptions(this, options);
    },
    // Opciones con sus valores por defecto
    options: {
        position: 'bottomleft', // bottomright, topright, topleft,
        bounds: {
            northEast: { lat: 0, lng: 0 },
            southWest: { lat: 0, lng: 0 }
        }
    },
    // Añadir la información para formar el control personalizado
    onAdd: function () {
        const controlDiv = DomUtil.create('div');

        const {northEast, southWest} = this.options.bounds;
        controlDiv.innerHTML = `North-East: ${northEast.lat}, ${northEast.lng} / South-West: ${southWest.lat},${southWest.lng}`;
        controlDiv.style.backgroundColor = 'white';
        controlDiv.style.textAlign = 'center';
        controlDiv.style.padding = '3px';
        controlDiv.style.borderRadius = '6px';
        controlDiv.style.border = '1px solid green';
        controlDiv.style.marginBottom = '5px';
        controlDiv.style.width = '100%';
        return controlDiv;
    },
});

export const boundsData = (options?: {
    position?: ControlPosition, bounds: {
        northEast: { lat: number, lng: number },
        southWest: { lat: number, lng: number }
    }
}) => new BoundsData(options);