import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import './AddExpense.css'
import axios from "axios";
import {useHistory} from 'react-router-dom'

const AddExpense = () => {
    //STATE STUFF
    const [categoriesList, setCategoriesList] = useState([])
    const [name, setName] = useState(String);
    const [category, setCategory] = useState(String);
    const [price, setPrice] = useState(String);
    const [date, setDate] = useState(Date);
    const history = useHistory();

    //Get Categories onload
    const categories = async () => {
        const {data} = await axios.get('http://localhost:3005/categories')
        console.log(data.message)
        setCategoriesList(data.message)
    }

    //Add Expense to db
    async function addExpense() {
        const user = JSON.parse(localStorage.getItem('User'))
        console.log(user)
        const expense = {
            name,
            price,
            date,
            category,
            user_id: user.id
        }
        if (!name) {
            alert('You must enter the name of the product!')
            return;
        } else if (!price) {
            alert('You must enter the price of the product!')
            return;
        } else if (!date) {
            alert('You must enter a valid date!')
            return;
        } else if (!category) {
            alert('You must choose a category!')
            return;
        } else {
            console.log(expense)
            const {data} = await axios.post(`http://localhost:3005/addExpense/${user.username}`, expense);
            console.log(data)
            //Todo: use SweetAlert2
            alert('New Expense Added!')
            history.push('/dashboard')
        }
    }

    //Go Back to dashboard
    function goBack() {
        // setCurrentContainer('data')
    }

    useEffect(() => {
        categories()
    }, [])

    return (
        <Container>
            <Form id={'expense-form'}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control onChange={e => setCategory(e.target.value)} as={"select"}>
                        <option></option>
                        {categoriesList.map(category => <option value={category.id}
                                                                key={category.id}> {category.name} </option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={e => setPrice(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type={'date'} onChange={event => setDate(event.target.value)}/>
                </Form.Group>
                <div className='d-flex justify-content-around'>
                    <Button onClick={addExpense} type='button'>Add Expense</Button>
                    {/*<Button onClick={goBack}>Go Back</Button>*/}
                </div>
            </Form>
        </Container>
    );
};

export default AddExpense;