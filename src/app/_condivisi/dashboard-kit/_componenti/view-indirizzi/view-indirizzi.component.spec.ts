import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndirizziComponent } from './view-indirizzi.component';

describe('ViewIndirizziComponent', () => {
  let component: ViewIndirizziComponent;
  let fixture: ComponentFixture<ViewIndirizziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewIndirizziComponent]
    });
    fixture = TestBed.createComponent(ViewIndirizziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
