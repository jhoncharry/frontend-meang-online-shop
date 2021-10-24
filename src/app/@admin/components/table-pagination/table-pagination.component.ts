import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { getUsers } from 'src/app/@graphql/operators/query/user.query';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode;
  @Input() context: object;

  @Input() include: boolean;
  @Input() itemsPage: number;

  @Input() dataList: any;
  @Input() tableColumns: Array<any>;

  pageInformation: any;
  data$: Observable<any>;

  constructor(private tableService: TablePaginationService) {}

  ngOnInit(): void {
    if (!this.query) throw new Error('Query is undefined, please add');

    if (!this.dataList) throw new Error('Data list is undefined, please add');

    if (!this.tableColumns)
      throw new Error('Table Columns is undefined, please add');

    this.pageInformation = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage || 10,
      total: 1,
    };

    this.loadData();
  }

  loadData() {
    const variables = {
      page: this.pageInformation.page,
      itemsPage: this.pageInformation.itemsPage,
      include: this.include || false,
    };

    this.data$ = this.tableService
      .getCollectionData(this.query, variables, this.context)
      .pipe(
        map((result) => {
          const data = result.data[this.dataList.definitionKey];
          this.pageInformation.pages = data.info.pages;
          this.pageInformation.total = data.info.total;
          return data[this.dataList.listKey];
        })
      );
  }

  changePage() {
    this.loadData();
  }
}
