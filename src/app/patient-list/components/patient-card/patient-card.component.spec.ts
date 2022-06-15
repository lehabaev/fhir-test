import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCardComponent } from './patient-card.component';

describe('PatientCardComponent', () => {
  let component: PatientCardComponent;
  let fixture: ComponentFixture<PatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCardComponent);
    component = fixture.componentInstance;
    component.item = {
      patient: {id: '11', gender: 'male', birthDate: new Date(), name: "Test Name"},
      appointments: []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
