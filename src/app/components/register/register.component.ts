import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  display:boolean = false;
  EmailError :boolean = false;
  fileToUpload : any;
  pwdPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';


  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
  region: string;
  image: string;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(firstName: string, lastName: string, 
    email: string, password: string, contact: string, region: string, image: string): void{

    this.userService.register(firstName, lastName, email, password, contact, region, image)
      .subscribe((data) => {
        this.router.navigateByUrl('/login');
      },
      err => {console.error('Observer got an error: ' + err)

    },);
  }

  onImageUpload(evt: any) {
    this.display = true;
    this.fileToUpload = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
    
    var binaryString = btoa(event.target.result);
    var base64textString = 'data:image/jpeg;base64,' + btoa(event.target.result);
    
    };
    reader.readAsBinaryString(this.fileToUpload);
    } 
  
    onBlur(field : NgModel):void {
      console.log('in onBlur: ', field.valid);
    }
  
    onSubmit(form: NgForm):void {
      console.log('in onSubmit: ', form.valid);
      if(form.valid){

        this.userService.isValid(this.email).subscribe((data:any)=>{
          if(data){
            this.register(this.firstName,this.lastName,this.email,this.password,this.contact,this.region,this.image);
            console.log("Valid email");

          }
          else{
            this.EmailError = true;
            console.log("Email already exist");
          }
        })
      }
      
    }
  

}
