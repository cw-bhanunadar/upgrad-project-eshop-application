import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { param } from '../../Constants';

const AddProduct = ({productSelected}) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: ''
  });
  console.log(productSelected);
  if (productSelected?.id && !product.name) {
    setProduct(productSelected);
  }
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://dev-project-ecommerce.upgrad.dev/api/products/categories")
    .then(res => {
      console.log(res);
      setCategories(res.data);
    })
 }, [])

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(`Product ${product.name} added successfully!`)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call
    console.log('Product added:', product);
    const config = {
      headers: { 'x-auth-token': param.token }
    };
    let url = 'https://dev-project-ecommerce.upgrad.dev/api/products';
    if (productSelected?.id) {
      url = 'https://dev-project-ecommerce.upgrad.dev/api/products/'+productSelected?.id;
    } 
    axios.post(url, product, config).then((res) =>{
      let alertMessage = `Product ${product.name} added successfully!`;
      if(productSelected?.id) {
        alertMessage = `Product ${product.name} updated successfully!`
      }
      setAlertMessage(alertMessage);
      setOpen(true);
      // Reset form
      setProduct({
        name: '',
        category: '',
        manufacturer: '',
        availableItems: '',
        price: '',
        imageUrl: '',
        description: ''
      });
    })

    
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ padding: 20, display: 'flex', justifyContent:'center', width: '60%' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {categories.map((category) =>  (<MenuItem value={category}>{category}</MenuItem>))}
        </TextField>
        <TextField
          label="Manufacturer"
          name="manufacturer"
          value={product.manufacturer}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Available Items"
          name="availableItems"
          value={product.availableItems}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
          {productSelected?.id ? 'Update Product' : 'Save Product'}
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
