import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import Guild from "pages/Guild/Guild";
import ERC20Balance from "pages/ERC20Balance/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import NFTBalance from "pages/NFTBalance/NFTBalance";
import Wallet from "pages/Wallet";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "pages/QuickStart/QuickStart";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
import GuildsPage from "pages/GuildsPage/GuildsPage";
import CreateGuildPage from "pages/CreateGuildPage/CreateGuildPage";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
const { Header, Footer } = Layout;

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
          <MenuItems />
          <div style={styles.headerRight}>
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
            <ProtectedRoute path="/create">
              <CreateGuildPage />
            </ProtectedRoute>
            <Route exact path="/quickstart">
              {!isAuthenticated ? (
                <QuickStart isServerInfo={isServerInfo} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute path="/wallet">
              <Wallet />
            </ProtectedRoute>
            <ProtectedRoute path="/erc20balance">
              <ERC20Balance />
            </ProtectedRoute>
            <ProtectedRoute path="/erc20transfers">
              <ERC20Transfers />
            </ProtectedRoute>
            <ProtectedRoute path="/nftBalance">
              <NFTBalance />
            </ProtectedRoute>
            <ProtectedRoute path="/">
              <GuildsPage />
            </ProtectedRoute>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/" />
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
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          ⭐️ Please star this{" "}
          <a
            href="https://github.com/ethereum-boilerplate/ethereum-boilerplate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            boilerplate
          </a>
          , every star makes us very happy!
        </Text>

        <Text style={{ display: "block" }}>
          🙋 You have questions? Ask them on the {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://forum.moralis.io/t/ethereum-boilerplate-questions/3951/29"
          >
            Moralis forum
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          📖 Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplat"
          >
            Moralis
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img
      width="60"
      height="38"
      viewBox="0 0 50 38"
      fill="none"
      src={process.env.PUBLIC_URL + "/logo.jpg"}
    />
  </div>
);

export default App;
