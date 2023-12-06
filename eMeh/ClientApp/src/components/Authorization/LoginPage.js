import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('Logging in with:', username, password);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 0 }} sm={{ size: 10, offset: 0 }} xs="12" className="mt-5">
          <div className="login-form">
            <h2>Login</h2>
            <Form>
              <FormGroup>
                <Label for="username">Username:</Label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>
              <Button color="primary" onClick={handleLogin}>
                Login
              </Button>
              <div className="mt-3">
                <p>Don't have an account?</p>
                <Button tag={Link} to="/register" color="link">
                  Register here
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
