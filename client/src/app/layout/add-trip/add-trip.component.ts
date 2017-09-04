import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TripService } from './../../shared/services/trip.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip, Stop } from './../../shared/dto';

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
    stop: Stop = new Stop();

    editMode: boolean = false;

    ngOnInit() {
        this.route.params.subscribe(params => {
            var id = params['id'];
            if (id) {
                this.services.getTrip(id).subscribe(data => { this.editMode = true; this.trip = data });
            }
        })
    }



    postTrip() {
        if (this.editMode) {
            this.services.updateTrip(this.trip).subscribe(data => { this.router.navigate(['/trip-detail/' + data.id]); });
        } else {
            this.services.addTrip(this.trip).subscribe(data => {
                this.editMode = true;
                this.trip.id = data.id;
                this.router.navigate(['/trip-detail/' + data.id]);
            });
        }
    }

    addStop(event) {
        console.log(event);
        if (this.trip.stops == undefined) {
            this.trip.stops = [] as [Stop];
        }
        this.trip.stops.push(Object.assign({}, this.stop));
        this.stop = new Stop();
    }

    openAddModal(){
        this.addModal.open();
    }

}
