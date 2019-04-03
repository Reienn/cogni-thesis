import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Notepad2Component } from './notepad2.component';

describe('Notepad2Component', () => {
  let component: Notepad2Component;
  let fixture: ComponentFixture<Notepad2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Notepad2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Notepad2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
