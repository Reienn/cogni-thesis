import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractTaskComponent } from './abstract-task.component';

describe('AbstractTaskComponent', () => {
  let component: AbstractTaskComponent;
  let fixture: ComponentFixture<AbstractTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
