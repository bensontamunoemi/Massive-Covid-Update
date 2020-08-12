import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from './components/InputBox';
import Map from './Map';
import Table from './components/Table';
import Navigation from './components/Navigation';
import { Card, CardContent } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async event => {
    const countryCode = event.target.value;

    const url =
      countryCode === 'Worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setInputCountry(countryCode);
        // All data from the country responce
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3);
      });
  };

  return (
    <React.Fragment>
      <Navigation />
      <div className='app'>
        <div className='app__left'>
          <div className='app__header'>
            <h1>Saty Updated!</h1>
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
            <InfoBox
              active={casesType === 'cases'}
              onClick={e => setCasesType('cases')}
              title='Coronavirus Cases'
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === 'recovered'}
              onClick={e => setCasesType('recovered')}
              title='Recovered'
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              active={casesType === 'deaths'}
              onClick={e => setCasesType('deaths')}
              title='Deaths'
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>

          <Map
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
          />
        </div>
        <Card style={{ backgroundColor: 'light' }} className='app__right'>
          <CardContent>
            <h3>Global new {casesType}</h3>
            <LineGraph casesType={casesType} />
            <h3 style={{ marginTop: '4rem' }}>Total cases by country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default App;
