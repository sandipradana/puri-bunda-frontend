import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className="container">

                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;