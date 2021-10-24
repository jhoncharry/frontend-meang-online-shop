import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { getGenres } from 'src/app/@graphql/operators/query/genre.query';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode;
  context: object;

  include: boolean;
  itemsPage: number;

  dataList: any;
  columns: Array<any>;

  constructor() {
    this.query = getGenres;
    // this.context = {};

    this.include = true;
    // this.itemsPage = 5;

    this.dataList = {
      definitionKey: 'genres',
      listKey: 'genres',
    };

    this.columns = [
      {
        label: '#',
        property: 'id',
      },
      {
        label: 'Genres name',
        property: 'name',
      },
      {
        label: 'Slug',
        property: 'slug',
      },
    ];
  }

  ngOnInit(): void {}
}
