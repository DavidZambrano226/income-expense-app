import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth ) { }

  createUser(name: string, email: string, password: string) {
    
    return this.auth.auth.createUserWithEmailAndPassword(email, password);

  }

  singIn(email: string, password: string) {

    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.auth.singOut();
  }
}
