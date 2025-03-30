import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Registra login.css';

const RegistraLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        idNumber: '' 
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
        alert('Login successful!');
        navigate('/Registradashboard'); 
    };

    return (
        <div className="registra-login-container">
            <h2>Academic Registrar Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="idNumber">ID Number:</label>
                    <input
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
                <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved</p>
            </form>
        </div>
    );
};

export default RegistraLogin;
