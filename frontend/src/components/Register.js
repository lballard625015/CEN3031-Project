import '../css/Register.css'

import {React, useState} from 'react';
import { gql, useMutation } from '@apollo/client';

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

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [goal, setGoal] = useState();

    const [createUser] = useMutation(CREATE_USER);

    async function handleSubmit() {
        const parsedAge = parseInt(age, 10);
        const parsedHeight = parseInt(height);
        
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
    <input id="password-input" type="password" placeholder="Password" onChange={handlePassword} />
    
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
    <button id="register-button" onClick={handleSubmit}>Register</button>
</div>

    );
}

export default Register;