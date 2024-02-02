import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequirementDialogComponent } from './add-requirement-dialog-component.component';

describe('AddRequirementDialogComponent', () => {
  let component: AddRequirementDialogComponent;
  let fixture: ComponentFixture<AddRequirementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRequirementDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRequirementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
