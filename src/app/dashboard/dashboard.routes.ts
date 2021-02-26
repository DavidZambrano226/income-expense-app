import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from '../income-expense/detail/detail.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { StatisticComponent } from '../income-expense/statistic/statistic.component';


export const DasboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'income-expense', component: IncomeExpenseComponent },
    { path: 'detail', component: DetailComponent },
]