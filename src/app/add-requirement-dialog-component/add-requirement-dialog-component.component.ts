
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Requirement } from '../interfaces/Requirement';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-requirement-dialog-component',
  templateUrl: './add-requirement-dialog-component.component.html',

  styleUrls: ['./add-requirement-dialog-component.component.scss'],
 
})
export class AddRequirementDialogComponent {
  newRequirementForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddRequirementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
    ) {
    this.newRequirementForm = this.formBuilder.group({
      requirementId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null,Validators.required],
      requiredNo: [null, Validators.required],
      jobDescription: [null, Validators.required],
      hiringManager: [null, Validators.required],
      accountName: [null, Validators.required],

    },{ validators: this.dateValidator });

    // Set initial values if provided
    if (data.initialValues) {
      this.newRequirementForm.patchValue(data.initialValues);
    }
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
  
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.markFormControlsTouched(this.newRequirementForm);

    if (this.newRequirementForm.valid) {
      const formValue = this.newRequirementForm.value;
      console.log(formValue.startDate);
      this.dialogRef.close(formValue);
    } else {
      console.error('Validation failed. Please fill in all required fields.');
    }
  }

  markFormControlsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      // You can add additional logic here if needed
    });
  }
}
