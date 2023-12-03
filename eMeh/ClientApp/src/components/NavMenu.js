import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './NavMenu.css';

const NavMenu = () => {
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
                  <NavLink tag={Link} to="/fetch-data?category=Beauty&Care" className="brand">
                    <div className="dropdown-category-name">Beauty & Care</div>
                    <div className="dropdown-category-slogan">Because You Must</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=Food&Grocery" className="brand">
                    <div className="dropdown-category-name">Food & Grocery</div>
                    <div className="dropdown-category-slogan">Because Eating, Right?</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=Health&Wellness" className="brand">
                    <div className="dropdown-category-name">Health & Wellness</div>
                    <div className="dropdown-category-slogan">Or Whatever</div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink tag={Link} to="/fetch-data?category=Office&SchoolSupplies" className="brand">
                    <div className="dropdown-category-name">Office & School Supplies</div>
                    <div className="dropdown-category-slogan">Inspiration for Procrastination</div>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink tag={Link} className="navmenu-item" to="/shopping-cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="navmenu-name">Shopping Cart</span>
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
