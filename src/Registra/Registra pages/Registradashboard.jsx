import React from 'react';
import './Registradashboard.css';

const Registradashboard = () => {
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
                </section>


                <section id="profile" className="registra-dashboard-section">
                    <h2>Profile Section</h2>
                    <p>Manage your profile information here.</p>
                </section>

                
                <section id="performance" className="registra-dashboard-section">
                    <h2>Monitor Departmental Performance</h2>
                    <p>View and analyze departmental performance metrics here.</p>
                </section>
                <section id="issues" className="registra-dashboard-section">
                    <h2>Identify Recurring Issues</h2>
                    <p>Track and identify recurring issues in the system.</p>
                </section>
                <section id="escalated" className="registra-dashboard-section">
                    <h2>Oversee Escalated Issues</h2>
                    <p>Manage and resolve escalated issues here.</p>
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
                    <p>Click here to log out of the system.</p>
                </section>
            </main>
        </div>
    );
};

export default Registradashboard;
