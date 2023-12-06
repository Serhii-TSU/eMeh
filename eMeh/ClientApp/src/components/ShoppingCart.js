import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const ShoppingCart = () => {

  const { isLoggedIn } = useAuth();

  const [currentCount, setCurrentCount] = useState(0);

  const incrementCounter = () => {
    setCurrentCount(currentCount + 1);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Counter</h1>
          <p>This is a simple example of a React component.</p>
          <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
          <button className="btn btn-primary" onClick={incrementCounter}>Increment</button>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ShoppingCart;
