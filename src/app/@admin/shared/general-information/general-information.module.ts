import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './general-information.component';

@NgModule({
  declarations: [GeneralInformationComponent],
  exports: [GeneralInformationComponent],
  imports: [CommonModule],
})
export class GeneralInformationModule {}
