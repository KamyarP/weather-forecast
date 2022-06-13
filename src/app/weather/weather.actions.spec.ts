import { loadWeather } from './weather.actions';

describe('Weather', () => {
  it('should create an instance', () => {
    expect(loadWeather()).toBeTruthy();
  });
});
