import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestTypeCreateComponent } from './contest-type-create.component';

describe('ContestTypeCreateComponent', () => {
  let component: ContestTypeCreateComponent;
  let fixture: ComponentFixture<ContestTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
