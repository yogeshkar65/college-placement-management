import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded check for now - can be enhanced later
        if (email === 'admin@college.edu' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
    };

    const formStyle = {
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-soft)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        margin: '10px 0',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '16px',
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleLogin}>
                <h2 style={{ color: 'var(--green-dark)', marginBottom: '20px' }}>Admin Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                    required
                />
                <button type="submit" className="drive-btn" style={{ width: '100%', marginTop: '20px' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
