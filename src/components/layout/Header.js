import React from "react";
import { viewUrl } from "../../modules/data/URL";
import { Link, NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ type }) {
  return (
    <header className={type}>
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
      <FontAwesomeIcon icon={faBars} />
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
