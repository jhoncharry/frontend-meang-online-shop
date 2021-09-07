import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
