import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

const SideBar = ({ initialPrice, upDatedPrice, count, flightsData, onPriceChange }) => {

  useEffect(() => {
    console.log("initialPrice", initialPrice);
  }, [])

  return (
    <div className="sidebar-wrapper">

      <h4>Price</h4>

      <Slider
        getAriaLabel={() => 'Price'}
        value={upDatedPrice}
        onChange={(event, newValue) => onPriceChange(event, newValue)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={1}
        defaultValue={initialPrice}
        min={initialPrice[0]}
        max={initialPrice[1]}
      />
    </div>
  );
}

export default SideBar;