import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCities, loadCountries, loadStates } from '../redux/locationThunks';
import { selectCities, selectCountries, selectStates } from '../redux/locationSelectors';

const LocationComponent = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const states = useSelector(selectStates);
  const cities = useSelector(selectCities);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountryCode(countryCode);
    dispatch(loadStates(countryCode));
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (selectedCountryCode) {
      dispatch(loadCities(selectedCountryCode, stateCode));
    } else {
      console.error('Country code not found for the selected state');
    }
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    console.log('Selected city ID:', cityId);
  };

  return (
    <div>
      <h2>Location Selector</h2>

      <h3>Countries</h3>
      <select onChange={handleCountryChange}>
        <option value="">Select a Country</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>

      <h3>States</h3>
      <select onChange={handleStateChange}>
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state.iso2} value={state.iso2}>
            {state.name}
          </option>
        ))}
      </select>

      <h3>Cities</h3>
      <select onChange={handleCityChange}>
        <option value="">Select a City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationComponent;
