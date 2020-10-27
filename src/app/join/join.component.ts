import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoinService } from './join.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
  providers: [JoinService]
})
export class JoinComponent implements OnInit {

  constructor(
    private serv: JoinService,
    private router: Router
  ) { }

  ngOnInit(): void { }

}
