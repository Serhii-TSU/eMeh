import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
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
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret className="text-dark">
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="brand">
                    <div className="dropdown-category-name">Beauty & Care</div>
                    <div className="dropdown-category-slogan">Because You Must</div>
                  </DropdownItem>
                  <DropdownItem className="brand">
                    <div className="dropdown-category-name">Office & School Supplies</div>
                    <div className="dropdown-category-slogan">Inspiration for Procrastination</div>
                  </DropdownItem>
                  <DropdownItem className="brand">
                    <div className="dropdown-category-name">Food & Grocery</div>
                    <div className="dropdown-category-slogan">Because Eating, Right?</div>
                  </DropdownItem>
                  <DropdownItem className="brand">
                    <div className="dropdown-category-name">Health & Wellness</div>
                    <div className="dropdown-category-slogan">Or Whatever</div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
