import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  errorMsg: any;
  addClientForm: FormGroup;

  constructor(private X: FormBuilder, private userService: UserService, private router: Router, private contactService: ContactService) { }
  ngOnInit() {
    this.addClientForm = this.X.group({
      nom: ['', [Validators.required]],//validateur obligatoire
      phone1: ['', [Validators.required, Validators.minLength(8)]],
      phone2: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],

    })
  }

  signup() {
    console.log('here add client obj', this.addClientForm.value)
    this.addClientForm.value.role = 'client';
    this.userService.signup(this.addClientForm.value, this.addClientForm.value.photo).subscribe(
      (response) => {
        console.log('here resp from BE', response);
        if (response.msg == 'Error with signup') {
          this.errorMsg = response.msg;
        } else {
          this.contactService.submitContactForm(this.addClientForm.value).subscribe((response) => {
            console.log(response.msg);
          });

          this.router.navigate(['login']);
        }
      });
  }

}
