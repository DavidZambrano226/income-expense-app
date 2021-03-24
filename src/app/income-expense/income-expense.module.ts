import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseComponent } from './income-expense.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpensePipe } from '../pipes/income-expense.pipe';
import { TranslateTypePipe } from '../pipes/translate-type.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { DasboardRoutesModule } from '../dashboard/dasboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';

@NgModule({
  declarations: [
    IncomeExpenseComponent,
    StatisticComponent,
    DetailComponent,
    DashboardComponent,
    IncomeExpensePipe,
    TranslateTypePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    ShareModule,
    DasboardRoutesModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
  ]
})
export class IncomeExpenseModule { }
