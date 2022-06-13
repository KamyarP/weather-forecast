import { loadWeather } from '../../weather/weather.actions';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectLocationError, State } from '../../reducers';
import {
  loadLocation,
  loadLocationError,
} from '../../location/location.actions';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent implements OnInit {
  //@Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('txtCityName') txtCityName: any;

  citySelectInput?: string;

  error = this.store.pipe(select(selectLocationError));
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.loadAutoComplete();
  }

  private loadAutoComplete() {
    const url = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places&language=en`;
    this.loadScript(url).then(() => this.initAutocomplete());
  }

  private loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.head, script);
    });
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.txtCityName.nativeElement,
      { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        this.store.dispatch(
          loadLocationError({
            error: `invalid value: ${place.name}`,
          })
        );
      } else {
        this.store.dispatch(loadWeather());
        this.store.dispatch(
          loadLocation({
            locationDetails: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          })
        );
      }
    });
  }
}
