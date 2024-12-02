import logo from "./logo.svg";
import "./App.css";
import {useState, useEffect} from 'react';

function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  let countryKey = 1;
  let stateKey = 1;
  let cityKey = 1;

  useEffect(()=>{
    const fetchCountry =async () => {
      const d = await fetch('https://crio-location-selector.onrender.com/countries');
      const jsData = await d.json();
      setCountry(jsData);
    }
    fetchCountry();
  },[]);

  useEffect(()=>{
    const fetchState = async (country) => {
      const d = await fetch("https://crio-location-selector.onrender.com/country="+country+"/states");
      const jsData = await d.json();
      setState(jsData);
    }
    if(selectedCountry)
    {
      fetchState(selectedCountry);

    }

  },[selectedCountry]);


  useEffect(()=>{
    const fetchCity = async (country, state) => {
      const d = await fetch("https://crio-location-selector.onrender.com/country="+country+"/state="+state+"/cities");
      const jsData = await d.json();
      setCity(jsData);
    } 
    if(selectedState)
    {
      fetchCity(selectedCountry, selectedState);
    }
  },[selectedState]);


  const handleSelectCountry = (e)=> {
    setSelectedCountry(e.target.value);
  }

  const handleSelectState = (e) => {
    setSelectedState(e.target.value);
  }

  const handleSelectCity = (e) => {
    setSelectedCity(e.target.value);
  }


  return (
    <div className="App">
      <h1>Select Location</h1>
      <form>
        <select name="country" onChange={handleSelectCountry}>
          <option disabled selected value="">Select Country</option>
          {
          country.map((m)=><option defaultValue={m} key={countryKey++}>{m}</option>)}
        </select>
        <select name="state" onChange={handleSelectState}>
          <option disabled selected>Select State</option>
          {state.map((m)=><option defaultValue={m} key={stateKey++}>{m}</option>)}
        </select>
        <select name="city" onChange={handleSelectCity}>
          <option disabled selected>Select City</option>
          {city.map((m)=><option defaultValue={m} key={cityKey++}>{m}</option>)}
        </select>
      </form>
      {selectedCity && <p className="text"><span>You selected </span><span className="city">{selectedCity},</span> <span className="grey">{selectedState}, {selectedCountry}</span></p>}
    </div>
  );
}

export default App;
