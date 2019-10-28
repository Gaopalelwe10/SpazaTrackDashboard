import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpazaDialogComponent } from './spaza-dialog.component';

describe('SpazaDialogComponent', () => {
  let component: SpazaDialogComponent;
  let fixture: ComponentFixture<SpazaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpazaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpazaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
