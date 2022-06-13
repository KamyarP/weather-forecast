import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { HourlyForecast } from '../models/Weather';
import { weatherReducer, WeatherState } from './weatherReducer';
import { locationReducer, LocationState } from './locationReducer';

export interface State {
  weather: WeatherState;
  location: LocationState;
}

export const isLoading = (state: State) => state.weather.loading;

export const selectTodayWeather = (
  state: State
): HourlyForecast[] | undefined =>
  state.weather.data?.forecasts.find(
    (x) => x.day === new Date().toISOString().split('T')[0]
  )?.hourlyForecasts;

export const selectFiveDayForecast = (
  state: State
): HourlyForecast[] | undefined => {
  const today = new Date();
  const fivDays = new Date();
  fivDays.setDate(today.getDate() + 5);
  return state.weather.data?.forecasts
    .filter((x) => new Date(x.day) > today && new Date(x.day) < fivDays)
    .flatMap((x) => x.hourlyForecasts);
};

export const selectWeatherError = (state: State) => state.weather.error;

export const reducers: ActionReducerMap<State> = {
  weather: weatherReducer,
  location: locationReducer,
};

export const selectLocationError = (state: State) => state.location.error;

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
