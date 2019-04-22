import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSurveyFormComponent } from './player-survey-form.component';

describe('PlayerSurveyFormComponent', () => {
  let component: PlayerSurveyFormComponent;
  let fixture: ComponentFixture<PlayerSurveyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSurveyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
