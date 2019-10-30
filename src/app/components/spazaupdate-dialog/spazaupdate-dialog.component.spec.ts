import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpazaupdateDialogComponent } from './spazaupdate-dialog.component';

describe('SpazaupdateDialogComponent', () => {
  let component: SpazaupdateDialogComponent;
  let fixture: ComponentFixture<SpazaupdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpazaupdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpazaupdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
