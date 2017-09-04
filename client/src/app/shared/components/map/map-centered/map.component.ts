import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
//import { Stop } from './../../../../shared/dto';
//import * as ol from 'openlayers';


@Component({
    selector: 'app-map-centered',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],


})
export class MapCenteredComponent implements OnInit {

    height: string = '0vh';
    top: string = '0px';
    left: string = '0px';
    mapOpened: boolean = false;
    map = null;
    markerLayer = null;

    coordinates: [number,number];
    @Output() addCoordinates: EventEmitter< [number, number]> = new EventEmitter();

    ngOnInit() {
        this.openMap();
    }

    constructor() { }

    openMap() {
        this.height = '20vh';
        this.mapOpened = true;
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
        var _map = this.map;

        var geolocation = new ol.Geolocation({
            projection: this.map.getView().getProjection(),
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true,
                maximumAge: 2000
            }
        });

        var acquiredPos = false;
        geolocation.on('change', function () {
            var gpsPos = geolocation.getPosition();
            if (!acquiredPos && gpsPos && gpsPos != null) {
                _map.getView().setCenter(gpsPos);
                acquiredPos = true;
            }
        });
      
        var center = this.map.getView().getCenter();

        this.drawPoint(center);
    }
    iconGeometry: any;
    drawPoint(coords: [number, number]) {
        var iconGeometry = new ol.geom.Point(coords);
        var iconFeature = new ol.Feature({
            geometry: iconGeometry,
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.5, 1],
                scale: 0.5,
                opacity: 0.,
                src: 'assets/images/marker_red.png'
            }))
        });

        iconFeature.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        this.iconGeometry = iconGeometry;
        this.map.addLayer(vectorLayer);

        this.onMoveMapListener();

    }

    onMoveMapListener() {

        var _this = this;

        function moveMarker() {
            var center = _this.map.getView().getCenter();
            _this.iconGeometry.setCoordinates(center);
            var pixel = _this.map.getPixelFromCoordinate(center);
            _this.top = pixel[1] + 'px';
            _this.left = (pixel[0] + 22) + 'px';

            var transform = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
            _this.coordinates = transform;
            _this.addCoordinates.emit(_this.coordinates);
        }

        this.map.on('movestart', function (e) {
            moveMarker();
        });
        this.map.on('moveend', function (e) {
            moveMarker();
        });

    }

    addCoordinatesToStop() {
        if (this.mapOpened) {
            var coordinates = this.iconGeometry.getCoordinates();
            if (coordinates != null) {

                var transform = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
                //   this.stop.coordinates = transform;
            }
        }
    }


}
