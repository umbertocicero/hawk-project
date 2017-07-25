import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
 import { TripService } from './../../shared/services/trip.services';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.scss'],
    animations: [routerTransition()],
     providers: [TripService]
})
export class AddTripComponent implements OnInit {
    constructor(private services: TripService) {  }
    ngOnInit() {}

    Trip = null;


    postTrip(){
        this.services.getTripById(1).subscribe(data => {console.log(data);});
    }
}
