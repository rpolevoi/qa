import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDisplayComponent } from './answer-display.component';

describe('AnswerDisplayComponent', () => {
  let component: AnswerDisplayComponent;
  let fixture: ComponentFixture<AnswerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
