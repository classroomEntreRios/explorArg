import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregardestComponent } from './agregardest.component';

describe('AgregardestComponent', () => {
  let component: AgregardestComponent;
  let fixture: ComponentFixture<AgregardestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregardestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregardestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
