import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupJudgeComponent } from './setup-judge.component';

describe('SetupJudgeComponent', () => {
  let component: SetupJudgeComponent;
  let fixture: ComponentFixture<SetupJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
