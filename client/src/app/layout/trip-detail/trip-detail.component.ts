import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from './../../shared/dto';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss'],
    animations: [routerTransition()],
    providers: [TripService]
})
export class TripDetailComponent implements OnInit {
    constructor(
        private services: TripService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit() {
        this.route.params.subscribe(params => {
            var id = params['id'];
            if (id) {
                this.services.getTrip(id).subscribe(data => { console.log(data); this.trip = data });
            }
        })
    }

    trip: Trip = new Trip();

    deleteTrip(event) {
        this.services.deleteTrip(event).subscribe(data => {
            console.log(data);
            this.router.navigate(['/home']);
        });
    }
}
