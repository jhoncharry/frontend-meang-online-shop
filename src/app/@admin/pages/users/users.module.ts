import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TablePaginationModule } from '../../components/table-pagination/table-pagination.module';
import { DatePickerLegalAgeModule } from '../../components/calendar/data-picker-legal-age/date-picker-legal-age.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TablePaginationModule,
    DatePickerLegalAgeModule,
  ],
})
export class UsersModule {}
