import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeExpenseModel } from '../models/income-expense.mode';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor( private firestore: AngularFirestore, private authService: AuthService ) { }

  createIncomeExpense( incomeExpense: IncomeExpenseModel ) {
    console.log(incomeExpense);

    const uid = this.authService.getUser.uid;

    delete incomeExpense.uid;

    return this.firestore.doc(`${uid}/income-expense`)
      .collection('items')
      .add({...incomeExpense});
  }

  getAllItems( uid: string ) {
    return this.firestore.collection(`${uid}/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
          return snapshot.map( (doc: any) => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            };
          });
        })
      );
  }

  deleteItem( uidItem: string ) {
    const uidUser = this.authService.getUser.uid;
    return this.firestore.doc(`${uidUser}/income-expense/items/${uidItem}`).delete();
  }

}
