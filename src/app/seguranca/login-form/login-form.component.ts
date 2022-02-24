import { Component, OnInit } from '@angular/core';
import {Seguranca} from "../../core/model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  seguranca = new Seguranca();

  constructor() { }

  ngOnInit(): void {
  }

  login(usuario: Seguranca){

  }

}
