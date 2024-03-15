import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export function Home({ username }) {
    // WebSocket URL
    const WS_URL = 'wss://real-time-chat-backend-t3gc.onrender.com/'

    // State for storing message history and current message
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState('');

    // Hook for WebSocket connection
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        queryParams: { username }
    });

    // Effect for updating message history when a new message is received
    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory(prev => [...prev, lastJsonMessage]);
        }
    }, [lastJsonMessage]);

    // Function to handle message submission
    const handleSubmit = () => {
        if (message.trim() !== '') {
             sendJsonMessage({ message });
            setMessage('');
        }
    };

    // Check if both username and message are empty, return null if true
    if (!username && !message) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {/* Render message history */}
                {messageHistory.map((msg, index) => (
                    <div 
                        key={index} 
                        style={{
                            marginBottom: '15px',
                            display: 'flex',
                            flexDirection: msg.isUserMessage ? 'row-reverse' : 'row',
                            alignItems: 'center'
                        }}
                    >
                        <div 
                            style={{
                                backgroundColor: msg.isUserMessage ? '#007bff' : '#ffffff',
                                color: msg.isUserMessage ? '#ffffff' : '#000000',
                                padding: '10px',
                                borderRadius: '10px',
                                maxWidth: '70%',
                                wordWrap: 'break-word',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {/* Render username and message */}
                            <div style={{ fontSize: '12px', marginBottom: '5px' }}>{msg.username}</div>
                            <div style={{ fontSize: '18px' }}>{msg.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ borderTop: '1px solid #ccc', padding: '20px', display: 'flex', alignItems: 'center' }}>
                {/* Input field and Send button */}
                <input
                    type="text"
                    placeholder="Enter Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #cccccc', backgroundColor: '#ffffff' }}
                />
                <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
            </div>
        </div>
    );
}
