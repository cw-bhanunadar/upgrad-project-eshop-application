import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../../store/userReducer';
import { Snackbar, Alert } from '@mui/material';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '40%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft: '50px',
  },
}));

function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleHomePage = () => {
    navigate('/products');
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUserDetails(null))
    navigate("/login");
  };
  console.log(user);

  const [showSnackbar, toggleSnackbar] = React.useState({});
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar.show}
        autoHideDuration={600}
        onClose={() => {toggleSnackbar(false)}}
        key={'top' + 'right' }
      >
         <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {showSnackbar.message}
          </Alert>
        </Snackbar>
      <AppBar position="static" style={{backgroundColor: '#3f51b5'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            upGrad E-Shop
          </Typography>
          
          {user?.id && (            
                <Search style={{marginRight: '150px'}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
          {user?.id ? (
            <div>
            <Button color="inherit" onClick={handleHomePage}>Home</Button>
            {user?.roles?.includes('ADMIN') && (<Button color="inherit" onClick={handleAddProduct}>Add Product</Button>)}
            <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
            <Button color="inherit" onClick={handleSignup}>Sign Up</Button>
            </div>
          )}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;