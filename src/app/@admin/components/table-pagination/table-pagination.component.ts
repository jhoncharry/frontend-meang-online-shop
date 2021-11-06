import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TablePaginationService } from './table-pagination.service';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent
  implements OnInit, OnChanges, OnDestroy, OnChanges
{
  @Input() query: DocumentNode;
  @Input() context: object;

  @Input() include: boolean;
  @Input() itemsPage: number;

  @Input() dataList: any;
  @Input() tableColumns: Array<any>;

  @Input() load: boolean;

  @Output() manageItem = new EventEmitter<string[]>();
  @Output() loadChild = new EventEmitter<boolean>();

  data$: Observable<any>;

  page: number;
  pages: number;
  total: number;

  allowPageItems: number[];
  defaultItemPage: number;

  constructor(
    private tableService: TablePaginationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.allowPageItems = [5, 10, 15, 20];
  }

  ngOnDestroy(): void {
    console.log('DESTRUYÓ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.currentValue === true) {
      this.loadData();
    }
  }

  ngOnInit() {
    if (!this.query) throw new Error('Query is undefined, please add');

    if (!this.dataList) throw new Error('Data list is undefined, please add');

    if (!this.tableColumns)
      throw new Error('Table Columns is undefined, please add');

    this.itemsPage = this.itemsPage || 10;
    this.defaultItemPage = this.allowPageItems.includes(this.itemsPage)
      ? this.itemsPage
      : 10;

    this.route.queryParams.subscribe(async (params) => {
      this.total = this.total || (await this.totalDocumentLoad().toPromise());

      // Page
      const pageParams = +params.page;
      this.page = pageParams;
      if (!this.page) {
        this.page = 1;
      }

      // Items page
      const itemsParams = +params.items;
      if (itemsParams && itemsParams === this.defaultItemPage) {
        this.defaultNavigate();
      }

      if (itemsParams) {
        this.itemsPage = itemsParams;
      } else if (this.itemsPage !== this.defaultItemPage) {
        this.defaultNavigate();
      }

      if (this.allowPageItems.includes(this.itemsPage)) {
        this.loadData();
      } else {
        this.defaultNavigate();
      }
    });
  }

  defaultNavigate() {
    this.itemsPage = this.defaultItemPage;
    this.router.navigate([]);
  }

  getVariables() {
    return {
      page: this.page,
      itemsPage: this.itemsPage,
      include: this.include,
    };
  }

  loadData() {
    this.data$ = this.tableService
      .getCollectionData(this.query, this.getVariables(), this.context)
      .pipe(
        first(),
        map((result) => {
          const data = result.data[this.dataList.definitionKey];
          if (data) {
            this.total = data.info.total;
            this.pages = data.info.pages;
            this.loadChild.emit(false);
            return data[this.dataList.listKey];
          }
        })
      );
  }

  totalDocumentLoad() {
    return this.tableService
      .getCollectionData(this.query, this.getVariables(), this.context)
      .pipe(
        first(),
        map((result) => {
          const data = result.data[this.dataList.definitionKey];
          if (data) {
            const { total } = data.info;
            if (!total)
              throw new Error(
                'The number of documents is undefined, please check with support'
              );
            return total;
          }
        })
      );
  }

  changeItemPage(items: number) {
    if (items === this.defaultItemPage) {
      this.router.navigate([]);
    } else {
      this.router.navigate([], {
        queryParams: { items },
      });
    }
  }

  changePage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  manageAction(action: string, data: any) {
    console.log('DATA', action, data);
    this.manageItem.emit([action, data]);
  }
}
