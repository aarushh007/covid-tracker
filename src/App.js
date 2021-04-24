import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [global, setGlobal] = useState({});
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState({});
  useEffect(()=>{
    const getGlobal = async () => {
      let result = await fetch('https://api.covid19api.com/summary');
      let j = await result.json();
      let data = await j.Global;
      setGlobal(data);
      setCurrent(data);
    }
    const getCountries = async () => {
      let result = await fetch('https://api.covid19api.com/summary');
      let j = await result.json();
      let data = await j.Countries;
      setCountries(data);
    }
    getGlobal();
    getCountries();
  },[]);
  const changed = () => {
    let val = document.getElementById('country_select').value;
    if(val === 'global'){
      setCurrent(global);
      return;
    }
    let con = countries.filter(yo => yo.Country === val);
    setCurrent(con[0]);
  }
  return (
    <div className="App">
      <h1>{document.getElementById('country_select') && document.getElementById('country_select').value.charAt(0).toUpperCase() + document.getElementById('country_select').value.slice(1)}</h1>
      <div id='info'>
        <div id='cases'>
          <h2>Cases</h2>
          <p><strong>New:</strong> {current.NewConfirmed && current.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p><strong>Total:</strong> {current.TotalConfirmed && current.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
        <div id='deaths'>
          <h2>Deaths</h2>
          <p><strong>New:</strong> {current.NewDeaths && current.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p><strong>Total:</strong> {current.TotalDeaths&& current.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
        <div id='recovered'>
          <h2>Recoveries</h2>
          <p><strong>New:</strong> {current.NewRecovered && current.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
          <p><strong>Total:</strong> {current.TotalRecovered && current.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
      </div>
      <select defaultValue='global' onChange={changed} id='country_select'>
        <option value='global'>Global</option>
        {countries && countries.map(country => {
          return (
            <option value={country.Country}>{country.Country}</option>
          )
        })}
      </select>
    </div>
  );
}

export default App;
