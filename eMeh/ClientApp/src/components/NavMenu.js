import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faShoppingCart, faRightToBracket, faUserPlus, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import './NavMenu.css';

const NavMenu = () => {

  const { isLoggedIn, login, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
                  <NavLink tag={Link} className="navmenu-item" to="/account">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="navmenu-name">My account</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navmenu-item" to="/logout">
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
      </Navbar>
    </header>
  );
};

export default NavMenu;
