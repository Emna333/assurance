import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;

  constructor(private X: FormBuilder, private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.loginForm = this.X.group({

      phone: ['', [Validators.required, Validators.minLength(8)]],
      pwd: ['', [Validators.required]]
    })
  }

  login() {
    console.log('here is user object', this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('here resp from BE', response);
        if ( response.msg == "1") {
          this.errorMsg = 'Mot de passe incorrect !';
        }
       
        else {
          localStorage.setItem('connectedUser', JSON.stringify(response.connectedUser));
          if (response.connectedUser.role == 'agent') {
            // this.router.navigate(['admin']);

          } else {
            // this.router.navigate(['']);
          }
        }

      });
  }

}
