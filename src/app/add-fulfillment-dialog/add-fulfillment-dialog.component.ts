import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fulfillment-dialog',
  templateUrl: './add-fulfillment-dialog.component.html',
  styleUrl: './add-fulfillment-dialog.component.scss'
})
export class AddFulfillmentDialogComponent {

  newFulfillmentForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<AddFulfillmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.newFulfillmentForm = this.formBuilder.group({
      fulfillmentId: [null, Validators.required],
      fulfillmentDate: [null, Validators.required],
      submission : [null, Validators.required],
      fulfillmentStatus: [null, Validators.required]
    });

    // Set initial values if provided
    if (data.initialValues) {
      this.newFulfillmentForm.patchValue(data.initialValues);
    }
   
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.newFulfillmentForm.valid) {
      const formValue = this.newFulfillmentForm.value;
      console.log(formValue);
      let fulfillmentDate = new Date(formValue.fulfillmentDate);
      // let formattedDate = fulfillmentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

      // console.log(formattedDate);      
      // formValue.fulfillmentDate = formattedDate;
//       let parts = fulfillmentDate.split('/');
// let formattedDate = new Date(parts[2], parts[1] - 1, parts[0]).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

let day = String(fulfillmentDate.getDate()).padStart(2, '0');
let month = String(fulfillmentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
let year = fulfillmentDate.getFullYear();

let formattedDate = `${day}-${month}-${year}`;

console.log(formattedDate); 

console.log(formattedDate);  

      this.dialogRef.close(formValue);
    } else {
      console.error('Validation failed. Please fill in all required fields.');
    }
  }
}
