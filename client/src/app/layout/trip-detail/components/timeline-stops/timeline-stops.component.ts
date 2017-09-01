import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TripService } from './../../../../shared/services/trip.services';
import { Trip } from './../../../../shared/dto';
import * as ol from 'openlayers';

//declare var ol: any;

declare var $: any;

@Component({
  selector: 'app-timeline-stops',
  templateUrl: './timeline-stops.component.html',
  styleUrls: ['./timeline-stops.component.scss'],
  providers: [TripService]
})
export class TimelineStopsComponent implements OnInit {

  //ol: any;

  @Input() trip: Trip;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  map = null;
  markerLayer = null;


  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  deleteTrip(id) {
    this.delete.emit(id);
  }



/*

  drawMap(data: any) {

    this.map.removeLayer(this.markerLayer);

    if (data != null && data.obuId != null) {
      var coords:[number, number] = [];
      coords[0] = data.longitude;
      coords[1] = data.latitude;

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 1],
          scale: 0.5,
          opacity: 0.75,
          src: 'https://openlayers.org/en/v3.19.1/examples/data/icon.png'
        }))
      });

      var transform = ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857');

      var feature = new ol.Feature({
        geometry: new ol.geom.Point(transform)
      });
      feature.setStyle(iconStyle);
      feature.set('obuId', data.obuId);
      feature.set('coords', '[' + data.latitude + ', ' + data.longitude + ']');
      var d = new Date(data.last).toISOString();//.slice(0, 10);
      feature.set('last', d);


      this.markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [feature]
        })
      });
      this.markerLayer.set('name', 'markerLayer');

      this.map.addLayer(this.markerLayer);
      this.map.setView(new ol.View({
        center: transform,
        zoom: 18
      }));

    }
  }

*/

  initMap() {

    let coords:[number, number] = [11.162, 43.829];
    var transform = ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857');
    
    this.map = new ol.Map({
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      target: 'map',
      view: new ol.View({
        center: transform,
        zoom: 6
      }),
      logo: false
    });
    this.initTooltip();
  }

  initTooltip() {
    var tooltip = document.getElementById('tooltip');
    var overlay = new ol.Overlay({
      element: tooltip,
      offset: [10, 0],
      positioning: 'bottom-left'
    });
    this.map.addOverlay(overlay);
    var _map = this.map;

    function displayTooltip(evt) {
      var pixel = evt.pixel;
      var feature = _map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
      }, null, function (layer) {
        return (layer.get('name') == 'markerLayer');
      });
      tooltip.style.display = feature ? '' : 'none';
      if (feature) {
        overlay.setPosition(evt.coordinate);
        var innerHTML = 'tooltip <br />';
        tooltip.innerHTML = innerHTML;
      }
    }
    this.map.on('pointermove', displayTooltip);
  }




}
