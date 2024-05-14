import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGeneriComponent } from './btn-generi.component';

describe('BtnGeneriComponent', () => {
  let component: BtnGeneriComponent;
  let fixture: ComponentFixture<BtnGeneriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnGeneriComponent]
    });
    fixture = TestBed.createComponent(BtnGeneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
