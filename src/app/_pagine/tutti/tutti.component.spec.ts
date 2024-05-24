import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuttiComponent } from './tutti.component';

describe('TuttiComponent', () => {
  let component: TuttiComponent;
  let fixture: ComponentFixture<TuttiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuttiComponent]
    });
    fixture = TestBed.createComponent(TuttiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
