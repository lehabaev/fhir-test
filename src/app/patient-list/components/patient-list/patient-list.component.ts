import {Component, Input, OnInit} from '@angular/core';
import {IPatientListItem} from '../../interfaces/patient-list-item';
import {FhirService} from '../../service/fhir.service';
import {MessageService} from 'primeng/api';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @Input() list_count: number = 10;
  loading: boolean = false;
  patientList: IPatientListItem[] = [];

  constructor(private readonly fhirService: FhirService,
              private readonly messageService: MessageService) {
  }

  ngOnInit(): void {
    this.load()
  }

  private load() {
    this.loading = true;

    this.fhirService.getPatientListFromAppointments(this.list_count).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (res) => this.patientList = res,
      error: err => this.messageService.add({severity: 'error', summary: 'Ошибка загрузки данных', detail: err?.detail})
    })
  }
}
