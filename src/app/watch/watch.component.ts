import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatchService } from './watch.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [WatchService]
})
export class WatchComponent implements OnInit {

  constructor(
    private serv: WatchService,
    private router: Router
  ) { }

  ngOnInit(): void { }

}
