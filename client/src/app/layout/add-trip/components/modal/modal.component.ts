import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Stop } from './../../../../shared/dto';
//import * as ol from 'openlayers';


@Component({
    selector: 'app-modal-add-stop',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],


})
export class ModalComponent implements OnInit {

    height: string = '0vh';
    top: string = '0px';
    left: string = '0px';
    mapOpened: boolean = false;
    map = null;
    markerLayer = null;

    closeResult: string;

    ngOnInit() {

    }

    constructor(private modalService: NgbModal, private el: ElementRef) { }

    @Output() add: EventEmitter<string> = new EventEmitter();
    @Input() stop: Stop;

    open(content) {

        this.modalService.open(content).result.then((result) => {
            
            this.closeResult = `Closed with: ${result}`;
            if (this.stop.name && this.stop.name.length > 0) {
                this.addCoordinatesToStop();
                this.add.emit('add-stop');
            }
            this.mapOpened = false;
            this.height = '0vh';

        }, (reason) => {
            this.mapOpened = false;
            this.height = '0vh';
            this.stop = new Stop();
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    // onChange(event) {
    //     var files = event.srcElement.files;
    //     console.log(files);
    // }
    fileChanged(e: Event) {
        var target: HTMLInputElement = e.target as HTMLInputElement;
        for (var i = 0; i < target.files.length; i++) {
            this.upload2(target.files[i]);
        }
    }

    upload2(img: File) {
        console.log(img)
    }
    upload() {
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('photo', inputEl.files.item(0));
            /*
        //call the angular http method
        this.http
    //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
            .post(URL, formData).map((res:Response) => res.json()).subscribe(
            //map the success function and alert the response
             (success) => {
                     alert(success._body);
            },
            (error) => alert(error))
            */
        }
    }
    //sda
    openMap() {
        this.height = '20vh';
        this.mapOpened = true;
        var _initMap = this.initMap;
        var _map = this.map;
        var _this = this;
        function func() {
            _this.initMap();
        }
        setTimeout(func, 1);
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
            target: 'map',
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
        //var center = geolocation.getPosition();
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
        }

        this.map.on('movestart', function (e) {
            moveMarker();
        });
        this.map.on('moveend', function (e) {
            moveMarker();
        });

    }

      addCoordinatesToStop() {
        if(this.mapOpened){
            var coordinates = this.iconGeometry.getCoordinates();
            if(coordinates!=null){

                var transform = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
                this.stop.coordinates = transform;
            }
        }
    }


}
