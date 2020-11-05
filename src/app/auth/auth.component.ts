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

  submit(): void {
    localStorage.removeItem('myAuthToken');
    this.serv.auth(this.login, this.pass).subscribe(
      (data: any) => {
        console.log("Access Token [" + data.access_token + "]");
        sessionStorage.setItem('myAuthRole', data.role);
        localStorage.setItem('myAuthToken', data.access_token);
//      localStorage.setItem('myRefreshToken', data.refresh_token);
        localStorage.setItem('myRole', data.role);
        if (data.realm == 2) {
          this.router.navigate(['bonus']);
        } else {
          this.router.navigate(['launch']);
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
