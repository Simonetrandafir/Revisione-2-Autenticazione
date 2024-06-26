import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgToastComponent } from './msg-toast.component';

describe('MsgToastComponent', () => {
  let component: MsgToastComponent;
  let fixture: ComponentFixture<MsgToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsgToastComponent]
    });
    fixture = TestBed.createComponent(MsgToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
