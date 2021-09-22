import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from '../components/header';
import SearchBar from '../components/flights/searchBar';
import SideBar from '../components/flights/sidebar';
import FlightsListing from '../components/flights/flightsListing';
import Button from '@mui/material/Button';
import { StickyContainer, Sticky } from 'react-sticky';
import Response from '../response.json';
import { useHistory, useLocation } from 'react-router';
import { Link } from "react-router-dom";

const Flights = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(useLocation().search);

  const [data, setData] = useState({});
  const [flights, setFlights] = useState([]);
  const [initialPrice, setInitialPrice] = useState([]);
  const [upDatedPrice, setUpDatedPrice] = useState([20, 37]);

  const [heading, setHeading] = useState([
    { title: "Airline", sortValue: "al", sortType: '' },
    { title: "Depart", sortValue: "dt", sortType: '' },
    { title: "Arrive", sortValue: "at", sortType: '' },
    { title: "Duration", sortValue: "tt", sortType: '' },
    { title: "Smart", sortValue: "", sortType: '' },
    { title: "Price", sortValue: "farepr", sortType: '' }
  ])

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
    const params = new URLSearchParams({ min: minValue, max: maxValue });
    history.replace({ pathname: location.pathname, search: params.toString() });
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
    if (params.get('sort') && params.get('sortType')) {
      sortData(params.get('sort'), params.get('sortType'))
    }
  }

  const onPriceChange = (event, newValue) => {
    const params = new URLSearchParams({ min: newValue[0], max: newValue[1] });
    history.replace({ pathname: location.pathname, search: params.toString() });
    setUpDatedPrice(newValue);
    filterDataOnPrice(newValue);
  }

  const filterDataOnPrice = (value) => {
    let data = Response.data.flights[0].results.j;
    let filterData = data.filter(function (newData) {
      return newData.farepr >= value[0] && newData.farepr <= value[1];
    });
    setFlights(filterData);
  }

  const onSorting = async (value, sortType) => {
    // resetHeading();
    const params = new URLSearchParams(window.location.search);
    const queries = Array.from(params.keys()).reduce(
      (acc, val) => ({ ...acc, [val]: params.get(val) }),
      {}
    );
    let headings = heading;
    let index = heading.findIndex(x => x.sortValue === value);
    // sortType === 'asc' ? heading[index].sortType = 'desc' : heading[index].sortType = 'asc'
    switch (heading[index].sortType) {
      case 'asc':
        heading[index].sortType = 'desc'
        break;
      case 'desc':
        heading[index].sortType = 'asc'
        break;
      default:
        heading[index].sortType = 'desc'
        break;
    }
    setHeading(headings);
    const sendQuery = new URLSearchParams({ ...queries, sort: value, sortType });
    history.replace({ pathname: location.pathname, search: sendQuery.toString() });
    sortData(value, sortType);
  }

  const resetHeading = () => {
    setHeading([
      { title: "Airline", sortValue: "al", sortType: '' },
      { title: "Depart", sortValue: "dt", sortType: '' },
      { title: "Arrive", sortValue: "at", sortType: '' },
      { title: "Duration", sortValue: "tt", sortType: '' },
      { title: "Smart", sortValue: "", sortType: '' },
      { title: "Price", sortValue: "farepr", sortType: '' }
    ])
  }

  const sortData = (value, sortType) => {
    let sortData = flights.sort(compareValues(value, sortType));
    setFlights(sortData);
  }

  function compareValues(key, order) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  const clearFilter = () => {
    const params = new URLSearchParams({});
    history.replace({ pathname: location.pathname, search: params.toString() });
    resetHeading();
    initialData();
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
            {(initialPrice.length || upDatedPrice.length) &&
              <SideBar
                count={{ total: Response.data.flights[0].results.j.length, updated: flights.length }}
                onPriceChange={onPriceChange}
                initialPrice={initialPrice}
                upDatedPrice={upDatedPrice}
                clearFilter={() => clearFilter()}
              />}

            <div className="listing-wrapper">
              <div className="filter-wrapper">
                <ul>
                  {heading.map((heading, i) =>
                    <li key={heading.title}>
                      <Button
                        variant="text"
                        onClick={() => onSorting(heading.sortValue, heading.sortType)}>
                        {heading.title}
                        {heading.sortType === 'asc' && <span> &#8595;</span>}
                        {heading.sortType === 'desc' && <span> &#8593;</span>}
                      </Button>
                    </li>
                  )}
                </ul>
              </div>
              <FlightsListing data={data} flightData={flights} />
            </div>
          </div>
        </div>

      </StickyContainer>
    </>
  );
}

export default Flights;