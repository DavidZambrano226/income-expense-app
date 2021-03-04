import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actios';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(  public auth: AngularFireAuth,
                public firestore: AngularFirestore,
                private store: Store<AppState>
                ) { }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if ( firebaseUser ) {
       this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe( fireStoreUser => {
            console.log(fireStoreUser);
            const user = User.fromFirestore(fireStoreUser);
            this.store.dispatch( authActions.setUser({ user }) );
          });
        } else {
          this.userSubscription.unsubscribe();
          this.store.dispatch( authActions.unSetUser() );
      }
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
