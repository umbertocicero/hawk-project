import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class HomeComponent implements OnInit {
    constructor(
        private services: TripService
    ) { }

    trips = new Array();
    private base64Images = [[]];
    private maxImgNum = 3;

    ngOnInit() {
        this.services.getTrip(null).subscribe(data => {
            var trips = this.trips = data
            var self = this;

            trips.forEach(trip => {

                if (trip && trip.stops != null && trip.stops.length > 0) {
                    trip.stops.forEach(stop => {
                        if (stop.images != null && stop.images.length > 0) {
                            stop.images.forEach(image => {
                                this.services.getImage(image, 'small').subscribe(data => {
                                    var tmp = self.base64Images[trip.id];
                                    if(!tmp) tmp = self.base64Images[trip.id] = [];
                                    if (tmp.length < self.maxImgNum) {
                                        self.base64Images[trip.id].push(data);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });


    }
}
