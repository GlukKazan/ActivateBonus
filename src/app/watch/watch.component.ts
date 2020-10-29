import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../interface/session';
import { WatchService } from './watch.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
  providers: [WatchService]
})
export class WatchComponent implements OnInit {

  sessions: Array<Session>;
  
  constructor(
    private serv: WatchService,
    private router: Router
  ) { 
    this.sessions = new Array<Session>();
  }

  ngOnInit(): void { 
    this.loadSessions();
  }

  private loadSessions() {
    this.serv.getSessions().subscribe((data: Session[]) => {
      this.sessions = data;
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  public join(it: Session) {
    if (!confirm("Join to Session?")) return;
    let url = '/dagaz/' + it.filename + '.html?sid=' + it.id;
    if (it.selector_value > 0) {
      url = url + '&selector=' + it.selector_value;
    }
    if (url) {
      window.location.href = url;
    }
  }
}
