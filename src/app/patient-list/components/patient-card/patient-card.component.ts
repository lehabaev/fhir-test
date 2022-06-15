import {Component, Input, OnInit} from '@angular/core';
import {IPatientListItem} from '../../interfaces/patient-list-item';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() item!: IPatientListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
