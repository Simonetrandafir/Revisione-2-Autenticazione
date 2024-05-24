import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagioniComponent } from './stagioni.component';

describe('StagioniComponent', () => {
  let component: StagioniComponent;
  let fixture: ComponentFixture<StagioniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagioniComponent]
    });
    fixture = TestBed.createComponent(StagioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
