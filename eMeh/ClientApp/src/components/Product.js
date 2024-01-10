import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";

const Product = ({ id, name, image, description, category, price }) => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({

    message     : '',
    success     : false,
    isOpenModal : false,

  });
    
  const handleAddToCart = () => {
    console.log(id);
    
    const registerRequest = async () => {

      const method       = "POST";
      
      const headers      = {
        "Content-Type"   : "application/json"
      };

      const productId    = JSON.stringify(id);

      const responseData = await fetch('cart/add', {
        method           : method,
        headers          : headers,
        body             : productId
      });

      
      if (responseData.status == 401){
        logout();
        navigate("/login");
      }

      setData({ ...data, 
        success         : responseData.ok,
        message         : responseData.ok ? await responseData.text() : responseData.status + ": " + responseData.statusText,
        isOpenModal     : true,
      });

    };

    registerRequest();
  };

  const handleCloseModalButtonClick = () => {
    setData({ ...data,
        isOpenModal : false,
    });
  }

  return (
    <Card style={{ width: "250px", height: "450px", padding: "10px", margin: "20px", fontFamily: "Montagu Slab", color: "#404040" }} >
      <CardImg top width="100%" src={image} alt={name} style={{ width: "100%", height: "180px", maxHeight: "180px", objectFit: "cover" }}/>
      <CardBody style={{ maxHeight: "150px" }}>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{category}</CardSubtitle>
        <CardText style={{ fontSize: "12px" }}>{description}</CardText>
      </CardBody>
      <CardFooter style={{ background: "none", borderTop: "none" }}>      
        <CardText style={{ textAlign: "center" }} tag="h6">Price: ${price}</CardText>
      </CardFooter>
      <CardFooter style={{ background: "none" }}>     
        <Button color='primary' style={{ width: "100%", marginTop: "8px" }} onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
      <Modal isOpen={data.isOpenModal}>
            <ModalHeader style={{ backgroundColor: data.success ? '#3B71CA' : '#DC4C64', color: 'white' }}>Response Message</ModalHeader>
            <ModalBody>
              {data.message}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={handleCloseModalButtonClick}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
    </Card>
  );
};

export default Product;

