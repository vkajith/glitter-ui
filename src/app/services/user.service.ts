import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Register } from '../models/register.model';
import { Login } from '../models/login.model';
import { Tweet } from '../models/tweet.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASE_URL = 'https://localhost:44385/api/Account/';
  formData!:Register;
  formLoginData!:Login;

  constructor(private http: HttpClient, private router: Router) {
    }

    isValid(email: string){
      return this.http.post(this.BASE_URL + 'IsValid',{
        EmailId:email
      })
    }
    getFollowing(): Observable<User[]> {
    return this.http.post<User[]>(this.BASE_URL + 'getFollowee/',{EmailId :sessionStorage.getItem('currentUserEmail')});
    }
    getFollowers(): Observable<string[]> {
    return this.http.post<string[]>(this.BASE_URL + 'getFollower/',{EmailId :sessionStorage.getItem('currentUserEmail')});
    }

    register(firstName: string, lastName: string, email: string, password: string, contact: string, region: string, image: string) 
    {
      return this.http.post(this.BASE_URL + 'Register/', {
        Name : firstName + " " + lastName,
        EmailId: email,
        Password: password,
        PhoneNumber: contact,
        CountryOfOrigin: region,
        Image: image
      });
    }

    login(email: string, password: string) {
    return this.http.post(this.BASE_URL + 'Login/', {EmailId: email, Password: password});
    }
    logout() {
    return this.http.post(this.BASE_URL + 'Logout/', {});
    }
    followUser(id: string) {
    return this.http.post(this.BASE_URL + 'FollowUser/', {FolloweeId : id, FollowerId :sessionStorage.getItem('currentUserEmail') });
    }
    unfollowUser(id: number) {
      return this.http.post(this.BASE_URL + 'Unfollow/' + id, {});
    }
    searchPeople(searchString: string):Observable<User[]>{
    return this.http.post<User[]>(this.BASE_URL + 'searchPostPeople/', {Name: searchString});
    }
    searchPost(searchString: string):Observable<Tweet[]>{
      return this.http.post<Tweet[]>(this.BASE_URL +'searchPostTag/', {TagName: searchString});
    }
}
