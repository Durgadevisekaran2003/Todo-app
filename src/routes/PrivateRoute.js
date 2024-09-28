import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const loggedIndex = useSelector((state) => state.loggedIndexReducer[0]);

    return loggedIndex !== -1 ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
