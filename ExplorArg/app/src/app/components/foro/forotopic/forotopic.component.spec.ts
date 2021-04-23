import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForotopicComponent } from './forotopic.component';

describe('ForotopicComponent', () => {
  let component: ForotopicComponent;
  let fixture: ComponentFixture<ForotopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForotopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForotopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
