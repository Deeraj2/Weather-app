import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';
import moment from 'moment';

function Main() {
    const [data, setData] = useState({})
    const [country, setCountry] = useState('')
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=imperial&appid=${process.env.REACT_APP_API_KEY}` 


    const searchLocation = (event) => {
        if(event.key === "Enter"){
            axios.get(baseURL).then((response)=>{
            setData(response.data)
        })
        setCountry('')
        }

    }

    return (
    <div>
        <div className='input'>
            <input type="text" placeholder='Enter Location' value={country} onChange={(e)=> setCountry(e.target.value)} onKeyPress={searchLocation} />
        </div>
        
        <div className='weather'>
            <div className='weather-temp'>
                <div className='weather-icon'>
                {data.name !== undefined &&
                    (data.weather ? (<img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} className="weather-img" alt='weather-icon'/>) : null )
                }
            </div>
                <div className='weather-detail'>
                    {data.main ? <h1 className='weather-f'>{data.main.temp.toFixed()}°F</h1> : null}
                    {data.main ? <p className='weather-country'>{data.name}</p> : null}
                    {data.weather ? <p className='weather-desc'>{data.weather[0].description}</p> : null}
                    {data.name !== undefined && 
                    ( 
                        <>
                            <p className='weather-date'>{moment().format('LL')}</p>
                            <p className='date'>{moment().format('dddd')}</p>
                        </>
                    )}
                    
                </div> 
            </div>
                  
            

            {data.name !== undefined && (
                <div className='bottom'>
                    <div className='bottoms'>
                        <p className='bottom-desc'>Feels Like</p>
                        {data.main ? <p className='bottom-data'>{data.main.feels_like}°F</p> : null}
                    </div>
                    <div className='bottoms'>
                        <p className='bottom-desc'>Humidity</p>
                        {data.main ? <p className='bottom-data'>{data.main.humidity}%</p> : null}
                    </div>
                    <div className='bottoms'>
                        <p className='bottom-desc'>Wind</p>
                        {data.wind ? <p className='bottom-data'>{data.wind.speed}MPH</p> : null}
                    </div>
                </div>
            )}
        </div>
        
    </div>
  )
}

export default Main