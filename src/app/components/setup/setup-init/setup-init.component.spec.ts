import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupInitComponent } from './setup-init.component';

describe('SetupInitComponent', () => {
  let component: SetupInitComponent;
  let fixture: ComponentFixture<SetupInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
