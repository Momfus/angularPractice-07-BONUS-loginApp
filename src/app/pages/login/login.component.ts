import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;


  constructor() { }

  ngOnInit() {

    this.usuario = new UsuarioModel();


  }

  login( form: NgForm ) {

    console.log('Imprimir si el formulario es válido');

    if( form.invalid ) { return;  }

    console.log( this.usuario );
    console.log(form);


  }

}
