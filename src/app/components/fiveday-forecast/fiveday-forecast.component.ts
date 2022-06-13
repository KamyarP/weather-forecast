import { isLoading, selectFiveDayForecast } from '../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Sort } from '@angular/material/sort';
import { HourlyForecast } from 'src/app/models/Weather';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fiveday-forecast',
  templateUrl: './fiveday-forecast.component.html',
  styleUrls: ['./fiveday-forecast.component.css'],
})
export class FiveDayForecastComponent implements OnInit {
  columns: string[] = ['Time', 'Temp'];
  data = this.store.pipe(select(selectFiveDayForecast));
  isLoading?: Observable<boolean>;

  sortedData = this.data.pipe(
    map((items) => {
      this.sortByDate(items);
      return items;
    })
  );
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isLoading = this.store.pipe(select(isLoading));
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') return;
    this.sortedData = this.data.pipe(
      map((items) => {
        this.sortByDate(items, sort.direction !== 'asc');
        return items;
      })
    );
  }

  sortByDate(arr: HourlyForecast[] | undefined, desc: boolean = false): void {
    if (!arr) return;
    arr.sort((a: HourlyForecast, b: HourlyForecast) => {
      return desc
        ? b.date.getTime() - a.date.getTime()
        : a.date.getTime() - b.date.getTime();
    });
  }

  formatDate = (d: Date) =>
    [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') +
    ' ' +
    d.getHours() +
    ':00';
}
