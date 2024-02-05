
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_API } from '../../config/config';
import axios from 'axios';

interface LoginProps {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {

    const history = useNavigate();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(BASE_URL_API + `/employees/login`, { username: username, password: password });
            if (response.status == 200) {
                setIsAuthenticated(true)
                history("/dashboard");
            }else {
                setMessage(response.data)
            }
        } catch (error) {
            console.error("Error login:", error);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '300px', margin: '0 auto', marginTop: '10%' }}>
            <div className="card-body">
                {message}
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <a className="btn btn-primary" href="#" onClick={handleLogin}>Login</a>
                </form>
            </div>
        </div>
    );
};

export default Login;