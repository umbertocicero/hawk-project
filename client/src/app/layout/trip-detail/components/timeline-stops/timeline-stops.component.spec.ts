import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineStopsComponent } from './timeline-stops.component';

describe('TimelineStopsComponent', () => {
  let component: TimelineStopsComponent;
  let fixture: ComponentFixture<TimelineStopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineStopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
