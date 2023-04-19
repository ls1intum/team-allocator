import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConstraintsOverlayComponent } from './constraints-overlay.component';

describe('CustomConstraintsOverlayComponent', () => {
  let component: CustomConstraintsOverlayComponent;
  let fixture: ComponentFixture<CustomConstraintsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomConstraintsOverlayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConstraintsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
