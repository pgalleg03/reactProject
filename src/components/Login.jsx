import { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png'

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin(); // Call the onLogin function to signal successful login
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                
                <div className='form'>
                    <img src={logo} alt={logo} className='image'/>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ display: 'block', margin: '10px 0', width: '100%' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ display: 'block', margin: '10px 0', width: '100%' }}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;