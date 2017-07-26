import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { Trip, Stop } from './../../shared/dto';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class AddTripComponent implements OnInit {
    constructor(private services: TripService) { }

    ngOnInit() { }

    trip: Trip = new Trip();
    stop: Stop = new Stop();

    postTrip() {
        this.services.addTrip(this.trip).subscribe(data => { console.log(data); });
    }

}
