import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupEditComponent } from './setup-edit.component';

describe('SetupEditComponent', () => {
  let component: SetupEditComponent;
  let fixture: ComponentFixture<SetupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
