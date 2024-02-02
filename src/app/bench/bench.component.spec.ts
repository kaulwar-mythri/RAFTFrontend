import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchCandidatesComponent } from './bench.component';

describe('BenchComponent', () => {
  let component: BenchCandidatesComponent ;
  let fixture: ComponentFixture<BenchCandidatesComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenchCandidatesComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenchCandidatesComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
