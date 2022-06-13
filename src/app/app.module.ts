import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LocationSelectComponent } from './components/location-select/location-select.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './weather/weather.effects';
import { HttpClientModule } from '@angular/common/http';
import { TodayWeatherComponent } from './components/today-weather/today-weather.component';
import { FiveDayForecastComponent } from './components/fiveday-forecast/fiveday-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationSelectComponent,
    TodayWeatherComponent,
    FiveDayForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    FormsModule,
    EffectsModule.forRoot([WeatherEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
