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

  constructor(
    private serv: BonusService
  ) { }

  ngOnInit(): void {
    this.bonus = '';
  }

  submit(): void {
    this.serv.getBonus(this.bonus).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        let status = error.status;
        if (status == 404) {
            alert("Бонус не найден");
        } else {
            alert("Error: " + status);
        }
      });
  }
}
