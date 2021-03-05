import { createAction, props } from '@ngrx/store';
import { IncomeExpenseModel } from '../models/income-expense.mode';

export const unSetItems = createAction('[IncomeExpense] UnSet Items');
export const setItems = createAction(
    '[IncomeExpense] Set Items',
    props<{ items: IncomeExpenseModel[] }>()
);
