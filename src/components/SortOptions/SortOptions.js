import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortOptions = ({ setSortOption }) => {
  const [sortValue, setSortValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSortValue(value);
    setSortOption(value);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortValue}
        onChange={handleChange}
        label="Sort By"
      >
        <MenuItem value="">
          <em>Select...</em>
        </MenuItem>
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="PRICE_HIGH">Price: High to Low</MenuItem>
        <MenuItem value="PRICE_LOW">Price: Low to High</MenuItem>
        <MenuItem value="NEWEST">Newest</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptions;
