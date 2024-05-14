import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuoviComponent } from './nuovi.component';

describe('NuoviComponent', () => {
  let component: NuoviComponent;
  let fixture: ComponentFixture<NuoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuoviComponent]
    });
    fixture = TestBed.createComponent(NuoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
