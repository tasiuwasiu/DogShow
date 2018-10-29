import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestGradeComponent } from './contest-grade.component';

describe('ContestGradeComponent', () => {
  let component: ContestGradeComponent;
  let fixture: ComponentFixture<ContestGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
