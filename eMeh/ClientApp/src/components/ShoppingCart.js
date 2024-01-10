import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';


const ShoppingCart = () => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);

  const updateProductsRequest = async () => {

    try {

      const response = await fetch('cart/get');

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

  useEffect(() => {

    updateProductsRequest();

  }, []);

  const handlePlusButtonClick = (id) => {

    const registerRequest = async () => {

      const method    = "POST";

      const headers   = {
        "Content-Type"  : "application/json"
      };

      const body      = JSON.stringify(id);


      const responseData  = await fetch('cart/add', {
        method          : method,
        headers         : headers,
        body            : body
      });

      if (responseData.status == 401){
        logout();
        navigate("/login");
      }

      updateProductsRequest();

    };

    registerRequest();

  }

  const handleMinusButtonClick = (id) => {

    const registerRequest = async () => {

      const method          = "PUT";
      
        const headers       = {
        "Content-Type"      : "application/json"
        };

        const responseData = await fetch('cart/update?id=' + id, {
          method            : method,
          headers           : headers,
        });

        if (responseData.status == 401){
            logout();
            navigate("/login");
          }

          updateProductsRequest();
    }

    registerRequest();

  }

  const renderCartProductsTable = (productsToRender) => { 

    let total = 0;

    productsToRender.forEach(product => {
      let subtotal = product.Price * product.Quantity
      total += subtotal;
    });

    let formattedTotal = total.toFixed(2);

    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsToRender.map(product =>
            <tr key={product.DateTime} style={{ fontFamily: "Montagu Slab", fontSize: "12px", color: "#404040", lineHeight: "40px", }}>
              <td style={{ width: "120px" }}><img src={product.Image} style={{ maxHeight: "40px", objectFit: "cover", marginLeft: "10px" }}/></td>
              <td>{product.Name}</td>
              <td>{product.Description}</td>
              <td style={{ textAlign: "center" }}>${product.Price}</td>
              <td style={{ textAlign: "center" }}>{product.Quantity}</td>
              <td style={{ textAlign: "center" }}>
                <ButtonToolbar style={{ justifyContent: "center" }}>
                  <ButtonGroup>
                    <Button color="primary" onClick={() => handlePlusButtonClick(product.Id)}>+</Button>
                    <Button color="primary" onClick={() => handleMinusButtonClick(product.Id)}>-</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </td>
            </tr>
          )}
          <tr><p>Total: <strong>${formattedTotal}</strong></p></tr>
        </tbody>
      </table>
    );
  };


  let contents = loading ? <p><em>Loading...</em></p> : renderCartProductsTable(products);


  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1 id="tableLabel">Shopping Cart</h1>
          <p>This component demonstrates fetching data from the server.</p>
          {contents}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ShoppingCart;
