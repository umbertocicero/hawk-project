import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, Stop, getId } from './../../shared/dto';
import { ModalComponent } from './components/modal/modal.component';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class AddTripComponent implements OnInit {

    @ViewChild(ModalComponent)
    private addModal: ModalComponent;

    constructor(
        private services: TripService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    trip: Trip = new Trip();

    editMode: boolean = false;

    ngOnInit() {
        this.route.params.subscribe(params => {
            var id = params['id'];
            if (id) {
                this.services.getTrip(id).subscribe(data => {
                    this.editMode = true;
                    this.trip = data;
                    var trip = this.trip;
                    if (trip != null && trip.stops != null) {

                        var features = [];
                        trip.stops.forEach(stop => {

                            if (stop.images != null && stop.images.length > 0) {
                                stop.images.forEach(image => {
                                    if (image.base64 == null) {
                                        this.services.getImage(image, 'small').subscribe(data => {
                                            if (data) {
                                                image.base64 = data.base64;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }
        })
    }



    postTrip() {
        if (this.editMode) {
            this.services.updateTrip(this.trip).subscribe(data => { this.router.navigate(['/trip-detail/' + data.id]); });
        } else {
            /*     
                this.services.addTrip(this.trip).subscribe(data => {
                    this.editMode = true;
                    this.trip.id = data.id;
                    this.router.navigate(['/trip-detail/' + data.id]);
                });
     */
            var self = this;
            this.services.addTrip(this.trip, function (data) {
                self.editMode = true;
                self.trip.id = data.id;
                self.router.navigate(['/trip-detail/' + data.id]);
            });
        }
    }

    addStop(event) {
        var stop = event.stop;
        var type = event.type;
        if (this.trip.stops == undefined) {
            this.trip.stops = [] as [Stop];
        }
        if (type == 'add') {
            this.trip.stops.push(Object.assign({}, stop));
        } else if (type == 'edit') {
            this.trip.stops.forEach(function (element, index, object) {
                if (element.id == stop.id) {
                    var newElement = Object.assign({}, stop)
                    object.splice(index, 1, newElement);
                }
            });
        }
    }

    editStop(stop: Stop) {
        if (stop.id == null) {
            stop.id = getId();
        }
        this.addModal.open(Object.assign({}, stop));
    }

    openAddModal() {
        this.addModal.open(null);
    }

}
