import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-hello-page',
  templateUrl: './hello-page.component.html',
  styleUrls: ['./hello-page.component.scss']
})
export class HelloPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
