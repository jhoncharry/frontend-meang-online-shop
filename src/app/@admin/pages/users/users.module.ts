import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { TablePaginationModule } from '../../components/table-pagination/table-pagination.module';

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, TablePaginationModule],
})
export class UsersModule {}
