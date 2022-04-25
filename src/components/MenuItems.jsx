import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPeopleRoof,
  faAddressCard,
  faDragon,
} from "@fortawesome/free-solid-svg-icons";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/create">
        <NavLink to="/create">
          <FontAwesomeIcon icon={faDragon} /> {"   "}
          Create
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/guild">
        <NavLink to="/guild">
          <FontAwesomeIcon icon={faPeopleRoof} /> {"   "}
          Join
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">
          <FontAwesomeIcon icon={faAddressCard} /> {"   "}NFTs
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
