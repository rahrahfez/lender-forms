import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  registerNewUser() {
    this.router.navigate(['/register']);
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }
}
