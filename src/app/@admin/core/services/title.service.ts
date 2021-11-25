import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  title = new Subject<string>();
  title$ = this.title.asObservable();

  updateTitle(newValue: string) {
    this.title.next(newValue);
  }

  constructor() {}
}
