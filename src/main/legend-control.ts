import { DomUtil } from 'leaflet';
import { Util } from 'leaflet';
import { ControlPosition } from 'leaflet';
import { Control } from 'leaflet';
import { getColor } from './colors';

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
    onAdd: function () {
        const controlDiv = DomUtil.create('div', 'info legend');
    
        const magnitudes = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 8];
        const labels = [
          '0 >= x < 1',
          '1 >= x < 2',
          '2 >= x < 3',
          '3 >= x < 4',
          '4 >= x < 5',
          '5 >= x < 6',
          '6 >= x < 7',
          '7+',
        ];
    
        // Para añadir las opciones dinámicamente
        for (var i = 0; i < magnitudes.length; i++) {
          controlDiv.innerHTML +=
            '<i style="background:' + getColor(magnitudes[i]) + '"></i>' + labels [i] +'<br>';
        }
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

export const legendData = (options?: {
    position?: ControlPosition, title?: string
}) => new LegendData(options);