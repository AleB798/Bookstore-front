import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor() { 
    //quand on arrive sur l'app et que l'utilisateur est déjà connecté 
    // on extrait les données du jwt stocké dans le localstorage

    const jwt = localStorage.getItem('token')

    if(jwt != null) {
      this.decodeJwt(jwt)
    }
  }

  decodeJwt(jwt: string) {

    localStorage.setItem('token', jwt)

    const jwtParts = jwt.split("."); //on découpe le jwt en 3 parties
    const jwtBodyBase64 = jwtParts[1];// on récupère la partie du data du jwt
    const jwtBodyDecoded = atob(jwtBodyBase64); //décode la base 64
    this.user = JSON.parse(jwtBodyDecoded); //on transforme le JSON en objet JS

  }

  deconnexion() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
