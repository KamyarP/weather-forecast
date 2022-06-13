import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocationActionTypes } from '../location/location.actions';
import { WeatherService } from './weather.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadWeatherFailure, loadWeatherSuccess } from './weather.actions';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {
  loadLocation = createEffect(() => {
    return this.actions.pipe(
      ofType(LocationActionTypes.LoadLocation),
      mergeMap((action) =>
        // @ts-ignore
        this.weatherService.getWeatherData(action.locationDetails).pipe(
          map((result) => {
            return loadWeatherSuccess({ data: result });
          }),
          catchError((err: string) => {
            return of(loadWeatherFailure({ error: err }));
          })
        )
      )
    );
  });

  loadLocationError = createEffect(() => {
    return this.actions.pipe(
      ofType(LocationActionTypes.LoadLocationError),
      map((action) => loadWeatherFailure({ error: '' }))
    );
  });

  constructor(
    private actions: Actions,
    private weatherService: WeatherService
  ) {}
}
