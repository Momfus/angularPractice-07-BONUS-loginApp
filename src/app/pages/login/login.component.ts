import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;


  constructor(  private auth: AuthService,
                private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

    // Si existe información para recordar en el localStorage, lo trae para recordar
    if ( localStorage.getItem('email') ) {

      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;

    }


  }

  login( form: NgForm ) {

    console.log('Imprimir si el formulario es válido');

    if ( form.invalid ) { return;  }

    // Cartel de mensaje de sweetAlert
    Swal.fire({

      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'

    });

    Swal.showLoading();

    // Verificar login
    this.auth.login(this.usuario)
              .subscribe(
                (res) => {

                  console.log(res);
                  Swal.close();

                  // Guardar la información si esta puesto que se recuerde en el localStorage
                  if ( this.recordarme ) {
                    localStorage.setItem('email', this.usuario.email);
                  }

                  this.router.navigateByUrl('/home');

                },
                (err) => {

                  console.log(err.error.error.message);
                  Swal.fire({
                    type: 'error',
                    title: 'Error al autenticar',
                    text: err.error.error.message
                  });

                }
              );


  }

}
