import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: any[] = []

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser().subscribe(
      data =>{
        this.users = data;
        console.log(data);
      },
      error =>{
        alert("Error");
      }
    )
  }
  

}
