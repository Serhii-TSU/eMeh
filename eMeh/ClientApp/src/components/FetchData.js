import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ProductsList from './ProductList'

const FetchData = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderProductsTable = (products) => {
    return (
      <ProductsList products={products} />
    );
  };

  useEffect(() => {

    if (products == [])
      return;

    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');

    if (categoryParam){

      if (categoryParam === "All"){
        setFilteredProducts(products);
        return;
      }

      const formattedCategory = categoryParam
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/And/g, "&");

      const filtered = products
        .filter(product => product.category === formattedCategory);

      setFilteredProducts(filtered);
    }
      
    

  }, [products, location]);

  useEffect(() => {

    const populateProductsData = async () => {

      try {

        const response = await fetch('products/get');

        if (response.status == 401){

          logout();
          navigate("/login");

        }

        const data = await response.json(); 

        setProducts(data);
        setLoading(false);

      } catch (error) {

        console.error('Error fetching data:', error);

      }

    };

    populateProductsData();

  }, []);

  let contents = loading ? <p><em>Loading...</em></p> : renderProductsTable(filteredProducts);

  return (
    <div>
      <h1 id="tableLabel" style={{ width: "100%", textAlign: "center", padding: "20px", fontFamily: "Playfair Display" }}>WELCOME TO OUR SHOP</h1>
      <p style={{ width: "100%", textAlign: "center", fontFamily: "Playfair Display" }}>Congratulations on stumbling upon a digital wonderland where confusion meets curiosity and indecision finds a home.</p>
      {contents}
    </div>
  );
};

export default FetchData;
