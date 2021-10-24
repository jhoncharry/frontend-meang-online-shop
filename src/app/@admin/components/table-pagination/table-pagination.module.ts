import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TablePaginationComponent],
  exports: [TablePaginationComponent],
  imports: [CommonModule, FormsModule, NgbPaginationModule],
})
export class TablePaginationModule {}
