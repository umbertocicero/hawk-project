import { Component, OnInit, Input } from '@angular/core';
import { Trip } from './../../../../shared/dto';

@Component({
  selector: 'app-timeline-stops',
  templateUrl: './timeline-stops.component.html',
  styleUrls: ['./timeline-stops.component.scss']
})
export class TimelineStopsComponent implements OnInit {

  @Input() trip: Trip;

  constructor() { }

  ngOnInit() {
  }

}
