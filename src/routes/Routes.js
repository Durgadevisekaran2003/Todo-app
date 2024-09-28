import Reminder from "../components/Reminder";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* PrivateRoute should render element instead of component */}
                <Route path="/" element={<PrivateRoute component={Reminder} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
