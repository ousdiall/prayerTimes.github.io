import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import {api} from './ApiInfo';
import {methodCall} from './MethodCall';
import './App.css';


function IslamTime() {

    const [cityInput, setCityInput] = useState('')
    const [countrySearch, setCountrySearch] = useState('')
    const [method, setMethod] = useState("")
    const [times, setTimes] = useState({})
    const options = useMemo(() => countryList().getLabels(), [])

    const fetchApiInfo = () => {
        fetch(`${api.base}${api.year}/${api.month}?city=${cityInput}&country=${countrySearch}&method=${method}`)
            .then((response) => response.json())
            .then((result) => {
                setTimes(result)
                document.getElementById('error').style.display = "none";
                document.getElementById('timeZone').innerHTML = "Timezone: " + makeIntoReadable(result.data[api.day].meta.timezone);
                document.getElementById('fajr').innerHTML = result.data[api.day].timings.Fajr;
                document.getElementById('sunrise').innerHTML = result.data[api.day].timings.Sunrise;
                document.getElementById('dhuhr').innerHTML = result.data[api.day].timings.Dhuhr;
                document.getElementById('asr').innerHTML = result.data[api.day].timings.Asr;
                document.getElementById('maghrib').innerHTML = result.data[api.day].timings.Maghrib;
                document.getElementById('isha').innerHTML = result.data[api.day].timings.Isha;
                document.getElementById('currentMethod').innerHTML = "Method used: " + result.data[api.day].meta.method.name;
                return fetch(`${api.latLon}?key=${process.env.REACT_APP_API_KEY}&q=${result.data[api.day].meta.latitude},${result.data[api.day].meta.longitude}&days=1&aqi=no&alerts=n`)
            })
                    .then((response) => response.json())
                    .then((result) => {
                        document.getElementsByClassName('cityName')[0].innerHTML = 'Prayer Times Near: ' + result.location.name + 
                                                                                   ', ' + result.location.country;
                    })
            
            .catch(() => {
                document.getElementById('error').style.display = "flex";
                document.getElementById('error').innerHTML = errorMsg;
                document.getElementsByClassName('cityName')[0].innerHTML = "";
            })
    }

    const errorMsg = "Unable to locate city. Please try again";

    function makeIntoReadable(e) {
        const re = e.replace("_", " ");
        return re;
    }

    document.addEventListener('keypress', (event)=> {    
        if (event.code === "Enter"){
            document.getElementById('buttonReturnAll').click()
        }
    });


    return (
        <>
        <div>
            <h1 id="titleHeader">Islam Prayer Times</h1>
            <div className='cityName'></div>

            <div className='selectDiv'>

                <select id='countrySelectLayout' placeholder='Hello' onChange={(e) => setCountrySearch(e.target.value)}>
                    <option value="">Select a country</option>{
                    options.map(data => {
                        return <option key={data} value={data}>{data}</option>
                    })
                }</select>
            <div id='inputAndButton'>
                <input className="inputLayout"
                    placeholder='Enter Your City'
                    onChange={(e) => setCityInput(e.target.value)}>
                </input>

                <button type='button' className='button-21' id = 'buttonReturnAll' onClick={fetchApiInfo}>Enter</button>
                </div>
            </div>

            <div id='timeZone'></div>
            <div id='error'></div>
            <div className='timeContainer'>
                <div className='timeBox' id="fajrBox">
                    <h1>Fajr</h1>
                    <p id='fajr'></p>
                </div>
                <div className='timeBox' id="sunriseBox">
                    <h1>Sunrise</h1>
                    <p id='sunrise'></p>
                </div>
                <div className='timeBox' id="dhuhrBox">
                    <h1>Dhuhr</h1>
                    <p id='dhuhr'></p>
                </div>
                <div className='timeBox' id="asrBox">
                    <h1>Asr</h1>
                    <p id='asr'></p>
                </div>
                <div className='timeBox' id="maghribBox">
                    <h1>Maghrib</h1>
                    <p id='maghrib'></p>
                </div>
                <div className='timeBox' id="ishaBox">
                    <h1>Isha</h1>
                    <p id='isha'></p>
                </div>
            </div>

            <p className = 'methodCenter' id="currentMethod"></p>
            <div className='methodCenter'>
                <select id='methodSelectInput' onChange={(e) => setMethod(e.target.value)}>
                <option value="">Select a method</option>
                {
                    methodCall.map((data) => {
                        return <option key={data.keyM} value={data.keyM} onChange={fetchApiInfo}>{data.type}</option>
                    })

                }</select>
            </div>
            </div>
        </>
    )
}
export default IslamTime