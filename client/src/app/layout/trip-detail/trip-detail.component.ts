import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-trip-detail',
    templateUrl: './trip-detail.component.html',
    styleUrls: ['./trip-detail.component.scss'],
    animations: [routerTransition()]
})
export class TripDetailComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
