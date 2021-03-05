import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeExpenseModel } from '../models/income-expense.mode';
import { IncomeExpenseService } from '../services/income-expense.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../share/ui.actions';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: []
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  icomeAndExpenseForm: FormGroup;
  type = 'income';
  uiSubscription: Subscription;
  showLoading = false;

  constructor(
      private fbuilder: FormBuilder,
      private incomeExpenseService: IncomeExpenseService,
      private store: Store<AppState> ) { }

  ngOnInit() {

    this.icomeAndExpenseForm = this.fbuilder.group({
      description: ['', Validators.required],
      ammount: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => this.showLoading = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  save() {
    this.store.dispatch( isLoading() );
    if ( this.icomeAndExpenseForm.invalid ) { return; }

    const { description, ammount } = this.icomeAndExpenseForm.value;

    const incomeExpense = new IncomeExpenseModel( description, ammount, this.type);

    this.incomeExpenseService.createIncomeExpense(incomeExpense)
    .then( () => {
      this.icomeAndExpenseForm.reset();
      this.store.dispatch( stopLoading() );
      Swal.fire({
          title: 'Registro creado',
          icon: 'success',
          text: description
        });
      })
      .catch ( (error) => {
        this.store.dispatch( stopLoading() );
        Swal.fire({
          title: 'Se presento un error',
          icon: 'error',
          text: error.message
        });
      });

  }

}
