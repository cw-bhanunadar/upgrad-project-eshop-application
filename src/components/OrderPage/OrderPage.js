import React, { useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { Card } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setProductDetails } from '../../store/productReducer';
import { setAddressDetails } from '../../store/addressReducer';
import { useNavigate } from 'react-router-dom';
import { param } from '../../Constants';


const steps = ['Items', 'Select Address', 'Confirm Order'];

function getStepContent(step, handleInputChange, formData, handleAddressSubmit, handleOrderSubmit, orderDetails, handleQuantityChange, quantity, handleNext, handleBack, addresses, handleAddressSelection, address) {
  switch (step) {
    case 0:
      return (
        <div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', justifyContent: 'center' }}>
        <div style={{marginRight: '20px'}}>
          <img 
            src={orderDetails.imageUrl} 
            alt={orderDetails.name}
            style={{ width: '300px', height: 'auto' }} 
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          <h2>{orderDetails.name}</h2><span><p style={{ color: 'blue' }}>Available Quantity: <strong>{orderDetails.availableItems}</strong></p></span>
          <p><strong>Category:</strong> {orderDetails.category}</p>
          <p>{orderDetails.description}</p>
          <p style={{ fontSize: '20px', color: 'red' }}>₹ {orderDetails.price}</p>

          <label htmlFor="quantity">Enter Quantity</label>
          <input 
            type="number" 
            id="quantity" 
            value={quantity} 
            onChange={handleQuantityChange} 
            min="1" 
            style={{ padding: '5px', width: '50px', marginLeft: '10px' }}
          />
          <br />
        </div>
        </div>
      </div>
      );
    case 1:
      return (
        <div style={{width: '50%', margin:'auto', marginTop: '20px'}}>
          <FormControl variant="outlined" fullWidth>
          <InputLabel>Addresses</InputLabel>
          <Select
            onChange={handleAddressSelection}
            label="Addresses"
          >
          <MenuItem value="">
            <em>Select...</em>
          </MenuItem>
          {addresses.map((address) => (<MenuItem value={address.id}>{address.name} -- {address.street}, {address.state}</MenuItem>))}
          </Select>
        </FormControl>
        
        <div style={{width: '50%', margin:'auto', textAlign: 'center'}}>
          <h2>Add Address</h2>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.name}
          />
          <TextField
            name="contactNumber"
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.contactNumber}
          />
          <TextField
            name="street"
            label="Street"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.street}
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.city}
          />
          <TextField
            name="state"
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.state}
          />
          <TextField
            name="landmark"
            label="Landmark"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.landmark}
          />
          <TextField
            name="zipcode"
            label="Zip Code"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={formData.zipcode}
          />
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <Button variant="contained" color="primary" onClick={handleAddressSubmit}>
            Add Address
          </Button>
          </div>
        </div>
        </div>
      );
    case 2:
      return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Card style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', padding: '20px', width: '80%'  }}>
        {/* Product Details */}
        <div style={{ width: '60%', borderRight: '1px solid #ccc', }}>
          <h2>{orderDetails.name}</h2>
          <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
          <p><strong>Category:</strong> {orderDetails.category}</p>
          <p>
            {orderDetails.description}
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'red' }}>Total Price: ₹ {orderDetails.totalPrice}</p>
        </div>

        {/* Address Details */}
        <div style={{ width: '40%', padding: '10px' }}>
          <h2>Address Details :</h2>
          <p><strong>{address.name}</strong></p>
          <p>Contact Number: {address.contactNumber}</p>
          <p>{address.landmark}, {address.city}</p>
          <p>{address.state}</p>
          <p>{address.zipcode}</p>
        </div>
      </Card>

      
        </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button onClick={handleBack}>BACK</Button>
            <Button variant="contained" color="primary" onClick={handleOrderSubmit} >PLACE ORDER</Button>
          </div>
        </div>
      );
    default:
      throw new Error('Unknown step');
  }
}

export default function CreateOrder() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipCode: ''
  });
  const orderDetails = useSelector((state) => state.product);
  const [quantity, setQuantity] = React.useState(1);
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState(-1);
  const [address, setAddress] = React.useState(null);
  const handleAddressSelection = (event) => {
    const value = event.target.value;
    setSelectedAddressId(value);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    if (e.target.value > orderDetails.availableItems) {
      alert("Quantity selected more than Available Items");

    } else {
      const updatedOrderDetails = { ...orderDetails, quantity: e.target.value };
      dispatch(setProductDetails(updatedOrderDetails))
      setQuantity(e.target.value);
    }
  };
  const config = {
    headers: { 'x-auth-token': param.token }
  };
  useEffect(() => {
     axios.get("https://dev-project-ecommerce.upgrad.dev/api/addresses", config)
     .then(res => {
        setAddresses(res.data)
     })
    
  }, [])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (selectedAddress) => {
    if (activeStep === 1) {
      const selecAdd = selectedAddressId !== -1 ? selectedAddressId : selectedAddress;
      axios.get("https://dev-project-ecommerce.upgrad.dev/api/addresses/"+selecAdd, config).then(res =>{
        setAddress(res.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      })
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAddressSubmit = async () => {
    try {
      const data = await axios.post('https://dev-project-ecommerce.upgrad.dev/api/addresses', formData, config);
      setSelectedAddressId(data.data.id);
      dispatch(setAddressDetails(data.data.id));
      handleNext(data.data.id);
    } catch (error) {
      console.error('Error adding address', error);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      await axios.post('https://dev-project-ecommerce.upgrad.dev/api/orders', {
        "quantity": orderDetails.quantity,
        "product": orderDetails.id,
        "address": selectedAddressId
      }, config);
      alert('Your order is confirmed.');
      navigate('/products');
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  return (
    <div style={{paddingTop: '20px'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Typography>Your order is confirmed.</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
          {getStepContent(activeStep, handleInputChange, formData, handleAddressSubmit, handleOrderSubmit, orderDetails, handleQuantityChange, quantity, handleNext, handleBack, addresses, handleAddressSelection, address)}
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {activeStep === 0 ? (
              <Button variant="contained" color="primary" style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}} onClick={handleNext}>
                PLACE ORDER
            </Button>
            ): (
              activeStep !== 2 && (
                <Button
                  onClick={handleBack}
                >
                  Back
                </Button>
              )
            )}

            {activeStep !== 0 && activeStep !==2 && (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
