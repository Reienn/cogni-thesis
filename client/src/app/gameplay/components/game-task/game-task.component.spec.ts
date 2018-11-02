import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTaskComponent } from './game-task.component';

describe('GameTaskComponent', () => {
  let component: GameTaskComponent;
  let fixture: ComponentFixture<GameTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
