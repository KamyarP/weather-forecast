import { Action, createAction, props } from '@ngrx/store';
import { WeatherData } from '../models/Weather';

export enum WeatherActionTypes {
  LoadWeather = '[Weather] Load Weather',
  LoadWeatherSuccess = '[Weather] Load Weather Success',
  LoadWeatherFailure = '[Weather] Load Weather Failure',
}

export const loadWeather = createAction(WeatherActionTypes.LoadWeather);

export const loadWeatherSuccess = createAction(
  WeatherActionTypes.LoadWeatherSuccess,
  props<{ data: WeatherData | null }>()
);

export const loadWeatherFailure = createAction(
  WeatherActionTypes.LoadWeatherFailure,
  props<{ error: string }>()
);
