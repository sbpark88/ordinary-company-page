import React from "react";
import { ViewUrl } from "../../modules/data/URL";
import { Link, NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header({ type }) {
  return (
    <header className={type}>
      <h1>
        <Link to={ViewUrl.root}>LOGO</Link>
      </h1>
      <ul id="gnb">
        <Navigation path={ViewUrl?.department} name={"Department"} />
        <Navigation path={ViewUrl?.community} name={"Community"} />
        <Navigation path={ViewUrl?.gallery} name={"Gallery"} />
        <Navigation path={ViewUrl?.youtube} name={"Youtube"} />
        <Navigation path={ViewUrl?.contact} name={"Contact"} />
        <Navigation path={ViewUrl?.members} name={"Members"} />
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
