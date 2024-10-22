import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './AuthContext';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import ProductsPage from './components/ProductList/ProductList';
import CreateOrder from './components/OrderPage/OrderPage';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AddProduct from './components/AddProduct/AddProduct';

function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
    <AuthProvider >
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/create-order" element={<CreateOrder/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        {/* Add other routes as necessary */}
      </Routes>
    </Router>
    </AuthProvider>
    </PersistGate>
    </Provider>
  );
}

export default App;
