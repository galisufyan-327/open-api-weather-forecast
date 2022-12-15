import { WEATHER_TABLE_COLUMNS_SORTABLE } from "../constants/constants";
import IFiveDaysThreeHoursWeatherForecast from "../interfaces/weather";

export const sortWeatherData = (
  column: keyof typeof WEATHER_TABLE_COLUMNS_SORTABLE,
  dataArray: IFiveDaysThreeHoursWeatherForecast[],
  sortState: { [key: string]: number },
  callback?: () => void
) => {
  const sorted: IFiveDaysThreeHoursWeatherForecast[] = [];
  const isAscending = !!sortState[column];
  for (const data of dataArray) {
    const listSorted = data.list.sort((a, b) => {
      switch (column) {
        case "TEMPERATURE":
          if (!isAscending) {
            return a.main.temp - b.main.temp;
          } else {
            return b.main.temp - a.main.temp;
          }
        default:
          if (!isAscending) {
            return a.wind.speed - b.wind.speed;
          } else {
            return b.wind.speed - a.wind.speed;
          }
      }
    });
    sorted.push({ ...data, list: listSorted });
  }
  callback?.();
  return sorted;
};
