import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Stop, Image } from './../../../../shared/dto';
// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';
//import * as ol from 'openlayers';
declare var $: any;

@Component({
    selector: 'app-modal-add-stop',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

    @ViewChild('content') content: TemplateRef<any>;

    coordinates: [number, number];

    closeResult: string;

    private base64Images = [] as [Image];

    ngOnInit() {

    }

    constructor(private modalService: NgbModal, private el: ElementRef, private domSanitizer: DomSanitizer) { }

    @Output() add: EventEmitter<any> = new EventEmitter();
    //@Input() 
    stop: Stop;

    open(stop: Stop) {
        var edit: boolean = false;
        if (stop != null) {
            edit = true;
            this.stop = stop;

            if (stop.images != null && stop.images.length > 0) {
                stop.images.forEach(image => {
                    this.base64Images.push(image);
                })
            }

        } else {
            this.stop = new Stop();
        }
        this.coordinates = this.stop.coordinates;

        this.modalService.open(this.content).result.then((result) => {

            this.closeResult = `Closed with: ${result}`;
            if (this.stop.name && this.stop.name.length > 0) {
                this.stop.coordinates = this.coordinates;

                var images = this.base64Images;
                if (images != null && images.length > 0) {

                    var s = this.stop.images = [] as [Image];
                    images.forEach(img => {
                       /* 
                        var image = new Image();
                        image.base64 = img;
 */
                        s.push(img);
                    })

                    this.base64Images =  [] as [Image];
                }

                this.add.emit(
                    {
                        'stop': this.stop,
                        'type': edit ? 'edit' : 'add'
                    });

            }

        }, (reason) => {
            this.base64Images = [] as [Image];
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



    changeListener($event): void {
        this.readThis($event.target);
        //  this.readmultifiles($event.target);
    }

    readThis(inputValue: any): void {
        var files = inputValue.files;
        for (var i = 0; i < files.length; i++) {


            var file: File = files[i];
            this.previewFile(file, i);
            /* 
                        var myReader: FileReader = new FileReader();
            
                        myReader.onloadend = (e) => {
            
                            console.log(myReader.result);
                            console.log('\n##################################################################################### \n');
                            var img = this.domSanitizer.bypassSecurityTrustResourceUrl(myReader.result);
                            this.base64Images[i] = img;
                           
                        }
                        myReader.readAsDataURL(file); 
            */

        }
    }

    previewFile(file: File, i) {
        var reader = new FileReader();
        var self = this;
        reader.addEventListener("load", function () {

            var image = new Image();
            image.base64 = reader.result;
            self.base64Images[i] = image;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    onNotify(coordinates: [number, number]): void {
        this.coordinates = coordinates;
    }


}
