import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterabsoluteComponent } from './footerabsolute.component';

describe('FooterabsoluteComponent', () => {
  let component: FooterabsoluteComponent;
  let fixture: ComponentFixture<FooterabsoluteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterabsoluteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterabsoluteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
