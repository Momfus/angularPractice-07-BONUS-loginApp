import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(  private auth: AuthService,
                private router: Router ) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ) {

    if( form.invalid ) { return; }

    // Cartel de mensaje de sweetAlert
    Swal.fire({

      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'

    });

    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
              .subscribe(

                (res) => {

                console.log(res);
                Swal.close(); // cerrar mensaje sweet Alert

                // Guardar la información si esta puesto que se recuerde en el localStorage
                if ( this.recordarme ) {
                  localStorage.setItem('email', this.usuario.email);
                }

                this.router.navigateByUrl('/home');


                },
                (err) => {

                  console.log(err.error.error.message);

                  // Mensaje sweetAlert de error
                  Swal.fire({
                    type: 'error',
                    title: 'Error al autenticar',
                    text: err.error.error.message
                  });


                }
              );

  }


}
