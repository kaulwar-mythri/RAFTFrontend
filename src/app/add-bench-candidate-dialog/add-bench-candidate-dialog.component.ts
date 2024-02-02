import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the necessary form-related modules
import { BenchCandidateStatus } from '../interfaces/BenchCandidateStatus';
@Component({
  selector: 'app-add-bench-candidate-dialog',
  templateUrl: './add-bench-candidate-dialog.component.html',
  styleUrls: ['./add-bench-candidate-dialog.component.scss']
})
export class AddBenchCandidateDialogComponent {
  newBenchCandidateForm: FormGroup; // Declare a form group
  constructor(
    public dialogRef: MatDialogRef<AddBenchCandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder // Inject the form builder
  ) {
    this.newBenchCandidateForm = this.formBuilder.group({
      id:[null,Validators.required],
      candidateName:[null, Validators.required],
      candidateStatus:[null, Validators.required],
      startDate:[null,Validators.required],
      endDate:[null,Validators.required],
      benchCandidateSkills :[null,Validators.required],
      benchManagerName:[null, Validators.required],
    },{ validators: this.dateValidator });
    if (data.initialValues) {
      this.newBenchCandidateForm.patchValue(data.initialValues);
    }
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (endDate && startDate && new Date(endDate) <= new Date(startDate)) {
      group.get('endDate')?.setErrors({ dateError: true });
    } else {
      group.get('endDate')?.setErrors(null);
    }

    return null;
  }
  onSaveClick(): void {
    if (this.newBenchCandidateForm.valid) {
      const formValue = this.newBenchCandidateForm.value;
      this.dialogRef.close(formValue);
    } else {
      console.error('Validation failed. Please fill in all required fields.');
    }
  }
}