import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegComponent } from './reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegService } from './reg.service';

@NgModule({
  declarations: [RegComponent],
  providers: [RegService],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegModule { }
