import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import Guild from "pages/Guild/Guild";
import NFTBalance from "pages/NFTBalance/NFTBalance";
import Wallet from "pages/Wallet";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "pages/QuickStart/QuickStart";
import { Typography } from "antd";

import MenuItems from "./components/MenuItems";
import GuildsPage from "pages/GuildsPage/GuildsPage";
import CreateGuildPage from "pages/CreateGuildPage/CreateGuildPage";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import Landing from "pages/Landing/Landing";

const { Header, Footer } = Layout;
const { Title } = Typography;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3({ provider: connectorId });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <div style={styles.headerRight}>
            <MenuItems />
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <ProtectedRoute path="/guild/:id">
              <Guild />
            </ProtectedRoute>
            <Route path="/guild">
              <GuildsPage />
            </Route>
            <ProtectedRoute path="/create">
              <CreateGuildPage />
            </ProtectedRoute>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <ProtectedRoute path="/nftBalance">
              <NFTBalance />
            </ProtectedRoute>
            <Route path="/">
              <Landing />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
            {/* Catch all route */}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <NavLink to={`/`}>
      <img
        width="60"
        height="38"
        viewBox="0 0 50 38"
        fill="none"
        src={process.env.PUBLIC_URL + "/logo.svg"}
      />
    </NavLink>
    <NavLink to={`/`}>
      <Title level={4}>Game Guilds DAO</Title>
    </NavLink>
  </div>
);

export default App;
