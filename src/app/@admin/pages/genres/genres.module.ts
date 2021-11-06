import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './genres.component';
import { TablePaginationModule } from '../../components/table-pagination/table-pagination.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerLegalAgeModule } from '../../components/calendar/data-picker-legal-age/date-picker-legal-age.module';

@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    RouterModule,
    GenresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TablePaginationModule,
    DatePickerLegalAgeModule,
  ],
})
export class GenresModule {}
