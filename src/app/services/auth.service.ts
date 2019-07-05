import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyCA3O-HV8lJ6Alm3IHwJM-57aKYnYzfMBA';

  userToken: string;

  // Crear nuevo usuario
  // /signupNewUser?key=[API_KEY]

  // Login
  // /verifyPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {

    this.leerToken();

  }


  logout() {

    localStorage.removeItem('token');

  }

  login( usuario: UsuarioModel ) {

    const authData = {

      /*

        email: usuario.email,
        password: usuario.password,

      */

      ...usuario, // Le manda el objeo que es lo mismo que hacer lo que esta arriba comentado porque tiene esos atributos el model
      returnSecureToken: true

    };

    return this.http.post(

      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(

      map( res => {

        console.log('Entro en el mapa del RXJS');

        this.guardarToken( res['idToken'] );
        return res;

      })

    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {

      /*

        email: usuario.email,
        password: usuario.password,

      */

      ...usuario, // Le manda el objeo que es lo mismo que hacer lo que esta arriba comentado porque tiene esos atributos el model
      returnSecureToken: true

    };


    return this.http.post(

      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(

      map( res => {

        console.log('Entro en el mapa del RXJS');

        this.guardarToken( res['idToken'] );
        return res;

      })

    );

  }


  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // Tiempo de expiración del token
    const hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );

  }

  leerToken() {

    if ( localStorage.getItem('token') ) {

      this.userToken = localStorage.getItem('token');

    } else {


      this.userToken = '';

    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    // Si el token no existe (muy chico), no es valido
    if ( this.userToken.length < 2 ) {

      return false;

    }

    // Verificar si no expiro el token seteado
    const expira = Number( localStorage.getItem('expira') );
    const expiraDate = new Date();
    expiraDate.setTime( expira );

    // Si la fecha de expiración es mayor que la fecha actual => sigue siendo válido el token (sino se vuelve invalido)
    if ( expiraDate > new Date() ) {

      return true;

    } else {

      return false;

    }


  }

}
