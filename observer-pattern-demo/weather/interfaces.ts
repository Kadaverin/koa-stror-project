export interface IWeatherConditions {
  temperature: number;
  humidity: number;
}

export interface IWeatherData extends IWeatherConditions {
  pressure: number;
}
