import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoElementoComponent } from './info-elemento.component';

describe('InfoElementoComponent', () => {
  let component: InfoElementoComponent;
  let fixture: ComponentFixture<InfoElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoElementoComponent]
    });
    fixture = TestBed.createComponent(InfoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
