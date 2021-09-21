import React, { useState, useEffect } from 'react';
import moment from 'moment';

const FlightCard = ({ flight }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(flight);
    // console.log("leg", flight.leg);
  }, [flight, data])

  return (
    <div className="flightcard">
      <div>
        <p>{(data && data.leg) && data.leg[0].al}</p>
      </div>
      <div>
        <p>{(data && data.leg) && data.leg[0].dt}</p>
      </div>
      <div>
        <p>{(data && data.leg) && data.leg[0].at}</p>
      </div>
      <div>
        <p>{(data && data.leg) ? moment.unix(data.leg[0].tt).utc().format('H [h] mm [m] ss [s]') : ""}</p>
      </div>
      <div></div>
      <div>
        <p>&#8377; {(data && data.fare) && data.farepr}</p>
      </div>
    </div>
  );
}

export default FlightCard;