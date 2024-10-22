import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';

const CategoryTabs = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://dev-project-ecommerce.upgrad.dev/api/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories', error);
      });
  }, []);

  return (
    <ToggleButtonGroup exclusive onChange={(e, value) => setCategory(value)} style={{alignSelf: "center"}}>
      <ToggleButton value="ALL">All</ToggleButton>
      {categories.map((category) => (
        <ToggleButton key={category} value={category}>
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CategoryTabs;
