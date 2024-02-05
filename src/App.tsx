import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import BlankLayout from "./components/blank-layout";
import Login from "./pages/login";
import Home from "./pages/home";
import MainLayout from "./components/main-layout";
import Dashboard from "./pages/dashboard";
import { useLocalStorage } from "@uidotdev/usehooks";
import Employees from "./pages/employees";
import Units from "./pages/units";
import Roles from "./pages/roles";
import './app.scss'

function App() {

    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);

    return (
        <Routes>
            <Route element={<BlankLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Route>
            <Route element={<Protected isAuthenticated={isAuthenticated} />}>
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/units" element={<Units />} />
                    <Route path="/roles" element={<Roles />} />
                </Route>
            </Route>
        </Routes>
    )
}

const Protected = ({ isAuthenticated = false }) => {
    return isAuthenticated ? (
        <Outlet />
    ) : <Navigate to="/login" replace={true} />;
};

export default App;