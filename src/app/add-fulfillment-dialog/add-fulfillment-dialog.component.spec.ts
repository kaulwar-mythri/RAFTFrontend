import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFulfillmentDialogComponent } from './add-fulfillment-dialog.component';

describe('AddFulfillmentDialogComponent', () => {
  let component: AddFulfillmentDialogComponent;
  let fixture: ComponentFixture<AddFulfillmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFulfillmentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFulfillmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
