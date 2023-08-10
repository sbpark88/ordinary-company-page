import { NavLink } from "react-router-dom";

function Navigation({ path, name }) {
  if (path === undefined || name === undefined) return null;

  return (
    <li>
      <NavLink to={path} activeStyle={activeStyle}>
        {name}
      </NavLink>
    </li>
  );
}

export default Navigation;

const activeStyle = {
  color: "hotpink",
  fontWeight: "bold",
};
