import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from '../components/header';
import SearchBar from '../components/flights/searchBar';
import SideBar from '../components/flights/sidebar';
import FlightsListing from '../components/flights/flightsListing';

import { StickyContainer, Sticky } from 'react-sticky';
import Response from '../response.json';
import { useHistory, useLocation, use } from 'react-router';

const Flights = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(useLocation().search);

  const [data, setData] = useState({});
  const [flights, setFlights] = useState([]);
  const [initialPrice, setInitialPrice] = useState([]);
  const [upDatedPrice, setUpDatedPrice] = useState([20, 37]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = () => {
    setData(Response.data);
    setFlights(Response.data.flights[0].results.j);

    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;
    let price;
    for (var i = Response.data.flights[0].results.j.length - 1; i >= 0; i--) {
      price = Response.data.flights[0].results.j[i].fare.gross_fare.value;
      if (price < minValue) minValue = price;
      if (price > maxValue) maxValue = price;
    }
    setInitialPrice([
      minValue,
      maxValue
    ]);

    if (params.get('min') && params.get('max')) {
      setUpDatedPrice([
        params.get('min'),
        params.get('max')
      ]);
      filterDataOnPrice([params.get('min'), params.get('max')]);
    }
  }

  const onPriceChange = (event, newValue) => {
    console.log("value", newValue);
    const params = new URLSearchParams({ min: newValue[0], max: newValue[1] });
    history.replace({ pathname: location.pathname, search: params.toString() });
    setUpDatedPrice(newValue);
    filterDataOnPrice(newValue)
  }

  const filterDataOnPrice = (value) => {
    let data = Response.data.flights[0].results.j;
    let filterData = data.filter(function (newData) {
      console.log("newData.farepr", newData.farepr);
      return newData.farepr >= value[0] && newData.farepr <= value[1];
    });

    console.log("filterData", filterData);
    setFlights(filterData);
  }

  return (
    <>
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <div style={{ ...style, zIndex: 9999 }}>
              <Header />
              <SearchBar />
            </div>
          )}
        </Sticky>

        <div className="flights-main-wrapper">
          <div className="container">
            <SideBar count={Response.data.completed} flightsData={flights} onPriceChange={onPriceChange} initialPrice={initialPrice} upDatedPrice={upDatedPrice} />

            <div className="listing-wrapper">
              <div className="filter-wrapper">
                <ul>
                  <li>Airline</li>
                  <li>Depart</li>
                  <li>Arrive</li>
                  <li>Duration</li>
                  <li>Smart</li>
                  <li>Price</li>
                </ul>
              </div>
              <FlightsListing flightData={flights} />
            </div>
          </div>
        </div>

      </StickyContainer>
    </>
  );
}

export default Flights;