import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter, CardSubtitle } from 'reactstrap';

const Product = ({ name, image, description, category, price, addToCart }) => {
  const handleAddToCart = () => {
    addToCart({ name, price }); // Call the addToCart function with product details
  };

  return (
    <Card style={{ width: "250px", height: "450px", padding: "10px", margin: "20px" }} >
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
    </Card>
  );
};

export default Product;

