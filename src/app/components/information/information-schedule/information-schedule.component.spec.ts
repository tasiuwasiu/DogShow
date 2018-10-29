import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationScheduleComponent } from './information-schedule.component';

describe('InformationScheduleComponent', () => {
  let component: InformationScheduleComponent;
  let fixture: ComponentFixture<InformationScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
