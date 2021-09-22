import React, { useState, useEffect } from 'react';
import moment from 'moment';

const FlightCard = ({ data, flight }) => {
  const [flightData, setFlightData] = useState({});

  useEffect(() => {
    setFlightData(flight);
  }, [data, flight])

  return (
    <div className="flightCardWrapper">
      <div className="flightcard">
        <div>
          <p>{(data && flightData && flightData.leg) && data.flights[0].results.aldet[flightData.leg[0].al]}</p>
        </div>
        <div>
          <p>{(flightData && flightData.leg) && flight.leg[0].dt}</p>
        </div>
        <div>
          <p>{(flightData && flightData.leg) && flight.leg[0].at}</p>
        </div>
        <div>
          <p>{(flightData && flightData.leg) ? moment.unix(flightData.leg[0].tt).utc().format('H [h] mm [m] ss [s]') : ""}</p>
        </div>
        <div></div>
        <div>
          <p>&#8377; {(flightData && flightData.fare) && flightData.farepr}</p>
        </div>
      </div>

      <div className="stopsList">
        <p>
          {(flightData && flightData.leg) && flightData.leg[0].all_ap.map((stop, i) =>
            <span key={stop}>{stop}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default FlightCard;