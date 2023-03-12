import React from 'react'
import axios from 'axios'
import { useState } from 'react';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f24371fd8accd6581539f2a6958d93d6`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data)
        console.log(res.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className='search'>
        <input type='text' value={location} onChange={event => setLocation(event.target.value)} placeholder='Search City' onKeyPress={searchLocation} />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp} °C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like} °C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
