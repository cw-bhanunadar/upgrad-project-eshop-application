import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Button, Modal, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setProductDetails } from '../../store/productReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { param } from '../../Constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductCard = ({ product, handleEdit, handleDeleteP }) => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  function HandleClick () {
    console.log(product, "hello");
    dispatch(setProductDetails(product))
    navigate('/create-order', { state: product });
  }

  const [shouldOpenDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpen = () => setOpenDeleteModal(true);
  const handleClose = () => setOpenDeleteModal(false);

  const [shouldOpenDeleteSuccessfullMessage, setOpenDeleteSuccessMessage] = React.useState(false);

  const user = useSelector((state) => state.user);
  const handleDelete = () => {
    const config = {
      headers: { 'x-auth-token': param.token }
    };
    axios.delete("https://dev-project-ecommerce.upgrad.dev/api/products/"+product.id, config)
     .then(res => {
      setOpenDeleteSuccessMessage(true);
      handleClose();
      handleDeleteP();
     })
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={shouldOpenDeleteSuccessfullMessage}
        autoHideDuration={600}
        onClose={() => {setOpenDeleteSuccessMessage(false)}}
        key={'top' + 'right' }
      >
         <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Product {product.name} deleted successfully
          </Alert>
        </Snackbar>
      <Modal
        open={shouldOpenDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm deletion of product!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Are you sure you want to delete the product?
          </Typography>
          <Button variant="contained" sx={{mr: 2}} onClick={handleDelete}>OK</Button>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
  <Card style={{ maxWidth: '350px', margin: '10px', height: 'fit-content', maxHeight: '400px' }}>
    <img src={product.imageUrl} alt={product.name} style={{ height: 200 }} />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2">{product.description}</Typography>
      <Typography variant="h5">₹ {product.price}</Typography>
      <Button variant="contained" color="primary" onClick={HandleClick}>Buy</Button>
      {user?.roles?.includes('ADMIN') && (
        <div style={{display: 'flex', flexDirection:'row-reverse', marginBottom: '10px'}}>
          <DeleteIcon onClick={handleOpen}></DeleteIcon>
          <EditIcon style={{paddingRight: '10px'}} onClick={() => handleEdit(product)}></EditIcon>
        </div>
      )}
    </CardContent>
  </Card>
  </div>
)
};

export default ProductCard;
