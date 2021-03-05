import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenseModel } from '../models/income-expense.mode';

@Pipe({
  name: 'orderIncomeExpense'
})
export class IncomeExpensePipe implements PipeTransform {

  transform(items: IncomeExpenseModel[]): IncomeExpenseModel[] {
    return items.slice().sort( (a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
