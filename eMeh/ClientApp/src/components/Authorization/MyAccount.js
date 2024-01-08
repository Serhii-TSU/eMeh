import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const MyAccountPage = () => {

  const navigate = useNavigate();

  const initialState = {

    "Id"            : null,
    "Name"          : null,
    "Surname"       : null,
    "Country"       : null,
    "City"          : null,
    "Address"       : null,
    "PostalCode"    : null,
    "Email"         : null,
    "PhoneNumber"   : null,
    "Password"      : null

  };

  const [data, setData] = useState({

    userData    : initialState,
    message     : '',
    success     : false,
    isOpenModal : false,

  });

  const [inEditMode, setInEditMode] = useState(false);

  useEffect(() => {

    const registerRequest = async () => {
  
        const responseData  = await fetch('users/get');

        if (responseData.status == 401){
            navigate("/login");
          }
  
        setData({ ...data, 
          success   : responseData.ok,
          userData  : responseData.ok ? await responseData.json() : initialState,
        });
  
      };
  
      registerRequest();

  }, []);


  const handleNameChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Name: e.target.value,
        }
    });
  };

  const handleSurnameChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Surname: e.target.value,
        }
    });
  };

  const handleCountryChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Country: e.target.value,
        }
    });
  };

  const handleCityChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            City: e.target.value,
        }
    });
  };

  const handleAddressChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Address: e.target.value,
        }
    });
  };

  const handlePostalCodeChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            PostalCode: e.target.value,
        }
    });
  };

  const handleEmailChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Email: e.target.value,
        }
    });
  };

  const handlePhoneNumberChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            PhoneNumber: e.target.value,
        }
    });
  };

  const handlePasswordChange = (e) => {
    setData({
        ...data,
        userData: {
            ...data.userData,
            Password: e.target.value,
        }
    });
  };

  const updateAccount = () => {

    const registerRequest = async () => {

      const method    = "POST";

      const headers   = {
        "Content-Type"  : "application/json"
      };

      const body      = JSON.stringify(data.userData);

      const responseData  = await fetch('users/update', {
        method          : method,
        headers         : headers,
        body            : body
      });

      
      if (responseData.status == 401){
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

  const handleEditButtonClick = () => {
    setInEditMode(true);
  }

  const handleCancelButtonClick = () => {
    setInEditMode(false);
    navigate("/myaccount");
  }

  const handleCloseModalButtonClick = () => {
    if (data.success){
      navigate("/login");
    }
    else {
        setData({ ...data,
        isOpenModal     : false,
      });
    }
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={{ size: 6, offset: 0 }} md={{ size: 8, offset: 0 }} sm={{ size: 10, offset: 0 }} xs="12" className="mt-5">
          <div className="signin-form">
            <h2>Account Data</h2>
            <Form>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  id="name"
                  value={data.userData.Name}
                  onChange={handleNameChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="surname">Surname:</Label>
                <Input
                  type="text"
                  id="surname"
                  value={data.userData.Surname}
                  onChange={handleSurnameChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="country">Country:</Label>
                <Input
                  type="text"
                  id="country"
                  value={data.userData.Country}
                  onChange={handleCountryChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City:</Label>
                <Input
                  type="text"
                  id="city"
                  value={data.userData.City}
                  onChange={handleCityChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address:</Label>
                <Input
                  type="text"
                  id="address"
                  value={data.userData.Address}
                  onChange={handleAddressChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="postalCode">Postal Code:</Label>
                <Input
                  type="text"
                  id="postalCode"
                  value={data.userData.PostalCode}
                  onChange={handlePostalCodeChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  value={data.userData.Email}
                  onChange={handleEmailChange}
                  disabled={true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Phone number:</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  value={data.userData.PhoneNumber}
                  onChange={handlePhoneNumberChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <FormGroup style={{ "display" : inEditMode ? 'block' : 'none' }}>
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  value={data.userData.Password}
                  onChange={handlePasswordChange}
                  disabled={!inEditMode}
                />
              </FormGroup>
              <Button color="primary" onClick={updateAccount} style={{ margin: "0px 20px 50px 0px", "display" : inEditMode ? 'inline-block' : 'none' }}>
                Update Account
              </Button>
              <Button color="primary" onClick={handleEditButtonClick} style={{ margin: "0px 20px 50px 0px", "display" : !inEditMode ? 'inline-block' : 'none' }}>
                Edit
              </Button>
              <Button color="secondary" onClick={handleCancelButtonClick} style={{ margin: "0px 20px 50px 0px", "display" : inEditMode ? 'inline-block' : 'none' }}>
                Cancel
              </Button>
            </Form>
          </div>
          <Modal isOpen={data.isOpenModal}>
            <ModalHeader style={{ backgroundColor: data.success ? '#3B71CA' : '#DC4C64', color: 'white' }}>Response Message</ModalHeader>
            <ModalBody>
              {data.message}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={handleCloseModalButtonClick}>
                {data.success ? 'Proceed to the Login Page' : 'Close'}
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountPage;
