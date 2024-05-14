import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneriComponent } from './generi.component';

describe('GeneriComponent', () => {
  let component: GeneriComponent;
  let fixture: ComponentFixture<GeneriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneriComponent]
    });
    fixture = TestBed.createComponent(GeneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
