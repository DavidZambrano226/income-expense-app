import { createReducer, on } from '@ngrx/store';
import { IncomeExpenseModel } from '../models/income-expense.mode';
import * as incomeExpenseActions from './income-expense.actions';

export interface State {
    items: IncomeExpenseModel[];
}

export const initialState: State = {
   items: [],
}

const _incomeExpenseReducer = createReducer(initialState,

    on(incomeExpenseActions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on( incomeExpenseActions.unSetItems, (state) => ({ ...state, items: [] })),

);

export function incomeExpenseReducer(state, action) {
    return _incomeExpenseReducer(state, action);
}