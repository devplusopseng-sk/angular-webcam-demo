import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamDemoComponent } from './webcam-demo.component';

describe('WebcamDemoComponent', () => {
  let component: WebcamDemoComponent;
  let fixture: ComponentFixture<WebcamDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
