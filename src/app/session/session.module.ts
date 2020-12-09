import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session.component';
import { FormsModule } from '@angular/forms';
import { SessionService } from './session.service';

@NgModule({
  declarations: [SessionComponent],
  providers: [SessionService],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SessionModule { }
