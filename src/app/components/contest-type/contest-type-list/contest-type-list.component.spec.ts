import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestTypeListComponent } from './contest-type-list.component';

describe('ContestTypeListComponent', () => {
  let component: ContestTypeListComponent;
  let fixture: ComponentFixture<ContestTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
