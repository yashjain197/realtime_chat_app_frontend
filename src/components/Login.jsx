import { useState } from 'react';

export function Login({ onSubmit }) {
    // State for storing the username
    const [username, setUsername] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the username to the onSubmit function
        onSubmit(username);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            {/* Welcome message */}
            <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Welcome</h1>
            {/* Input form */}
            <p style={{ color: '#333333', fontSize: '18px', marginBottom: '20px' }}>What should people call you?</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Username input field */}
                <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #cccccc', marginBottom: '20px', width: '300px' }}
                />
                {/* Submit button */}
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
}
