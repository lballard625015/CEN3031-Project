import '../css/Register.css'

import {React, useState} from 'react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser(
        $username: String!,
        $email: String!,
        $password: String!,
        $age: Int!,
        $height: Int!,
        $goal: String!
        ) {
        createUser(
            username: $username,
            email: $email,
            password: $password,
            age: $age,
            height: $height,
            goal: $goal
            )
        {
            id 
            username
            email
            password
            age
            height
            goal
        }
    }    
`

const GET_USER = gql`
    query GetUser(
        $username: String!
    ) {
        getUser(
            username: $username
        )
    }
`

const GET_EMAIL = gql`
    query GetEmail(
        $email: String!
    ) {
        getEmail(
            email: $email
        )
    }
`

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [goal, setGoal] = useState();
    const [error, setError] = useState('');

    const [createUser] = useMutation(CREATE_USER);
    const [checkUserExists, { data: userExistsData, refetch: refetchUser }] = useLazyQuery(GET_USER);
    const [checkEmailExists, { data: emailExistsData, refetch: refetchEmail }] = useLazyQuery(GET_EMAIL);


    async function handleSubmit() {
        const errors = [];

        const { data: userExistsResult } = await refetchUser({ username });
        const { data: emailExistsResult } = await refetchEmail({ email });

        if (userExistsResult?.getUser) {
            errors.push("Username already exists.");
        }

        if (emailExistsResult?.getEmail) {
            errors.push("Email is already in use.");
        }
    
        if (!username || !email || !password || !age || !height || !goal) {
            errors.push("All fields are required to register.");
        }
    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }
    
        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
            errors.push("Please enter a realistic age (between 1 and 120).");
        }
    
        const parsedHeight = parseFloat(height);
        if (isNaN(parsedHeight) || parsedHeight < 50 || parsedHeight > 250) {
            errors.push("Please enter a realistic height (between 50 cm and 250 cm).");
        }
    
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        if (!passwordPattern.test(password)) {
            errors.push("Password must be at least 5 characters long, contain an uppercase letter, a number, and a special symbol.");
        }
    
        if (errors.length > 0) {
            setError(errors.join(" "));
            return;
        } else {
            setError('');
        }
    
        console.log(username, email, password, parsedAge, parsedHeight, goal);
    
        await createUser({
            variables: {
                username: username, 
                email: email, 
                password: password, 
                age: parsedAge, 
                height: parsedHeight, 
                goal: goal 
            }
        });

        window.location.href = "/";
    }
    
    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleAge(e) {
        setAge(e.target.value);
    }

    function handleHeight(e) {
        setHeight(e.target.value);
    }

    function handleGoal(e) {
        setGoal(e.target.value);
    }

    return (
        <div className="register-box">
            <h1 id="register-header">Register</h1>

            <label htmlFor="email-input">Email:</label>
            <input id="email-input" placeholder="Email" onChange={handleEmail} />
            
            <label htmlFor="register-input">Username:</label>
            <input id="register-input" placeholder="Username" onChange={handleUsername} />
            
            <label htmlFor="password-input">Password:</label>
            <input 
                id="password-input" 
                type="password" 
                placeholder="Password" 
                onChange={handlePassword} 
            />
            
            <label htmlFor="number-input">Age:</label>
            <input type="number" id="age-input" placeholder="Enter your age" min="0" onChange={handleAge} />
            
            <label htmlFor="height-input">Height (in cm):</label>
            <input type="number" id="height-input" name="height" min="0" step="0.1" placeholder="Enter height in cm" onChange={handleHeight}/>
            
            <label htmlFor="fitness-goals">Primary Fitness Goals:</label>
            <div className="fitness-goals">
                <label>
                    <input type="radio" name="goal" value="weight loss" onChange={handleGoal}/> Weight Loss
                </label>
                <label>
                    <input type="radio" name="goal" value="muscle gain" onChange={handleGoal}/> Muscle Gain
                </label>
                <label>
                    <input type="radio" name="goal" value="toning" onChange={handleGoal}/> Toning
                </label>
                <label>
                    <input type="radio" name="goal" value="general health" onChange={handleGoal}/> General Health
                </label>
            </div>
            
            <br />
            {error && error.split('. ').map((err, index) => <p key={index} className="error-message">{err}</p>)}
            <button id="register-button" onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default Register;
