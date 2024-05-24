import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePswComponent } from './update-psw.component';

describe('UpdatePswComponent', () => {
  let component: UpdatePswComponent;
  let fixture: ComponentFixture<UpdatePswComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePswComponent]
    });
    fixture = TestBed.createComponent(UpdatePswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
