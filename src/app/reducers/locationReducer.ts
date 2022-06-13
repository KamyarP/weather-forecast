import { createReducer, on } from '@ngrx/store';
import { LocationDetails } from '../models/LocationDetails';
import { loadLocation, loadLocationError } from '../location/location.actions';

export interface LocationState {
  location: LocationDetails | null;
  error: string | null;
}

const initialLocationState: LocationState = { location: null, error: null };

export const locationReducer = createReducer(
  initialLocationState,
  on(loadLocation, (state) => state),
  on(loadLocationError, (state, action) => ({
    location: null,
    error: action.error,
  }))
);
