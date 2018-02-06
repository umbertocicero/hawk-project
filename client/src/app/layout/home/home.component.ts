import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { UtilService } from './../../shared/services/util.services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()],
    providers: [TripService, UtilService]
})
export class HomeComponent implements OnInit {
    constructor(
        private services: TripService,
        private util: UtilService
    ) { }

    trips = new Array();
    private base64Images = [[]];
    private maxImgNum = 3;

    ngOnInit() {
        this.services.getTrip(null).subscribe(data => {
            var trips = this.trips = data
            var self = this;

            trips.forEach(trip => {

                this.util.frorEachImageIntoStops(trip, function (stop, image) {
                    self.services.getImage(image, 'small').subscribe(data => {
                        var tmp = self.base64Images[trip.id];
                        if (!tmp) tmp = self.base64Images[trip.id] = [];
                        if (tmp.length < self.maxImgNum) {
                            self.base64Images[trip.id].push(data);
                        }
                    });
                });
                
            });
        });


    }
}
