import { isLoading, selectTodayWeather } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { HourlyForecast } from 'src/app/models/Weather';

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.css'],
})
export class TodayWeatherComponent implements OnInit {
  columns: string[] = ['Time', 'Temp'];
  data?: Observable<HourlyForecast[] | undefined>;
  isLoading?: Observable<boolean>;
  todayText = new Date().toISOString().split('T')[0];
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.data = this.store.pipe(select(selectTodayWeather));
    this.isLoading = this.store.pipe(select(isLoading));
  }
}
