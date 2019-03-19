
import { CurrentConditionsDisplay } from "./displays/current-weather-conditions";
import { WeatherStation } from "./weather/WeatherStations/weather-station";
import { WeatherStatisticsDisplay } from "./displays/statistics-display";
import { WeatherData } from "./weather/WeatherData";


const station = new WeatherStation();
const conditionsDisplay = new CurrentConditionsDisplay(station);
const statisticsDisplay = new WeatherStatisticsDisplay(station);

station.setWeatherData(new WeatherData(10, 12, 233));
station.setWeatherData(new WeatherData(44, 123, 23));
