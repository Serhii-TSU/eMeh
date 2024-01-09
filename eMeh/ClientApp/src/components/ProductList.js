import React from 'react';
import { CardColumns } from 'reactstrap';
import Product from './Product';

const ProductsList = ({ products }) => {
  return (
    <CardColumns>
      {products.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          image={product.image}
          description={product.description}
          category={product.category}
          price={product.price}
        />
      ))}
    </CardColumns>
  );
};

export default ProductsList;
