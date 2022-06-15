import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  forkJoin,
  from,
  groupBy,
  map,
  mergeMap,
  Observable,
  of,
  reduce,
  switchMap,
  toArray,
  zip
} from 'rxjs';
import {IPatientListItem} from '../interfaces/patient-list-item';
import {IFhirAppointment} from '../interfaces/fhir-appointment';
import {IFhirPatient} from '../interfaces/fhir-patient';
import {IPatient} from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  private readonly SERVER_URL = 'https://hapi.fhir.org'

  constructor(private readonly httpClient: HttpClient) {
  }

  getPatient(patientId: string): Observable<IPatient> {
    const url = `${this.SERVER_URL}/baseR4/Patient/${patientId}`;

    return this.httpClient.get<IFhirPatient>(url).pipe(
      map(res => ({
        id: res.id,
        name: res.name.map(hn => hn.text || `${hn.family} ${hn.given}`).join(', '),
        gender: res.gender,
        birthDate: new Date(res.birthDate)
      }))
    )
  }

  getPatientListFromAppointments(count: number): Observable<IPatientListItem[]> {
    const url = `${this.SERVER_URL}/baseR4/Appointment`
    const params = {_count: count};

    return this.httpClient.get<{ entry: { resource: IFhirAppointment }[] }>(url, {params})
      .pipe(
        map(res => res.entry),
        switchMap(entries => from(entries.map(entry => entry.resource))),
        groupBy(appointment => {
          const patient = appointment.participant.find(p => p.actor.reference?.includes('Patient'))
          // Patient is required in appointment response
          // "Patient/3116962" => "3116962"
          return patient!.actor.reference!.slice(8);
        }),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        mergeMap((item: [string, IFhirAppointment[]]) => this.getPatient(item[0]).pipe(
          map(patient => ({
              patient,
              appointments: item[1].map((app: IFhirAppointment) => ({
                start: new Date(app.start),
                description: app.description
              }))
            })
          )
        )),
        reduce((acc: IPatientListItem[], item: IPatientListItem) => [...acc, item], [])
      )
  }

  /**
   private groupEntriesByPatient(entries: { resource: IFhirAppointment }[]): { [patientId: string]: IFhirAppointment[] } {
    return entries.reduce((acc: { [patientId: string]: IFhirAppointment[] }, entry) => {
      const patient = entry.resource.participant.find(p => p.actor.reference?.includes('Patient'))
      if (patient) {
        // "Patient/3116962" => "3116962"
        const patientId = patient.actor.reference!.slice(8);

        if (acc[patientId] === undefined) {
          acc[patientId] = []
        }

        acc[patientId].push(entry.resource)
      }
      return acc;
    }, {})
  }

   getPatientListFromAppointments(count: number): Observable<IPatientListItem[]> {
    const url = `${this.SERVER_URL}/baseR4/Appointment`

    return this.httpClient.get<{ entry: { resource: IFhirAppointment }[] }>(url, {params: {_count: count}})
      .pipe(
        map(res => res.entry),
        map(entries => this.groupEntriesByPatient(entries)),
        mergeMap((patientAppointments: { [patientId: string]: IFhirAppointment[] }) => {
          const patientRequests = Object.keys(patientAppointments).map(patientId => this.getPatient(patientId));

          return forkJoin(patientRequests)
            .pipe(
              map((patientList: IPatient[]) => {
                return patientList.map(patient => ({
                  patient,
                  appointments: patientAppointments[patient.id]
                }))
              })
            )
        }))
  }
   **/

}
