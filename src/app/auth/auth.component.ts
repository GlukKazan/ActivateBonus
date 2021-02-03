import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  login: string;
  pass: string;

  constructor(
    private serv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.login = '';
    this.pass = '';
  }

  onKeydownEvent(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      this.submit();
    }
  }

  canRecovery(): boolean {
    return localStorage.getItem('myAuthToken') !== null;
  }

  recovery(): void {
    const t = localStorage.getItem('myAuthToken');
    this.serv.recovery(t).subscribe(
      (data: any) => {
        console.log("Access Token [" + data.access_token + "]");
        localStorage.setItem('myAuthToken', data.access_token);
        localStorage.setItem('myRole', data.role);
        this.router.navigate(['profile']);
      },
      (error: any) => {
        alert("Password recovery failed");
      }
    );
  }

  submit(): void {
//  localStorage.removeItem('myAuthToken');
    this.serv.auth(this.login, this.pass).subscribe(
      (data: any) => {
        console.log("Access Token [" + data.access_token + "]");
        localStorage.setItem('myAuthToken', data.access_token);
        localStorage.setItem('myRole', data.role);
        if (data.realm == 2) {
          this.router.navigate(['bonus']);
        } else {
          const url = localStorage.getItem('currGame');
          if (url) {
            localStorage.setItem('currGame', 'launch');
            this.router.navigate([url]);
          } else {
            this.router.navigate(['launch']);
          }
        }
      },
      (error: any) => {
        let status = error.status;
        if (status == 401) {
            alert("Login or password not found");
        } else {
            alert("Error: " + status);
        }
      });
  }
}
