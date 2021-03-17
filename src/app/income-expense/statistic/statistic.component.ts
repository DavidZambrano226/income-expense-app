import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeExpenseModel } from 'src/app/models/income-expense.mode';
import { AppState } from '../../app.reducer';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: []
})
export class StatisticComponent implements OnInit {

  countIncomes = 0;
  countExpenses = 0;

  totalIncomes = 0;
  totalExpeses = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartColors: Color[] = [{backgroundColor: ['#36a2eb', '#ff6384',]}];


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('incomeExpense').subscribe(({ items }) => this.generateStatistic( items ));
  }

  generateStatistic( items: IncomeExpenseModel[] ) {
    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes +=  Number(item.ammount);
        this.countIncomes ++;
      } else {
        this.totalExpeses +=  Number(item.ammount);
        this.countExpenses ++;
      }
    }
    this.doughnutChartData = [[ this.totalIncomes, this.totalExpeses ]];
  }

}
