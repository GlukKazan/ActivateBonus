import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { MustMatch } from '../reg/must-match.validator';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private serv: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fio: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      confirm: ['']/*,
      mail: ['', [Validators.email]]*/
      }, {
        validator: MustMatch('password', 'confirm')
      }
    );
    this.loadProfile();
  }

  get f() { return this.registerForm.controls; }

  private loadProfile() {
    this.serv.getProfile().subscribe((data: User) => {
      this.id = data.id;
      this.f.fio.setValue(data.name);
      this.f.username.setValue(data.username);
//    this.f.mail.setValue(data.email);
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['']);
      } else {
        alert("Error: " + status);
      }
    })
  }

  submit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.router.navigate(['profile']);
      return;
    }
    this.serv.changeProfile(this.id, this.registerForm.value).subscribe(
      (data: any) => {
        alert("Changes saved");
      },
      (error: any) => {
        let status = error.status;
        if (status == 500) {
          alert("Account already existed");
        } else
        if ([401, 403].includes(status)) {
          this.router.navigate(['auth']);
        } else {
          alert("Error: " + status);
        }
    });
  }
}
