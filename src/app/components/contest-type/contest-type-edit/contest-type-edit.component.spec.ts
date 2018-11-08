import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestTypeEditComponent } from './contest-type-edit.component';

describe('ContestTypeEditComponent', () => {
  let component: ContestTypeEditComponent;
  let fixture: ComponentFixture<ContestTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
