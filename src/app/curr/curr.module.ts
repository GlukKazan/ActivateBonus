import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrComponent } from './curr.component';
import { CurrService } from './curr.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrComponent],
  providers: [CurrService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CurrModule { }
