import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { getUsers } from 'src/app/@graphql/operators/query/user.query';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode;
  context: object;

  include: boolean;
  itemsPage: number;

  dataList: any;
  columns: Array<any>;

  constructor() {
    this.query = getUsers;
    // this.context = {};

    this.include = true;
    // this.itemsPage = 5;

    this.dataList = {
      definitionKey: 'users',
      listKey: 'users',
    };

    this.columns = [
      {
        label: '#',
        property: '_id',
      },
      {
        label: 'Name',
        property: 'name',
      },
      {
        label: 'Lastname',
        property: 'lastname',
      },
      {
        label: 'Email',
        property: 'email',
      },
      {
        label: 'Roles',
        property: 'role',
      },
    ];
  }

  ngOnInit(): void {}
}
