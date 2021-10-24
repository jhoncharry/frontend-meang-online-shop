import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, TitleComponent],
  exports: [HeaderComponent, SidebarComponent, TitleComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
