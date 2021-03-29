import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpanelComponent } from './dashboardpanel.component';

describe('DashboardpanelComponent', () => {
  let component: DashboardpanelComponent;
  let fixture: ComponentFixture<DashboardpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
