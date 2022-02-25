import { Component, OnInit } from '@angular/core';
import {Seguranca} from "../../core/model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  seguranca = new Seguranca();

  constructor(
      private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login(usuario: Seguranca){
    this.authService.login(usuario);
  }

}
