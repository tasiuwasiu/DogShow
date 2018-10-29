import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationWinnersComponent } from './information-winners.component';

describe('InformationWinnersComponent', () => {
  let component: InformationWinnersComponent;
  let fixture: ComponentFixture<InformationWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
