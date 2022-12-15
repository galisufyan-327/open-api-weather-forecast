export default interface IFiveDaysThreeHoursWeatherForecast
  extends TWeatherCity {
  cod: string;
  message: number;
  cnt: number;
  list: TWeatherObject[];
}

export type TWeatherObject = {
  dt: number;
  visibility: number;
  pop: number;
  rain: {
    [key: string]: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
} & TWeatherObjectMain &
  TWeatherObjectWeather &
  TWeatherObjectClouds &
  TWeatherObjectWind;

export type TWeatherObjectMain = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
};

export type TWeatherObjectWeather = {
  weather: {
    readonly id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};
export type TWeatherObjectClouds = {
  clouds: {
    all: number;
  };
};

export type TWeatherObjectWind = {
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
};

export type TWeatherCity = {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};
