import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f0f0f0;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

const appearAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    opacity: 1;
  }
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const AdContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  background-color: #ff5722;
  color: #fff;
  border-radius: 5px;
  animation: ${appearAnimation} 3s ease-in-out forwards;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Home = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const adTimer = setInterval(() => {
      setShowAd(true);
      const adDuration = Math.floor(Math.random() * 4000) + 1000;
      setTimeout(() => {
        setShowAd(false);
      }, adDuration);
    }, Math.floor(Math.random() * 17000) + 5000);
  
    return () => clearInterval(adTimer);
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Title>Welcome to Emeh!</Title>
          <Subtitle>Discover the unexpected.</Subtitle>
          <Button>Start Exploring</Button>
        </Content>
      </Container>
      <AdContainer show={showAd}>Check out our annoying ad!</AdContainer>
    </>
  );
};

export default Home;
