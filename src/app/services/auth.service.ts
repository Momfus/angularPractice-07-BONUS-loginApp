import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyCA3O-HV8lJ6Alm3IHwJM-57aKYnYzfMBA';

  // Crear nuevo usuario
  // /signupNewUser?key=[API_KEY]

  // Login
  // /verifyPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {


  }

  logout() {



  }

  login( usuario: UsuarioModel ) {



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
    )

  };

}
