import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestDisplayComponent } from './contest-display.component';

describe('ContestDisplayComponent', () => {
  let component: ContestDisplayComponent;
  let fixture: ComponentFixture<ContestDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
