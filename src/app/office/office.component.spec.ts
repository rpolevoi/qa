import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriousComponent } from './serious.component';

describe('SeriousComponent', () => {
  let component: SeriousComponent;
  let fixture: ComponentFixture<SeriousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
