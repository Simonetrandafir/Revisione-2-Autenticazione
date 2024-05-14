import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAccediComponent } from './btn-accedi.component';

describe('BtnAccediComponent', () => {
  let component: BtnAccediComponent;
  let fixture: ComponentFixture<BtnAccediComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnAccediComponent]
    });
    fixture = TestBed.createComponent(BtnAccediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
