import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useHistory, useLocation } from 'react-router';

function valuetext(value) {
  return `${value}`;
}

const SideBar = ({ initialPrice, upDatedPrice, count, onPriceChange, clearFilter }) => {

  return (
    <div className="sidebar-wrapper">
      <div className="sideBarTop">
        <p><span>{count.updated}</span> of <span>{count.total}</span> flights</p>
        <Button variant="text" onClick={clearFilter}>Clear Filters</Button>
      </div>
      <div>
        <div className="titlerow">
          <h4>Price</h4>
          <Button variant="text" onClick={(event) => { onPriceChange(event, [initialPrice[0], initialPrice[1]]) }}>Reset</Button>
        </div>
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
    </div>
  );
}

export default SideBar;