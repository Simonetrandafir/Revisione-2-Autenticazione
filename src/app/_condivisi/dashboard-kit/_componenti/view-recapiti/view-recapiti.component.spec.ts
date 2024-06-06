import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecapitiComponent } from './view-recapiti.component';

describe('ViewRecapitiComponent', () => {
  let component: ViewRecapitiComponent;
  let fixture: ComponentFixture<ViewRecapitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecapitiComponent]
    });
    fixture = TestBed.createComponent(ViewRecapitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
