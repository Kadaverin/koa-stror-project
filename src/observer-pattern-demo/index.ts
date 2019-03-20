
import { CurrentConditionsDisplay } from './displays/current-weather-conditions';
import { WeatherStation } from './weather/WeatherStation/weather-station';
import { WeatherStatisticsDisplay } from './displays/statistics-display';
import { WeatherData } from './weather/WeatherData';
import { WatherStationEmitter } from './emitter/WatherStationEmitter';
import { IWeatherData } from './weather/interfaces';


const station = new WeatherStation();
const stationEmitter = new WatherStationEmitter();
const conditionsDisplay = new CurrentConditionsDisplay(station);
const statisticsDisplay = new WeatherStatisticsDisplay(station);

const conditionsDisplayAttachedToEmitter = new CurrentConditionsDisplay(stationEmitter);
const statisticsDisplayAttachedToEmitter = new WeatherStatisticsDisplay(stationEmitter);

station.setWeatherData(new WeatherData(10, 12, 233));
station.setWeatherData(new WeatherData(44, 123, 23));

station.removeObserver(conditionsDisplay);
station.removeObserver(statisticsDisplay);

station.setWeatherData(new WeatherData(44, 123, 23));

console.log('**********************************************');

stationEmitter.setWeatherData(new WeatherData(23, 60, 140));
stationEmitter.setWeatherData(new WeatherData(23, 60, 140));

stationEmitter.removeObserver(conditionsDisplayAttachedToEmitter);
stationEmitter.setWeatherData(new WeatherData(23, 60, 140));

stationEmitter.removeAllListeners();
stationEmitter.setWeatherData(new WeatherData(23, 60, 140));




