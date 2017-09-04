import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { Trip } from './../../../../shared/dto';

@Component({
    selector: 'app-map-landscape',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],


})
export class MapLandscapeComponent implements OnInit, AfterViewInit  {

    @Input() trip: Trip;

    height: string = '0vh';
    top: string = '0px';
    left: string = '0px';
    mapOpened: boolean = false;
    map = null;
    markerLayer = null;

    coordinates: [number, number];
    @Output() addCoordinates: EventEmitter<[number, number]> = new EventEmitter();

    ngOnInit() {
       
    }
    ngAfterViewInit() {
        this.openMap();
    }

    constructor() { }



    openMap() {
        this.height = '20vh';
        this.mapOpened = false;
        var _initMap = this.initMap;
        var _map = this.map;
        var _this = this;
        function func() {
            _this.initMap();
        }
        setTimeout(func, 100);
    }

    initMap() {

        let coords: [number, number] = [11.162, 43.829];
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
            target: 'map_div',
            view: new ol.View({
                center: transform,
                zoom: 6
            }),
            logo: false
        });
        console.log('aaa' + this.trip.stops);
        this.drawMap(this.trip);
        //  this.initTooltip();
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

    drawMap(trip: Trip) {

        this.map.removeLayer(this.markerLayer);

        if (trip != null && trip.stops != null) {

            var features = [];

            trip.stops.forEach(element => {


                var coords: [number, number] = element.coordinates;

                if (coords) {
                    this.mapOpened = true;

                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.5, 1],
                            scale: 0.5,
                            opacity: 1,
                            src: 'assets/images/marker_red.png'
                        }))
                    });

                    var transform = ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857');

                    var feature = new ol.Feature({
                        geometry: new ol.geom.Point(transform)
                    });
                    feature.setStyle(iconStyle);
                    feature.set('coords', coords);

                    features.push(feature);

                }
            });

            if (features.length > 0) {

                this.markerLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: features
                    })
                });
                this.markerLayer.set('name', 'markerLayer');

                this.map.addLayer(this.markerLayer);

                var extent = this.markerLayer.getSource().getExtent();

                this.map.getView().fit(extent, {
                    size: this.map.getSize(),
                    maxZoom: 13
                });


                /*          
                this.map.setView(new ol.View({
                  center: this.map.getView().getCenter(),
                  zoom: 18
                }));
                */

            } else {
                this.height = '0vh';
            }
        }
    }
}
