import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicurezzaComponent } from './sicurezza.component';

describe('SicurezzaComponent', () => {
  let component: SicurezzaComponent;
  let fixture: ComponentFixture<SicurezzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SicurezzaComponent]
    });
    fixture = TestBed.createComponent(SicurezzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
