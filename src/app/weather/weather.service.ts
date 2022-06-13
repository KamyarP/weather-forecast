import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocationDetails } from '../models/LocationDetails';
import { DailyForecast, WeatherData } from '../models/Weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getWeatherData(
    locationData: LocationDetails
  ): Observable<WeatherData> {
    const url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      locationData.lat +
      '&lon=' +
      locationData.lng +
      '&units=metric&appid=' +
      environment.openWeatherApiKey;
    return this.http.get(url).pipe(
      map((response: any) => {
        const groups = response.list.reduce(
          (groups: DailyForecast[], item: any) => {
            const day = this.convertFromEpoch(item.dt)
              .toISOString()
              .split('T')[0];
            if (!groups.find((d) => d.day === day)) {
              groups.push({ day: day, hourlyForecasts: [] });
            }
            groups
              .find((d) => d.day === day)
              ?.hourlyForecasts.push({
                date: this.convertFromEpoch(item.dt),
                temp: item.main.temp,
              });
            return groups;
          },
          []
        );
        return { forecasts: groups };
      }),
      catchError(() =>
        throwError(() => new Error('error when fetching forecasts'))
      )
    );
  }

  private convertFromEpoch(milliseconds: number): Date {
    const dt = new Date(0);
    dt.setUTCSeconds(milliseconds);
    return dt;
  }
}
