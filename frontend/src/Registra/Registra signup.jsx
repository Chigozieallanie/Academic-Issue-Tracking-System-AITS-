import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Registra signup.css';

const RegistraSignup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        idNumber: '' 
    });
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
    const navigate = useNavigate(); 

    useEffect(() => {
        document.body.classList.add('body-registra-signup');
        return () => {
            document.body.classList.remove('body-registra-signup');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
            navigate('/Registralogin'); 
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
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="toggle-password-icon"
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
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
                        <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved</p>
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

                    <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved.</p>
            <p>Empowering Students Through Seamless Issue Resolution</p>
                </form>
            )}
        </div>
    );
};

export default RegistraSignup;
