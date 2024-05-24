import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgElementoComponent } from './img-elemento.component';

describe('ImgElementoComponent', () => {
  let component: ImgElementoComponent;
  let fixture: ComponentFixture<ImgElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgElementoComponent]
    });
    fixture = TestBed.createComponent(ImgElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
