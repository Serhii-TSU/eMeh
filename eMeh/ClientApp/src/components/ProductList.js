import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import Product from './Product';

const StyledProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f0f0f0;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
`;

const ProductsList = ({ products }) => {
  return (
    <StyledProductsContainer>
      <Container style={{ width: '85%' }}>
        <Row>
          {products.map((product, index) => (
            <Col key={index} md={3} sm={5} xs={12}>
              <Product
                id={product.id}
                name={product.name}
                image={product.image}
                description={product.description}
                category={product.category}
                price={product.price}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </StyledProductsContainer>
  );
};

export default ProductsList;
