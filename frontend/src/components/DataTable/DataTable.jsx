import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";

import * as AiIcons from "react-icons/ai";
import './DataTable.css'
//

const DataTable = () => {
    //STATE STUFF
    const [expenses, setExpenses] = useState([]);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    // Get all expenses
    async function getExpenses() {
        const user = JSON.parse(localStorage.getItem('User'))
        const {data} = await axios.get(`http://localhost:3005/getExpenses/${user.id}`)
        setExpenses(data.message)
    }

    // Todo: Add More Sorting Options
    function sortTable() {
        console.log(expenses)
        let byName = expenses.slice(0);
        byName.sort(function (a, b) {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });

        console.log('by name:');
        console.log(byName);
        setExpenses(byName)
    }

    //UseEffect
    useEffect(() => {
        getExpenses().then(() => {
        }).catch(err => console.log(err))
    }, [])

    return (
        <Container>
            {/*<button onClick={sortTable}>btn</button>*/}
            {/*<button onClick={sortTable}>button</button>*/}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Name<AiIcons.AiOutlineArrowDown/> </TableCell>
                            <TableCell align="right"> Category<AiIcons.AiOutlineArrowDown/> </TableCell>
                            <TableCell align="right"> Price<AiIcons.AiOutlineArrowDown/> </TableCell>
                            <TableCell align="right"> Date<AiIcons.AiOutlineArrowDown/> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map(row => (
                            <TableRow key={Math.random()}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.price}₪</TableCell>
                                <TableCell align="right">{new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(row.date))} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Todo: Figure out why expenses won't render on time. */}
            {/* Todo: Figure out why it sorts with categories */}
            {/*{totalExpense}*/}
            {/*<table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Category</th>*/}
            {/*        <th>Price</th>*/}
            {/*        <th>Purchase date</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}

            {/*    {expenses.map(expense => {*/}
            {/*        return (*/}
            {/*            <tbody key={Math.random()}>*/}
            {/*            <tr>*/}
            {/*                <td> {expense.name} </td>*/}
            {/*                <td> {expense.category.name} </td>*/}
            {/*                <td> {expense.price} </td>*/}
            {/*                <td> {new Intl.DateTimeFormat("en-GB", {*/}
            {/*                    year: "numeric",*/}
            {/*                    month: "long",*/}
            {/*                    day: "2-digit"*/}
            {/*                }).format(new Date(expense.date))} </td>*/}
            {/*            </tr>*/}
            {/*            </tbody>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</table>*/}


        </Container>
    );
};

export default DataTable;