import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './components/InputBox';
import Map from './Map';
import { Card, CardContent } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

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

  const onCountryChange = event => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID 19 UPDATE</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='Worldwide'>Worldwide</MenuItem>

              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' cases='123' total='5000' />
          <InfoBox title='Recovered' cases='123' total='5000' />
          <InfoBox title='Deaths' cases='123' total='5000' />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          {/* Table */}
          <h3>Content</h3>
          <h3>Content</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
