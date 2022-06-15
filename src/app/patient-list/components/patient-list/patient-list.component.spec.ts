import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListComponent } from './patient-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListComponent ],
      imports: [HttpClientTestingModule, MessageModule],
      providers: [MessageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
