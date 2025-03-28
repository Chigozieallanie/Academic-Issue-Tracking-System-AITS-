import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Registra signup.css';

const RegistraSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        idNumber: '' // Added ID number field
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsCodeSent(true);
        alert('A verification code has been sent to your email.');
    };

    const handleVerification = (e) => {
        e.preventDefault();
        if (verificationCode === '123456') {
            alert('Signup successful!');
            navigate('/Registralogin'); // Use the correct absolute path
        } else {
            alert('Invalid verification code.');
        }
    };

    return (
        <div className="registra-signup-container">
            <h2>Academic Registrar Signup</h2>
            {!isCodeSent ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                    <button type="submit">Sign Up</button>
                </form>
            ) : (
                <form onSubmit={handleVerification}>
                    <div className="form-group">
                        <label htmlFor="verificationCode">Verification Code:</label>
                        <input
                            type="text"
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Verify</button>
                </form>
            )}
        </div>
    );
};

export default RegistraSignup;
