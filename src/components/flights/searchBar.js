import React, { useState, useEffect } from 'react';
import { IoSwapHorizontalOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const SearchBar = () => {
  const [value, setValue] = React.useState(null);

  return (
    <div className="searchbar">
      <div className="container">
        <div className="searchblk">
          <div className="inputwrap">
            <input type="text" placeholder="From" value="" />
          </div>
          <div>
            <button type="button" className="swapbutton"><IoSwapHorizontalOutline size={20} /></button>
          </div>
          <div className="inputwrap">
            <input type="text" placeholder="To" value="" />
          </div>
        </div>

        <div className="searchblk">
          <div className="searchblk">
            <div className="inputwrap">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="inputwrap">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="searchblk">
          <div className="inputwrap">
            <input type="name" placeholder="Select passenger" />
          </div>
          <div className="inputwrap">
            <Button variant="contained">Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;