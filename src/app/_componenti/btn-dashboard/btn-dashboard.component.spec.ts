import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDashboardComponent } from './btn-dashboard.component';

describe('BtnDashboardComponent', () => {
  let component: BtnDashboardComponent;
  let fixture: ComponentFixture<BtnDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnDashboardComponent]
    });
    fixture = TestBed.createComponent(BtnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
