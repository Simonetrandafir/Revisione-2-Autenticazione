import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRegistraComponent } from './btn-registra.component';

describe('BtnRegistraComponent', () => {
  let component: BtnRegistraComponent;
  let fixture: ComponentFixture<BtnRegistraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnRegistraComponent]
    });
    fixture = TestBed.createComponent(BtnRegistraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
