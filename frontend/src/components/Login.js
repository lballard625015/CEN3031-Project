import '../css/Login.css'

import {React, useState} from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($input: String!) {
        createUser(username: $input)
    }    
`

function Login() {

    const[username, setUsername] = useState('')

    const[createuser] = useMutation(CREATE_USER);

    function handleChange(e) {
        setUsername(e.target.value);
        console.log(username);
    }

    async function handleSubmit() {
        try {
            await createuser({ variables: { input: username } });
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    return (
        <div className="login-box">
            <h1 id="login-header">Login</h1>
            <input id="login-input" placeholder="Username" onChange={handleChange}/>
            <br/>
            <input id="password-login-input" placeholder="Password"/>
            <br/>
            <button id="login-button" onClick={handleSubmit}>Login</button>
        </div>
    );
}

export default Login;