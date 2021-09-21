import React, { useState, useEffect } from 'react';
import FlightCard from './flightCard';

const FlightsListing = ({ flightData }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setFlights(flightData);
    // console.log("data", flightData);
  }, [flightData]);

  return (
    <>
      {flights && flights.map((flight, i) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}

    </>
  );
}

export default FlightsListing;