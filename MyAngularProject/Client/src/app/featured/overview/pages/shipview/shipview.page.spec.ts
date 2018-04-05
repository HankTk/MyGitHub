import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipviewPageComponent } from './shipview.page';

describe('ShipviewComponent', () => {
  let component: ShipviewPageComponent;
  let fixture: ComponentFixture<ShipviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
