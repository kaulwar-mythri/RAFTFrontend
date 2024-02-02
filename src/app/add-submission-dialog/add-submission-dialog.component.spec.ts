import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubmissionDialogComponent } from './add-submission-dialog.component';

describe('AddSubmissionDialogComponent', () => {
  let component: AddSubmissionDialogComponent;
  let fixture: ComponentFixture<AddSubmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubmissionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
