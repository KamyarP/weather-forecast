import { createAction, props } from '@ngrx/store';
import { LocationDetails } from '../models/LocationDetails';

export enum LocationActionTypes {
  LoadLocation = '[Location] Load Location',
  LoadLocationError = '[Location] Load Location Error',
}

export const loadLocation = createAction(
  LocationActionTypes.LoadLocation,
  props<{ locationDetails: LocationDetails }>()
);

export const loadLocationError = createAction(
  LocationActionTypes.LoadLocationError,
  props<{ error: string }>()
);
