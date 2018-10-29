import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestEditComponent } from './contest-edit.component';

describe('ContestEditComponent', () => {
  let component: ContestEditComponent;
  let fixture: ComponentFixture<ContestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
