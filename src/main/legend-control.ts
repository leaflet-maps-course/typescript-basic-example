import { DomUtil } from 'leaflet';
import { Util } from 'leaflet';
import { ControlPosition } from 'leaflet';
import { Control } from 'leaflet';

const LegendData = Control.extend({
    // Inicialización
    initialize: function(options: {
        position: ControlPosition, title: string
    }) {
        Util.setOptions(this, options);
    },
    // Opciones con sus valores por defecto
    options: {
        position: 'bottomleft', // bottomright, topright, topleft
        title: 'Earthquakes'
    },
    // Añadir la información para formar el control personalizado
    onAdd: function() {
        const controlDiv = DomUtil.create('span', 'legend');
        controlDiv.innerHTML = `<h5>${this.options.title}</h5><span>Content legend data</span>`;
        controlDiv.style.backgroundColor = 'white';
        controlDiv.style.textAlign = 'center';
        controlDiv.style.padding = '3px';
        controlDiv.style.borderRadius = '6px';
        controlDiv.style.border = '1px solid green';
        controlDiv.style.marginBottom = '5px';
        controlDiv.style.width = '100%';
        return controlDiv;
    }
});

export const legendData = (options?: {
    position?: ControlPosition, title?: string
}) => new LegendData(options);