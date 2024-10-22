import React, { useState } from 'react';
import '../styles/LoginBox.css';  // Adjust the path based on your file structure

function LoginForm(params) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validUsername, setValidUsername] = useState(true); // Start with true to avoid initial invalid state
    const [validPassword, setValidPassword] = useState(false);

    // Regex for alphanumeric validation
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    async function handleLogin() {
        try {
            const response = await fetch('http://localhost:3000/api/family/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    familyName: username,
                    password: password
                })
            });
            // Check if the request was successful
            if (!response.ok) {
                // Get error message from the response
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            // Parse JSON response
            const data = await response.json();
            console.log('Success:', data);
            console.log(data.response.length)
            if (data.response.length>0){
                // params.setHomeIdsArray(data.response[0].homeIdsArr)
                console.log(data.response[0].homeIdsArr)
                params.setHomeIdsArray(data.response[0].homeIdsArr)
                params.setLoggedIn(true)
            }

        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    }

    function onChangeUsername(e) {
        const value = e.target.value;
        setUsername(value);
        // Immediate validation based on the current value
        setValidUsername(alphanumericRegex.test(value));
    }

    function onChangePassword(e) {
        const value = e.target.value;
        setPassword(value);
        // Immediate validation based on the current value
        setValidPassword(value.length >= 8);
    }

    return (
        <div className="login-form-container">
            <div className="card-wrapper">
                <div className="form-data">
                    <div className="forms-inputs mb-4">
                        <span>Username</span>
                        <input
                            autoComplete="off"
                            type="text"
                            value={username}
                            className={`form-control`}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className="forms-inputs mb-4">
                        <span>Password</span>
                        <input
                            autoComplete="off"
                            type="password"
                            value={password}
                            className={`form-control`}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="mb-3">
                        <button onClick={handleLogin} className="btn btn-dark w-100">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
