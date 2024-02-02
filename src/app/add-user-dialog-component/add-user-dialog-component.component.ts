import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog-component',
  templateUrl: './add-user-dialog-component.component.html',
  styleUrl: './add-user-dialog-component.component.scss'
})
export class AddUserDialogComponentComponent {
  newUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.newUserForm = this.formBuilder.group({
      employeeId: [null, Validators.required],
      name: [null, Validators.required],
      emailId: [null, Validators.required],
      role: [null, Validators.required],
      accountName: [null, Validators.required],
    });

    // Set initial values if provided
    if (data.initialValues) {
      this.newUserForm.patchValue(data.initialValues);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.newUserForm.valid) {
      const formValue = this.newUserForm.value;
      this.dialogRef.close(formValue);
    } else {
      console.error('Validation failed. Please fill all required fields.');
    }
  }
}
