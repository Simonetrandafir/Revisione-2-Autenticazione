import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCreditiComponent } from './set-crediti.component';

describe('SetCreditiComponent', () => {
  let component: SetCreditiComponent;
  let fixture: ComponentFixture<SetCreditiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCreditiComponent]
    });
    fixture = TestBed.createComponent(SetCreditiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
