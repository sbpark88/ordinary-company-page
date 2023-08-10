import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ViewUrl } from "../../../modules/data/URL";
import Navigation from "../../common/Navigation";

const MobileHeader = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prevState) => !prevState);

  const raiseUp = {
    openMenu: openMenu,
    closeMenu: closeMenu,
    toggleMenu: toggleMenu,
  };

  useImperativeHandle(ref, () => raiseUp);

  // $tablet: 1199px; 태블릿 최대 사이즈 기준. 1200px 부터 PC 화면. (style.scss)
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1199) closeMenu();
    });
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav id="mobileHeader" {...motionNav} onClick={closeMenu}>
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
});

export default MobileHeader;

const motionNav = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: "-100%", transition: { delay: 0.5 } },
};
