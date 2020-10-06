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
        localStorage.setItem('myAuthToken', data.access_token);
//      localStorage.setItem('myRefreshToken', data.refresh_token);
        localStorage.setItem('myRole', data.role);
        this.router.navigate(['bonus']);
      },
      (error: any) => {
        let status = error.status;
        if (status == 401) {
            alert("Логин или пароль не найден");
        } else {
            alert("Error: " + status);
        }
      });
  }

}
