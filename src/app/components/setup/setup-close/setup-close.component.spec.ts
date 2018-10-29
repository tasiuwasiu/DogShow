import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCloseComponent } from './setup-close.component';

describe('SetupCloseComponent', () => {
  let component: SetupCloseComponent;
  let fixture: ComponentFixture<SetupCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
