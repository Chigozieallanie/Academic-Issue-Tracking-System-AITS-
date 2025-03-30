import React, { useState } from 'react';
import './Registradashboard.css';
import { Link } from 'react-router-dom';

const Registradashboard = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="registra-dashboard-container">
            <aside className="registra-dashboard-sidebar">
                <h1>Registrar Dashboard</h1>
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#performance">Monitor Performance</a></li>
                    <li><a href="#issues">Recurring Issues</a></li>
                    <li><a href="#escalated">Escalated Issues</a></li>
                    <li><a href="#communication">Communication</a></li>
                    <li><a href="#logout">Log Out</a></li>
                </ul>
            </aside>
            <main className="registra-dashboard-main">
                <section id="dashboard" className="registra-dashboard-section">
                    <h2>Dashboard Section</h2>
                    <p>Welcome to the dashboard. Here you can access all the features and tools.</p>
                    <div className="dashboard-overview">
                        <div className="overview-card">
                            <h3>Total Students</h3>
                            <p>1,200</p>
                        </div>
                        <div className="overview-card">
                            <h3>Total Lecturers</h3>
                            <p>150</p>
                        </div>
                        <div className="overview-card">
                            <h3>Active Issues</h3>
                            <p>25</p>
                        </div>
                        <div className="overview-card">
                            <h3>Resolved Issues</h3>
                            <p>320</p>
                        </div>
                    </div>
                </section>


                <section id="profile" className="registra-dashboard-section">
                    <h2>Profile Section</h2>
                    <p>Manage your profile information here.</p>
                    {profilePhoto && (
                        <div className="profile-photo-preview">
                            <img src={profilePhoto} alt="Profile Preview" />
                        </div>
                    )}
                    <form className="profile-form">
                        <label htmlFor="profile-photo">Profile Photo:</label>
                        <input
                            type="file"
                            id="profile-photo"
                            name="profilePhoto"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />

                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" placeholder="Enter your ID" />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />

                        <button type="submit">Save Profile</button>
                    </form>
                </section>


                <section id="performance" className="registra-dashboard-section">
                    <h2>Monitor Departmental Performance</h2>
                    <p>View and analyze departmental performance metrics here.</p>
                    <table className="performance-table">
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Performance Metric</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Computer Science</td>
                                <td>85%</td>
                                <td>Good</td>
                            </tr>
                            <tr>
                                <td>Information Systems</td>
                                <td>78%</td>
                                <td>Average</td>
                            </tr>
                            <tr>
                                <td>Software Engineering</td>
                                <td>92%</td>
                                <td>Excellent</td>
                            </tr>
                        </tbody>
                    </table>
                </section>


                <section id="issues" className="registra-dashboard-section">
                    <h2>Identify Recurring Issues</h2>
                    <p>Track and identify recurring issues in the system.</p>
                    <table className="issues-table">
                        <thead>
                            <tr>
                                <th>Issue</th>
                                <th>Frequency</th>
                                <th>Last Reported</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Login Failures</td>
                                <td>15 times</td>
                                <td>2023-03-10</td>
                            </tr>
                            <tr>
                                <td>System Downtime</td>
                                <td>8 times</td>
                                <td>2023-03-08</td>
                            </tr>
                            <tr>
                                <td>Data Sync Errors</td>
                                <td>5 times</td>
                                <td>2023-03-09</td>
                            </tr>
                        </tbody>
                    </table>
                </section>


                <section id="escalated" className="registra-dashboard-section">
                    <h2>Oversee Escalated Issues</h2>
                    <p>Manage and resolve escalated issues here.</p>
                    <table className="escalated-issues-table">
                        <thead>
                            <tr>
                                <th>Issue</th>
                                <th>Priority</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Database Connection Failure</td>
                                <td>High</td>
                                <td>IT Support</td>
                                <td>In Progress</td>
                            </tr>
                            <tr>
                                <td>Unauthorized Access Attempt</td>
                                <td>Critical</td>
                                <td>Security Team</td>
                                <td>Pending</td>
                            </tr>
                            <tr>
                                <td>Grade Submission Delay</td>
                                <td>Medium</td>
                                <td>Academic Office</td>
                                <td>Resolved</td>
                            </tr>
                        </tbody>
                    </table>
                </section>


                <section id="communication" className="registra-dashboard-section">
                    <h2>Communication</h2>
                    <p>Send messages or announcements to students and lecturers.</p>
                    <form className="communication-form">
                        <label htmlFor="recipient">Recipient:</label>
                        <select id="recipient" name="recipient">
                            <option value="students">Students</option>
                            <option value="lecturers">Lecturers</option>
                        </select>

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" placeholder="Type your message here..."></textarea>
                        <button type="submit">Send</button>
                    </form>
                </section>

                <section id="logout" className="registra-dashboard-section">
                    <h2>Log Out</h2>
                    <p>Are you sure you want to log out?</p>
                    <div className="logout-buttons">
                        <Link to="/Registralogin">
                            <button onClick={() => alert('Logged out successfully!')}>Yes, Log Out</button>
                        </Link>
                        <button onClick={() => alert('Log out canceled.')}>Cancel & stay logged in</button>
                    </div>
                </section>
                
                <p>© {new Date().getFullYear()} MAK-AITS. All rights reserved</p>
            </main>
        </div>
    );
};

export default Registradashboard;
