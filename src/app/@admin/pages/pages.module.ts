import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersModule,
    GenresModule,
  ],
})
export class PagesModule {}
