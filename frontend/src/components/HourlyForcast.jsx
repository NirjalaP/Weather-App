import React from 'react'
import './HourlyForecast.css'
import { format} from 'date-fns';
import { parse } from 'date-fns';

const HourlyForcast = ({data}) => {
  return (
    <div className='hourly-container card'>
      {data.map((hour, index) => {
        return(
        <div className='hour-card' key={index}>
          <div className='hour-time'>
            {format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'hh a')}
          </div>
          <img src={hour.condition.icon} alt="icon" className='hour-icon' />
          <div className='hour-temp'>{Math.round(hour.temp_c)}°</div>
          <div className='hour-rain'>💧 {hour.chance_of_rain}</div>
        </div>
        ) 
      })}
    </div>
  )
}

export default HourlyForcast