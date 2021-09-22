import React, { useState, useEffect } from 'react';
import FlightCard from './flightCard';

const FlightsListing = ({ data, flightData }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setFlights(flightData);
  }, [flightData]);

  return (
    <>
      {flights && flights.map((flight, i) => (
        <FlightCard key={flight.id} data={data} flight={flight} />
      ))}

    </>
  );
}

export default FlightsListing;