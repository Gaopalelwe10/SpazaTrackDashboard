import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpazalinechartComponent } from './spazalinechart.component';

describe('SpazalinechartComponent', () => {
  let component: SpazalinechartComponent;
  let fixture: ComponentFixture<SpazalinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpazalinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpazalinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
