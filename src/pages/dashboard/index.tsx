import { useEffect, useState } from "react";
import { BASE_URL_API } from "../../config/config";
import axios from "axios";
import AuthHistories from "./top-auth-histories";

const Dashboard = () => {

    const [countEmployee, setCountEmployee] = useState(0);
    const [countUnit, setCountUnit] = useState(0);
    const [countRole, setCountRole] = useState(0);
    const [countLogin, setCountLogin] = useState(0);

    const getTotalEmployee = async () => {
        try {
            const response = await axios.get(BASE_URL_API + `/employees/count`);
            setCountEmployee(response.data.data.total)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getTotalUnit = async () => {
        try {
            const response = await axios.get(BASE_URL_API + `/units/count`);
            setCountUnit(response.data.data.total)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getTotalRole= async () => {
        try {
            const response = await axios.get(BASE_URL_API + `/roles/count`);
            setCountRole(response.data.data.total)
        } catch (error) {
            console.error("Error", error);
        }
    };

    const getTotalLogin= async () => {
        try {
            const response = await axios.get(BASE_URL_API + `/auth-histories/count`);
            setCountLogin(response.data.data.total)
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        getTotalEmployee()
        getTotalUnit()
        getTotalRole()
        getTotalLogin()
    }, []);

    return (
        <div className="my-5">
            <h3>Statistic</h3>
            <div className="row">
                <div className="col-3">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Total Karyawan</h5>
                            <h1>{countEmployee}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Total Unit</h5>
                            <h1>{countUnit}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Total Jabatan</h5>
                            <h1>{countRole}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Total Login</h5>
                            <h1>{countLogin}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <AuthHistories/>
        </div>
    )
}

export default Dashboard;