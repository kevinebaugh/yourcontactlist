import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ name, handleSignOut }) {
  return (
    <>
      <h1><img alt="Contact List logo" id="header-icon" src="logo192.png" /> Contact List</h1>
      <h3>Update your address and view your friends' updated addresses in one place.</h3>
      <div className="navbar">
        <NavLink
          to="/"
          exact
          style={null}
          activeStyle={null}
          > Home </NavLink>
        <NavLink
          to="/your-address"
          exact
          style={null}
          activeStyle={null}
          > Your address </NavLink>
        <NavLink
          to="/available-addresses"
          exact
          style={null}
          activeStyle={null}
          > Available addresses </NavLink>
        <NavLink
          to="/address-book"
          exact
          style={null}
          activeStyle={null}
          > Address book </NavLink>
      </div>


      <h1>Hello, {name}!
      </h1>
        <a id="sign-out-link" href="/" onClick={handleSignOut}>sign out</a>
    </>
  )
}

export default NavBar;

