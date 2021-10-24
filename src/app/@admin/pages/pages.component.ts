import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-admin',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
