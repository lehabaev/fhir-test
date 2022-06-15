import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientListComponent} from './components/patient-list/patient-list.component';
import {PatientCardComponent} from './components/patient-card/patient-card.component';
import {CardModule} from 'primeng/card';
import {HttpClientModule} from '@angular/common/http';
import {SkeletonModule} from 'primeng/skeleton';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CardModule,
    SkeletonModule,
    ToastModule,
  ],
  exports: [
    PatientListComponent
  ]
})
export class PatientListModule {
}
