import React, {useState} from 'react';
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from 'react-router-dom'

const Signup = () => {
    //STATE STUFF
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    //CSS
    const formStyle = {
        maxWidth: '20vw',
        padding: '10px',
        marginLeft: '15vw',
        marginTop: '15vh',
        border: '1px solid #ccc',
        boxShadow: '0px 1px 7px 3px',
    }

    async function signup() {
        const {data} = await axios.post('http://localhost:3005/signup', {
            username, password, email
        })
        if (data.message === 'User Created!') {
            alert(`User Created!`)
            history.push('/')
        } else if (data.message === 'user already exist') {
            alert(`Username or Email already exist!`)
        } else {
            console.log('wtf')
        }
    }

    return (
        <div>
            <Container>
                <Form style={formStyle}>
                    <h2 className={'text-center'}>Signup</h2>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={signup} type={'button'}>Signup</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Signup;