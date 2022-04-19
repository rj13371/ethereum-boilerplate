import { useMoralis } from "react-moralis";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useMoralis();

  return (
    <Route {...props}>
      {isAuthenticated ? props.children : <Redirect to="/quickstart" />}
    </Route>
  );
};

export default ProtectedRoute;
