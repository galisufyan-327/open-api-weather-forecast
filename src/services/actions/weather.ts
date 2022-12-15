import type { CancelToken } from "axios";
import api from "..";
import { TForecastParams } from "../../interfaces/api/forecast";
import IFiveDaysThreeHoursWeatherForecast from "../../interfaces/weather";

export const getWeatherFiveDayData = (
  params: TForecastParams,
  cancelToken: CancelToken
) =>
  api.get<IFiveDaysThreeHoursWeatherForecast>("/forecast", {
    params: {
      ...params,
      units: params?.units || "metric",
    },
    cancelToken,
  });
