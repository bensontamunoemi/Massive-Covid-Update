import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className='App'>
      <div className='app__header'>
        <h1>COVID 19 UPDATE</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value='apc'>
            <MenuItem value='Worldwide'>Worldwide</MenuItem>

            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Header */}
      {/* Title + Inputfeild dropdown menu */}
      {/* infoBox */}
      {/* infoBox */}
      {/* infoBox */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
