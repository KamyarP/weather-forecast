export interface WeatherData {
  forecasts: DailyForecast[];
}

export interface DailyForecast {
  day: string;
  hourlyForecasts: HourlyForecast[];
}

export interface HourlyForecast {
  date: Date;
  temp: string;
}
