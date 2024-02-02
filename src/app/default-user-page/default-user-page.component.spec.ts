import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserPageComponent } from './default-user-page.component';

describe('DefaultUserPageComponent', () => {
  let component: DefaultUserPageComponent;
  let fixture: ComponentFixture<DefaultUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
