import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdTaskComponent } from './third-task.component';

describe('ThirdTaskComponent', () => {
  let component: ThirdTaskComponent;
  let fixture: ComponentFixture<ThirdTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
