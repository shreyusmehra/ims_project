import links from "../utils/links";
import { NavLink } from "react-router-dom";

const Navlinks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            style={{
              textDecoration: "none",
              color: "#fff",
              textTransform: "capitalize",
              margin: "0px 20px 0px 0px",
            }}
          >
            <span style={{ margin: "0px 2px 0px 0px " }}>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navlinks;
