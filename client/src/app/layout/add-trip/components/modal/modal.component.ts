import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Stop } from './../../../../shared/dto';


@Component({
    selector: 'app-modal-add-stop',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],


})
export class ModalComponent implements OnInit {

    ngOnInit() {

    }


    closeResult: string;
    constructor(private modalService: NgbModal, private el: ElementRef) { }

    @Output() add: EventEmitter<string> = new EventEmitter();
    @Input() stop: Stop;

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            if (this.stop.name && this.stop.name.length > 0) {
                this.add.emit('add-stop');
            }
        }, (reason) => {
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



}
