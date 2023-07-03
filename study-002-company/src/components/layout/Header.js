import React from "react";
import { viewUrl } from "../../modules/data/URL";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  const headerStyle = {
    backgroundColor: "aqua",
  };

  const navActiveStyle = {
    color: "hotpink",
    fontWeight: "bold",
  };

  return (
    <header style={headerStyle}>
      <h1>
        <Link to={viewUrl.root}>LOGO</Link>
      </h1>
      <ul id="gnb">
        <Navigation path={viewUrl?.department} name={"Department"} />
        <Navigation path={viewUrl?.community} name={"Community"} />
        <Navigation path={viewUrl?.gallery} name={"Gallery"} />
        <Navigation path={viewUrl?.youtube} name={"Youtube"} />
        <Navigation path={viewUrl?.contact} name={"Contact"} />
        <Navigation path={viewUrl?.members} name={"Members"} />
      </ul>
    </header>
  );
}

function Navigation({ path, name }) {
  const activeStyle = {
    color: "hotpink",
    fontWeight: "bold",
  };

  if (path === undefined || name === undefined) return null;

  return (
    <li>
      <NavLink to={path} activeStyle={activeStyle}>
        {name}
      </NavLink>
    </li>
  );
}

export default Header;
