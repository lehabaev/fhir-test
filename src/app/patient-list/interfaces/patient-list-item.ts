import {IPatient} from './patient';
import {IAppointment} from './appointment';

export interface IPatientListItem {
  patient: IPatient;
  appointments: IAppointment[];
}
