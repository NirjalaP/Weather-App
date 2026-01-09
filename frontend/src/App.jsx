import { getWeatherData } from './api';
import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import { parse } from 'date-fns';
import WeeklyForcast from './components/WeeklyForcast';
import HourlyForcast from './components/HourlyForcast';

const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour >= 9 && hour < 17) return 'bg-day';
  if (hour >= 17 && hour < 20) return 'bg-sunset';
  return 'bg-night';
}


function App(){
  const [city, setCity] = useState('Santa Ana');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hour = weatherData?.location?.localtime
  ? parse(
    weatherData.location.localtime,
    'yyyy-MM-dd HH:mm',
    new Date()).getHours()
   : new Date().getHours();

  const gradientClass = getGradientClass(hour);
  useEffect(() => {

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      
      try {
        const data = await getWeatherData(city);

        const {mintemp_c, maxtemp_c} = data.forecast.forecastday[0].day;

        setWeatherData({
          current: {...data.current},
          hourly:data.forecast.forecastday[0].hour,
          weekly:data.forecast.forecastday.slice(1),
          location: data.location

        })
      }
      catch(e){
        setError('Failed to fetch weather data :')
         } 
         finally{
          setLoading(false)
         }
    }
    fetchWeather();
  }, [city]);

  return(
    <div className={`app ${gradientClass}`}>
      <div className='container'>
        <SearchBar onSearch = {setCity}/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
          <CurrentWeather data = {weatherData.current} location = {weatherData.location}/>
          <HourlyForcast data = {weatherData.hourly}/>
          <WeeklyForcast data = {weatherData.weekly}/>
          </>
         
        )}
      </div>
    </div>
  )
}

export default App;