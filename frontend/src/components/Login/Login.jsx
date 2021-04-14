import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import './Login.css'

const Login = ({loggedInUser,currentUser,setCurrentUser, setLoggedInUser}) => {
    //STATE STUFF
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    //Login Function
    async function login() {
        const {data} = await axios.post('http://localhost:3005/login', {
            username, password
        })
        if (data.msg === 'User Found!') {
            localStorage.setItem('User', JSON.stringify(data.user))
            console.log(data)
            setLoggedInUser(true)
            setCurrentUser(data.user)
            history.push('/dashboard')
        } else {
            alert('Username or password are incorrect!')
        }
        //    Todo: Add more validation- if username WRONG and if password WRONG
    }

    return (
        <Container>
            <Form id={'formStyles'}>
                <h2 className={'text-center'}>Login</h2>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={'password'} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button onClick={login} type={'button'}>Login</Button>
            </Form>
        </Container>
    );
};

export default Login;