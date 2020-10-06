import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusComponent } from './bonus.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BonusComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BonusModule { }
