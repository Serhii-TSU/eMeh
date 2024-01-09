import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faShoppingCart, faRightToBracket, faUserPlus, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import './NavMenu.css';

const NavMenu = () => {

  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [response, setResponse] = useState({

    message     : "",
    success     : false,
    isOpenModal : false,

  });

  const toggleNavbar = () => setCollapsed(!collapsed);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogoutClick = () => {
    const registerRequest = async () => {

      const method    = "POST";

      const headers   = {
        "Content-Type"  : "application/json"
      };

      const responseData  = await fetch('account/logout', {
        method          : method,
        headers         : headers,
      });

      setResponse({ ...response, 
        success         : responseData.ok,
        message         : responseData.ok ? await responseData.text() : responseData.status + ": " + responseData.statusText,
        isOpenModal     : true,
      });

    };

    registerRequest();
  }

  const handleCloseModalButtonClick = () => {
    if (response.success){
      logout();
      navigate("/login");
      setResponse({ ...response,
        isOpenModal     : false,
      });
    }
    else {
      setResponse({ ...response,
        isOpenModal     : false,
      });
    }
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/" className="brand">
          <div className="brand-name">eMeh</div>
          <div className="slogan">When you need something, but you're not entirely sure what.</div>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="navmenu-item" to="/">
                <FontAwesomeIcon icon={faHome} />
                <span className="navmenu-name">Home</span>
              </NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle className="navmenu-item" nav>
                <FontAwesomeIcon icon={faList} />
                <span className="navmenu-name">Categories</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=All" className="brand">
                    <div className="dropdown-category-name">All Cetegories</div>
                    <div className="dropdown-category-slogan">See All Products</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=BeautyAndCare" className="brand">
                    <div className="dropdown-category-name">Beauty & Care</div>
                    <div className="dropdown-category-slogan">Because You Must</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=FoodAndGrocery" className="brand">
                    <div className="dropdown-category-name">Food & Grocery</div>
                    <div className="dropdown-category-slogan">Because Eating, Right?</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=HealthAndWellness" className="brand">
                    <div className="dropdown-category-name">Health & Wellness</div>
                    <div className="dropdown-category-slogan">Or Whatever</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=OfficeAndSchoolSupplies" className="brand">
                    <div className="dropdown-category-name">Office & School Supplies</div>
                    <div className="dropdown-category-slogan">Inspiration for Procrastination</div>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {isLoggedIn ? (
              <div style={{ display: "flex" }}>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" to="/shopping-cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="navmenu-name">Shopping Cart</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" to="/myaccount">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="navmenu-name">My account</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" onClick={handleLogoutClick}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className="navmenu-name">Log Out</span>
                  </NavLink>
                </NavItem>
              </div>
              ) : (
              <div style={{ display: "flex" }}>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" to="/login">
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <span className="navmenu-name">Log In</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" to="/register">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span className="navmenu-name">Register</span>
                  </NavLink>
                </NavItem>
              </div>
            )}
          </ul>
        </Collapse>
        <Modal isOpen={response.isOpenModal}>
            <ModalHeader style={{ backgroundColor: response.success ? '#3B71CA' : '#DC4C64', color: 'white' }}>Response Message</ModalHeader>
            <ModalBody>
              {response.message}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={handleCloseModalButtonClick}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
      </Navbar>
    </header>
  );
};

export default NavMenu;
