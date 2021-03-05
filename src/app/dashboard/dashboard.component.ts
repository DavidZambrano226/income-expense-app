import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as incomeExpenseActions from '../income-expense/income-expense.actions';
import { IncomeExpenseModel } from '../models/income-expense.mode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  itemsSubs: Subscription;

  constructor( private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService ) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({ user }) => {
        this.itemsSubs = this.incomeExpenseService.getAllItems(user.uid)
          .subscribe( (incomeExpenseResult: IncomeExpenseModel[]) => {
            this.store.dispatch( incomeExpenseActions.setItems({items: incomeExpenseResult}) );
          });
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.itemsSubs.unsubscribe();
  }

}
