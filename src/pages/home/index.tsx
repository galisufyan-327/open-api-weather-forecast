import { SelectCities } from "../../components/home/select-cities";
import { WeatherTable } from "../../components/home/weather-table";
import { useWeatherData } from "../../hooks/useWeatherData";
import { AppCard } from "../../shared/card";

export const Home = () => {
  const {
    citiesList,
    onCitiesChange,
    weatherData,
    loading,
    onDataSort,
    sortState,
  } = useWeatherData();
  return (
    <>
      <AppCard title="Weather">
        <hr />
        <SelectCities cities={citiesList} onChange={onCitiesChange} />
        <WeatherTable
          weatherData={weatherData}
          loading={loading}
          onSort={onDataSort}
          sortState={sortState}
        />
      </AppCard>
    </>
  );
};

export default Home;
