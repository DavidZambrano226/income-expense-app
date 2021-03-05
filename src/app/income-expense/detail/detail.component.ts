import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IncomeExpenseModel } from '../../models/income-expense.mode';
import { Subscription } from 'rxjs';
import { IncomeExpenseService } from '../../services/income-expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  incomeExpenses: IncomeExpenseModel[];
  itemSubs: Subscription;

  constructor( private store: Store<AppState>, private incomeService: IncomeExpenseService ) { }

  ngOnInit() {

    this.itemSubs = this.store.select('incomeExpense').subscribe( ({ items }) => this.incomeExpenses = items);

  }

  ngOnDestroy(): void {
    this.itemSubs.unsubscribe();
  }

  deleteItem( item: any ) {
    this.incomeService.deleteItem(item.uid)
      .then(() => Swal.fire('Item eliminado', `El item con fue eliminado correctamente`, 'success'))
      .catch((err) => Swal.fire('Se prenseto un error', err.message, 'error'));
  }

}
