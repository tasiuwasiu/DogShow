import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestParticipationComponent } from './contest-participation.component';

describe('ContestParticipationComponent', () => {
  let component: ContestParticipationComponent;
  let fixture: ComponentFixture<ContestParticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestParticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
