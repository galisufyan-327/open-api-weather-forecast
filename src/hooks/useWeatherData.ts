import axios, { CancelToken } from "axios";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { cities } from "../data/cities";
import { getWeatherFiveDayData } from "../services/actions/weather";
import IFiveDaysThreeHoursWeatherForecast from "../interfaces/weather";
import { sortBy, uniqBy } from "lodash";
import { WEATHER_TABLE_COLUMNS_SORTABLE } from "../constants/constants";
import { sortWeatherData } from "../utils/sort-data";

export type WeatherHookProps = {
  initialLatLng: { lat: number; lon: number };
};

const initialSortState = {
  [WEATHER_TABLE_COLUMNS_SORTABLE.TEMPERATURE]: 0,
  [WEATHER_TABLE_COLUMNS_SORTABLE.WIND_SPEED]: 0,
};

export const useWeatherData = () => {
  const [latLng, setLatLng] = useState<WeatherHookProps["initialLatLng"][]>([
    {
      lat: 52.374031,
      lon: 4.88969,
    },
  ]);

  const [sortState, setSortState] = useState({ ...initialSortState });

  const [weatherData, setWeatherData] = useState<
    IFiveDaysThreeHoursWeatherForecast[]
  >([]);
  const [loading, setLoading] = useState(false);

  const onCitiesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const values = [];
    for (const i in options) {
      if (options[i].selected) {
        const value = options[i].value;
        if (value) {
          values.push(JSON.parse(value));
        }
      }
    }
    setLatLng(uniqBy(values, (val) => val));
  };

  const citiesList = useMemo(() => {
    return uniqBy(
      sortBy(
        cities.filter((item) => item.country === "NL"),
        (val) => val.name
      ),
      (e) => {
        return e.name;
      }
    );
  }, []);

  const getWeatherData = useCallback(
    async (token: CancelToken) => {
      setLoading(true);
      const promises = [];
      for (const { lat, lon } of latLng) {
        promises.push(getWeatherFiveDayData({ lat, lon }, token));
      }

      for await (const { data } of promises) {
        setWeatherData((prev) => [...prev, { ...data }]);
      }
      setLoading(false);
      setSortState({ ...initialSortState });
    },
    [latLng]
  );

  const onDataSort = useCallback(
    (column: keyof typeof WEATHER_TABLE_COLUMNS_SORTABLE) => {
      setWeatherData([
        ...sortWeatherData(column, weatherData, sortState, () => {
          setSortState((prev) => ({
            ...prev,
            [column]: sortState[column] === 0 ? 1 : 0,
          }));
        }),
      ]);
    },
    [weatherData, sortState]
  );

  useEffect(() => {
    setWeatherData([]);
  }, [latLng]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    getWeatherData(source.token);
    return () => {
      source.cancel();
    };
  }, [getWeatherData]);

  return {
    latLng,
    setLatLng,
    citiesList,
    onCitiesChange,
    weatherData,
    loading,
    onDataSort,
    sortState,
  };
};
