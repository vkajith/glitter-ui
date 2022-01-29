import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { UserModel } from 'src/app/models/user-model';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TweetService } from 'src/app/services/tweet.service';
//import { UsersServiceService } from 'src/app/services/users-service.service';
 

@Component({
  selector: 'app-edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.css']
})



export class EditTweetComponent implements OnInit {
 
  selectedTweet: any;
  editForm!: FormGroup;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, private usersService: UserService, private formBuilder: FormBuilder, private router: Router
    ,private tweetService: TweetService) 
    {

     }
 
  ngOnInit() {
 
    this.setForm()
  }
 
  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;

    console.log(this.editForm.value.tweetBody,this.editForm.value.id)

    this.tweetService.editTweet(this.editForm.value.tweetBody, this.editForm.value.id)
      .subscribe((data: any) => {
        console.log(data);
        this.modal.close();
      },
      error => {
        this.isLoading = false;
      });
  }
 
  
  get editFormData() { return this.editForm.controls; }
 
  private setForm() {
    console.log(this.selectedTweet);
     
    this.editForm = this.formBuilder.group({
      id: [this.selectedTweet.TweetId],
      tweetBody : [this.selectedTweet.Message,Validators.required],
    });
  }
}