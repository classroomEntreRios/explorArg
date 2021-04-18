import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAComponent } from './agregar-a.component';

describe('AgregarAComponent', () => {
  let component: AgregarAComponent;
  let fixture: ComponentFixture<AgregarAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
