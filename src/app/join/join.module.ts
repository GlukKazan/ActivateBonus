import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join.component';
import { FormsModule } from '@angular/forms';
import { JoinService } from './join.service';

@NgModule({
  declarations: [JoinComponent],
  providers: [JoinService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class JoinModule { }
