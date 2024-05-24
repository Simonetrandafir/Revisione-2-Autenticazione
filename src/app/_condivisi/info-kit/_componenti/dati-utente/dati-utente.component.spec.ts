import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiUtenteComponent } from './dati-utente.component';

describe('DatiUtenteComponent', () => {
  let component: DatiUtenteComponent;
  let fixture: ComponentFixture<DatiUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatiUtenteComponent]
    });
    fixture = TestBed.createComponent(DatiUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
