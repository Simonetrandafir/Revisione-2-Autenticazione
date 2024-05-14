import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLogoutComponent } from './btn-logout.component';

describe('BtnLogoutComponent', () => {
  let component: BtnLogoutComponent;
  let fixture: ComponentFixture<BtnLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnLogoutComponent]
    });
    fixture = TestBed.createComponent(BtnLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
