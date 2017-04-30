import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGridComponent } from './color-grid.component';

describe('ColorGridComponent', () => {
  let component: ColorGridComponent;
  let fixture: ComponentFixture<ColorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
