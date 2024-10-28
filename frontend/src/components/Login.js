import '../css/Login.css'

import {React, useState} from 'react';
import { gql, useLazyQuery} from '@apollo/client';

const GET_USER = gql`
    query GetUser(
        $username: String!
    ) {
        getUser(
            username: $username
        )
    }
`

const GET_PASSWORD = gql`
    query GetPassword(
        $password: String!
    ) {
        getPassword(
            password: $password
        )
    }
`

function Login() {

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const [error, setError] = useState('');

    const [checkUserExists, { data: userExistsData, refetch: refetchUser }] = useLazyQuery(GET_USER);
    const [checkPasswordExists, { data: passwordExistsData, refetch: refetchPassword }] = useLazyQuery(GET_PASSWORD);

    function handleChangeUsername(e) {
        setUsername(e.target.value);
        console.log(username);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        console.log(password);
    }

    async function handleSubmit() {
        const { data: userExistsResult } = await refetchUser({ username });
        const { data: passwordExistsResult } = await refetchPassword({ password });

        console.log(userExistsResult?.getUser);
        console.log(passwordExistsResult?.getPassword);

        if (!userExistsResult?.getUser || !passwordExistsResult?.getPassword) {
            setError("Invalid credentials");
            return;
        }

        window.location.href = "/home";
    }

    async function handleRegister() {
        window.location.href = "/register";
    }

    return (
        <div>
            <h1 className="title">
                WebFit
            </h1>
            <div className="login-box">
                <h1 id="login-header">Login</h1>
                <input id="login-input" placeholder="Username" onChange={handleChangeUsername}/>
                <br/>
                <input id="password-login-input" placeholder="Password" onChange={handleChangePassword}/>
                <br/>
                <div className="error-container">
                    {error && <p className="error-message">{error}</p>}
                </div>
                <button id="login-button" onClick={handleSubmit}>Login</button>
                <br/>
                <button id="reg-button" onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
}

export default Login;