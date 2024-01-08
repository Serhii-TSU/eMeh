import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [response, setResponse] = useState({
    message     : "",
    success     : false,
    isOpenModal : false,
  });


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {

    const registerRequest = async () => {

      const method    = "POST";

      const headers   = {
        "Content-Type"  : "application/json"
      };

      const body      = JSON.stringify({

        "name"          : name,
        "surname"       : surname,
        "country"       : country,
        "city"          : city,
        "address"       : address,
        "postalCode"    : postalCode,
        "email"         : email,
        "phoneNumber"   : phoneNumber,
        "password"      : password

      });


      const responseData  = await fetch('users/adduser', {
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
      navigate("/login");
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
          <div className="signin-form">
            <h2>Register</h2>
            <Form>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="surname">Surname:</Label>
                <Input
                  type="text"
                  id="surname"
                  value={surname}
                  onChange={handleSurnameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country:</Label>
                <Input
                  type="text"
                  id="country"
                  value={country}
                  onChange={handleCountryChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City:</Label>
                <Input
                  type="text"
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address:</Label>
                <Input
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">Postal Code:</Label>
                <Input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
              </FormGroup>
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
                <Label for="phoneNumber">Phone number:</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
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
          <Modal isOpen={response.isOpenModal}>
            <ModalHeader style={{ backgroundColor: response.success ? '#3B71CA' : '#DC4C64', color: 'white' }}>Response Message</ModalHeader>
            <ModalBody>
              {response.message}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={handleCloseModalButtonClick}>
                {response.success ? 'Proceed to the Login Page' : 'Close'}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
