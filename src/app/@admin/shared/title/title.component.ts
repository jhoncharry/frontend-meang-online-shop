import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { TitleService } from '../../core/services/title.service';

@Component({
  selector: 'app-admin-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  title: string;

  constructor(private titleService: TitleService) {
    this.titleService.title$.subscribe((title: string) => (this.title = title));
  }

  ngOnInit(): void {}
}
