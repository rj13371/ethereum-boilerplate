import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWallet,
  faPiggyBank,
  faMoneyBillTransfer,
  faAddressCard,
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
      <Menu.Item key="/quickstart">
        <NavLink to="/quickstart">
          <FontAwesomeIcon icon={faHome} /> {"   "} Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          <FontAwesomeIcon icon={faWallet} /> {"   "}
          Wallet
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">
          <FontAwesomeIcon icon={faPiggyBank} />
          {"   "}
          Balances
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">
          <FontAwesomeIcon icon={faMoneyBillTransfer} /> {"   "}
          Transfers
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
