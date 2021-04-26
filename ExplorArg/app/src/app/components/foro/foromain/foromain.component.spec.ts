import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForomainComponent } from './foromain.component';

describe('ForomainComponent', () => {
  let component: ForomainComponent;
  let fixture: ComponentFixture<ForomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
