import { ChangeEvent } from "react";
import { FormGroup } from "reactstrap";
import { TCity } from "../../data/cities";

export const SelectCities = ({
  cities,
  onChange,
}: {
  cities: TCity[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <FormGroup>
      <label className="form-label" htmlFor="cities">
        Select Cities
      </label>
      <select
        name="cities"
        onChange={onChange}
        className="form-select"
        multiple
        id="cities"
        aria-label="multiple select example"
        placeholder="Select Cities"
      >
        {cities.map((item) => (
          <option
            key={item.name}
            value={JSON.stringify({ lat: item.coord.lat, lon: item.coord.lon })}
            selected={item.name === "Amsterdam"}
          >
            {item.name}
          </option>
        ))}
      </select>
    </FormGroup>
  );
};
