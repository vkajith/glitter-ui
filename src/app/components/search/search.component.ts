import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchStr : string;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

searchData(searchString: string): void{
  
  this.router.navigate(['searchlist',{searchStr : searchString}], {relativeTo: this.activatedRoute});
  
}


}
