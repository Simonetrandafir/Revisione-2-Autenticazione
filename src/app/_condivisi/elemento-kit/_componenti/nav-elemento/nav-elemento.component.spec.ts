import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavElementoComponent } from './nav-elemento.component';

describe('NavElementoComponent', () => {
  let component: NavElementoComponent;
  let fixture: ComponentFixture<NavElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavElementoComponent]
    });
    fixture = TestBed.createComponent(NavElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
