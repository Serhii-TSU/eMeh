import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    console.log('Signing in with:', email, password);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 0 }} sm={{ size: 10, offset: 0 }} xs="12" className="mt-5">
          <div className="signin-form">
            <h2>Register</h2>
            <Form>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
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
              <Button color="primary" onClick={handleSignIn}>
                Sign In
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
