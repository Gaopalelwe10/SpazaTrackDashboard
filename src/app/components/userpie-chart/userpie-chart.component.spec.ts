import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpieChartComponent } from './userpie-chart.component';

describe('UserpieChartComponent', () => {
  let component: UserpieChartComponent;
  let fixture: ComponentFixture<UserpieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
