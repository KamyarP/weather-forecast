import {
  loadWeatherFailure,
  loadWeatherSuccess,
} from '../weather/weather.actions';
import { createReducer, on } from '@ngrx/store';
import { loadWeather } from '../weather/weather.actions';
import { WeatherData } from '../models/Weather';

export interface WeatherState {
  data: WeatherData | null;
  error: string | null;
  loading: boolean;
}

const initialWeatherState: WeatherState = {
  data: null,
  error: null,
  loading: false,
};

export const weatherReducer = createReducer(
  initialWeatherState,
  on(loadWeather, (state, action) => ({
    data: null,
    error: null,
    loading: true,
  })),
  on(loadWeatherSuccess, (state, action) => ({
    data: action.data,
    error: null,
    loading: false,
  })),
  on(loadWeatherFailure, (state, action) => ({
    error: action.error,
    data: null,
    loading: false,
  }))
);
