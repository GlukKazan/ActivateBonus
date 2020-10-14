import { Component, OnInit } from '@angular/core';
import { BonusService } from './bonus.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css'],
  providers: [BonusService]
})
export class BonusComponent implements OnInit {

  bonus: string;
  done: boolean;
  success: boolean;
  activated: Date;

  constructor(
    private serv: BonusService
  ) { }

  ngOnInit(): void {
    this.bonus = '';
    this.done = false;
    this.success = false;
    this.activated = null;
  }

  submit(): void {
    this.done = false;
    this.activated = null;
    this.serv.getBonus(this.bonus).subscribe(
      (data: any) => {        
        console.log(data);
        this.success = true;
        this.done = true;
        this.activated = data.activated;
      },
      (error: any) => {
        let status = error.status;
        if (status == 404) {
            this.success = false;
            this.done = true;
            this.activated = null;
          } else {
            alert("Error: " + status);
        }
      });
  }
}
