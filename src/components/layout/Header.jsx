import React, { useCallback, useRef } from "react";
import { ViewUrl } from "../../modules/data/URL";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileHeader from "./mobile/MobileHeader";
import Navigation from "../common/Navigation";

function Header({ type }) {
  const mobileHeader = useRef(null);

  const mobileMenuOnClick = useCallback(
    (event) => {
      mobileHeader.current.toggleMenu();
    },
    [mobileHeader]
  );

  return (
    <>
      <header className={type}>
        <h1>
          <Link to={ViewUrl.root}>Hogwrats</Link>
        </h1>
        <ul id="gnb">
          <Navigation path={ViewUrl?.department} name={"Department"} />
          <Navigation path={ViewUrl?.community} name={"Community"} />
          <Navigation path={ViewUrl?.gallery} name={"Gallery"} />
          <Navigation path={ViewUrl?.youtube} name={"Youtube"} />
          <Navigation path={ViewUrl?.contact} name={"Contact"} />
          <Navigation path={ViewUrl?.members} name={"Members"} />
        </ul>
        <FontAwesomeIcon icon={faBars} onClick={mobileMenuOnClick} />
      </header>
      <MobileHeader ref={mobileHeader} />
    </>
  );
}

export default Header;
