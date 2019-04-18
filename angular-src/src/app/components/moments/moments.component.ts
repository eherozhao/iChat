import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit {
  token: any;
  momentsTab = false;
  topMomentsTab = false;

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.momentsTab = true;
    this.token = this.tokenService.GetPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  ChangeTabs(value) {
    if (value === 'moments') {
      this.momentsTab = true;
      this.topMomentsTab = false;
    }

    if (value === 'top') {
      this.momentsTab = false;
      this.topMomentsTab = true;
    }
  }
}
