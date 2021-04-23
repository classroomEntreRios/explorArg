import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForocrudComponent } from './forocrud.component';

describe('ForocrudComponent', () => {
  let component: ForocrudComponent;
  let fixture: ComponentFixture<ForocrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForocrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForocrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
