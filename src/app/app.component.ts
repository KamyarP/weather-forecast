import { selectWeatherError } from './reducers/index';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-forecast';
  error = this.store.pipe(select(selectWeatherError));
  constructor(private store: Store<State>) {}
}
