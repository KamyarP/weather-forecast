import { loadLocation } from './location.actions';

describe('Location', () => {
  it('should create an instance', () => {
    expect(loadLocation({ locationDetails: { lat: 0, lng: 0 } })).toBeTruthy();
  });
});
