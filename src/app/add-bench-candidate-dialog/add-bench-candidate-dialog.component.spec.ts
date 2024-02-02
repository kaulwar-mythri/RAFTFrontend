import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenchCandidateDialogComponent } from './add-bench-candidate-dialog.component';

describe('AddBenchCandidateDialogComponent', () => {
  let component: AddBenchCandidateDialogComponent;
  let fixture: ComponentFixture<AddBenchCandidateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBenchCandidateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBenchCandidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
