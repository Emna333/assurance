import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'] ,
})
export class AddAgentComponent implements OnInit {
  errorMsg:any;
  signupForm: FormGroup;
  imagePreview:string;

  constructor(private X:FormBuilder,private userService:UserService, private router:Router) { }
  ngOnInit() {
    this.signupForm= this.X.group({
      nom: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phone: ['',[Validators.required, Validators.minLength(8)]],
      email: ['',[Validators.required, Validators.email]],
      // pwd: ['', [Validators.required]],
      photo:[''],


    })
  }

  signup(){
    console.log('here add agent obj', this.signupForm.value) 
    this.signupForm.value.role='agent';
    this.userService.signup(this.signupForm.value,this.signupForm.value.photo).subscribe(
      (response)=>{ console.log('here resp from BE' ,response);
      if (response.msg=='Error with signup') {
        this.errorMsg= response.msg;
      } else {
        this.router.navigate(['login']);
      }
    }); 
    }

    onImageSelected(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.signupForm.patchValue({ photo: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
      }

}
