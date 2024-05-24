import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenereIdComponent } from './genere-id.component';

describe('GenereIdComponent', () => {
  let component: GenereIdComponent;
  let fixture: ComponentFixture<GenereIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenereIdComponent]
    });
    fixture = TestBed.createComponent(GenereIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
