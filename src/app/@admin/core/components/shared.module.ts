import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, TitleComponent],
  exports: [HeaderComponent, SidebarComponent, TitleComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
