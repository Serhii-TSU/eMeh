import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';

const LoginPage = () => {

  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState({
    message     : "",
    success     : false,
    isOpenModal : false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {

    const registerRequest = async () => {

      const method    = "POST";

      const headers   = {
        "Content-Type"  : "application/json"
      };

      const body      = JSON.stringify({
        "email"         : email,
        "password"      : password
      });


      const responseData  = await fetch('account/login', {
        method          : method,
        headers         : headers,
        body            : body
      });

      setResponse({ ...response, 
        success         : responseData.ok,
        message         : responseData.ok ? await responseData.text() : responseData.status + ": " + responseData.statusText,
        isOpenModal     : true,
      });

    };

    registerRequest();

  };

  const handleCloseModalButtonClick = () => {
    if (response.success){
      login();
      navigate("/");
    }
    else {
      setResponse({ ...response,
        isOpenModal     : false,
      });
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 0 }} sm={{ size: 10, offset: 0 }} xs="12" className="mt-5">
          <div className="login-form">
            <h2>Login</h2>
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
          <Modal isOpen={response.isOpenModal}>
            <ModalHeader style={{ backgroundColor: response.success ? '#3B71CA' : '#DC4C64', color: 'white' }}>Response Message</ModalHeader>
            <ModalBody>
              {response.message}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={handleCloseModalButtonClick}>
                {response.success ? 'Go to Home page' : 'Close'}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
