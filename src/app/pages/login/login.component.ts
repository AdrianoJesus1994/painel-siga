import { FormLoginComponent } from './../../components/form-login/form-login.component';
import { Router } from '@angular/router';
import Credenciais from 'src/app/models/loginmodel';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin: FormLoginComponent;

  userCredencial: Credenciais = new Credenciais();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(
  ) {
  }

  doLogin(credenciais: Credenciais) {
    this.formLogin.error = null;
  
    if(!this.validateData(credenciais)) return;

    this.authService.authLogin(credenciais)
    .subscribe((user) => {
      console.log('USUÁRIO LOGADO');
    }, (e) => {
      console.log(e)
      this.formLogin.error = e.error.error;
    });
  }

  validateData(credenciais: Credenciais) {
    if(!credenciais.email || !credenciais.password){
      this.formLogin.error = "Email e senha são obrigatórios.";
      return
    }else if( credenciais.email.indexOf('@') === -1 || credenciais.email.split('@')[1].indexOf('.') === -1 ){
      this.formLogin.error = "Email informado inválido.";
      return
    }
    return true;
  }

}
