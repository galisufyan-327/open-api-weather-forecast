import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { uniqueId } from "lodash";
import { Table } from "reactstrap";
import {
  WEATHER_ICON_URL,
  WEATHER_TABLE_COLUMNS_SORTABLE,
} from "../../constants/constants";
import IFiveDaysThreeHoursWeatherForecast from "../../interfaces/weather";

export const WeatherTable = ({
  weatherData,
  loading,
  onSort,
  sortState,
}: {
  weatherData: IFiveDaysThreeHoursWeatherForecast[];
  loading: boolean;
  onSort: (column: keyof typeof WEATHER_TABLE_COLUMNS_SORTABLE) => void;
  sortState: { [x: string]: number };
}) => {
  const getRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={999} className="text-center">
            Loading....
          </td>
        </tr>
      );
    }
    if (!loading && !weatherData.length) {
      return (
        <tr>
          <td colSpan={999} className="text-center">
            No Data
          </td>
        </tr>
      );
    }
    return weatherData.map(({ list, city: { name } }) =>
      list.map(({ main: { temp }, wind: { speed }, weather, dt_txt }) => (
        <tr key={uniqueId()}>
          <td>{name || "N/A"}</td>
          <td>{temp} &#8451;</td>
          <td>{speed} Km/h</td>
          <td>
            <img
              src={`${WEATHER_ICON_URL}/${weather?.[0]?.icon}.png`}
              alt="icon"
              width={40}
            />{" "}
            {weather.length
              ? `${weather?.[0]?.main} - ${weather?.[0]?.description}`
              : "N/A"}
          </td>
          <td>{dayjs(dt_txt).format("MMM D, ddd HH:mm")}</td>
        </tr>
      ))
    );
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>City</th>
          <th onClick={() => onSort("TEMPERATURE")} className="cursor-pointer">
            Temp{" "}
            <FontAwesomeIcon
              className="text-muted"
              icon={
                sortState[WEATHER_TABLE_COLUMNS_SORTABLE.TEMPERATURE]
                  ? faArrowUp
                  : faArrowDown
              }
            />
          </th>
          <th onClick={() => onSort("WIND_SPEED")} className="cursor-pointer">
            Wind speed{" "}
            <FontAwesomeIcon
              className="text-muted ml-1"
              icon={
                sortState[WEATHER_TABLE_COLUMNS_SORTABLE.WIND_SPEED]
                  ? faArrowUp
                  : faArrowDown
              }
            />
          </th>
          <th>Weather</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{getRows()}</tbody>
    </Table>
  );
};
