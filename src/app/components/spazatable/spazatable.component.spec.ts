import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { SpazatableComponent } from './spazatable.component';

describe('SpazatableComponent', () => {
  let component: SpazatableComponent;
  let fixture: ComponentFixture<SpazatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpazatableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpazatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
