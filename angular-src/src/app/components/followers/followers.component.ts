import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers = [];
  user: any;

  socket: any;

  constructor(
    private tokenService: TokenService,
    private usersService: UsersService
  ) {
    this.socket = io();
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe(
      data => {
        this.followers = data.result.followers;
        console.log(data.result.followers[0].follower.picId);
        for (let i = 0; i < data.result.followers.length; i++) {
          if (data.result.followers[i].follower.picId === undefined) {
            this.followers[i].follower.picId = 'default.png';
            this.followers[i].follower.picVersion = '1555563619';
          }
        }
      },
      err => console.log(err)
    );
  }
}
