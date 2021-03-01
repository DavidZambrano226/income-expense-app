import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, public firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      console.log(firebaseUser);
      // console.log(firebaseUser.uid);
      // console.log(firebaseUser.email);
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
            .then( ({ user }) => {
              console.log(user);
              const newUser = new User( user.uid, name, user.email );
              console.log(newUser);
              return this.firestore.doc(`${user.uid}/user`).set({...newUser});
            });

  }

  singIn(email: string, password: string) {

    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fuser => fuser !== null )
    );
  }

}
