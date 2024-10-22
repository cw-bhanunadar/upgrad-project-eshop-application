import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryTabs from '../CategoryTabs/CategoryTabs';
import SortOptions from '../SortOptions/SortOptions';
import ProductCard from '../ProductCard/ProductCard';
import AddProduct from '../AddProduct/AddProduct';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('DEFAULT');
  const [category, setCategory] = useState('ALL');
  const [openEditpage, setOpenEditPage] = useState(false);
  const [retrigger, setRetrigger] = useState(false);
  const [productSelected, setProductSelected] = useState({});

  const handleEdit = (product) => {
    console.log(product);
    setProductSelected(product); 
    setOpenEditPage(true);
  } 
  useEffect(() => {
    let url = 'https://dev-project-ecommerce.upgrad.dev/api/products';
    if (category !== 'ALL') {
      url += `?category=${category}`;
    }

    axios.get(url)
      .then((response) => {
        let sortedProducts = response.data;

        // Sorting logic
        if (sortOption === 'PRICE_HIGH') {
          sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'PRICE_LOW') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'NEWEST') {
          sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        let products = sortedProducts;
        if (category !== 'ALL') {
          products = products.filter((product) => {
            return product.category === category;
          });
          setProducts(products);
        } else {
          setProducts(sortedProducts);
        }
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, [sortOption, category, retrigger]);

  return (
    <div>
      {!openEditpage ? (
      <div style={{  display: "flex", flexDirection: "column", marginTop: "2%"}}>
        <CategoryTabs setCategory={setCategory} style={{marginTop: '2%'}}/>
        <div style={{ width: '200px', paddingTop: '50px', paddingLeft: '50px' }}>
          <SortOptions setSortOption={setSortOption} />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5%', padding: '20px', alignSelf: 'center'}}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} handleEdit={handleEdit} handleDeleteP={() => setRetrigger(!retrigger)} />
          ))}
        </div>
      </div>) : (<AddProduct productSelected={productSelected} />)}
    </div>
  );
};

export default ProductsPage;
