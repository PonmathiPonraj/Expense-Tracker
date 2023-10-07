import React, { useEffect, useState, useRef,useCallback } from 'react';
import Premium from './Premium';
import { useSelector, useDispatch } from 'react-redux';
import { expenseAction } from '../store/expensesSlice';
import axios from 'axios';
//import { premiumActions } from '../store/PremiumSlice';

const ExpensesForm = () => {
    const isAuth = useSelector(state => state.auth);
    const token = isAuth.token;
    const dispatch = useDispatch();
    const enteredAmount = useRef();
    const enteredDescription = useRef();
    const [category, setCategory] = useState(null);
    const handleCategorySelect = (category) => {
        setCategory(category);
    }

    const [expenseList, setExpenseList] = useState([]);
    let totalAmount = 0;
    expenseList.forEach((element) => {
        totalAmount += parseInt(element.amount);
    });
    console.log(totalAmount);
    function convertDataToCSV(data) {
        const csvRows = [];
        for (const item of data) {
            const values = Object.values(item);
            const row = values.map(value => `"${value}"`).join(",");
            csvRows.push(row);
        }
        return csvRows.join("\n");
    }
    const handleExportCSV = () => {
        const csvData = convertDataToCSV(expenseList);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
    }
    const email2 = localStorage.getItem('email');
    const email = email2.replace('@', '').replace('.', '');
    const [editingExpenseId, setEditingExpenseId] = useState();
    const startEditing = (expenseId) => {
        setEditingExpenseId(expenseId);
    };
    const cancelEditing = () => {
        setEditingExpenseId(null);
    };
    const firebaseUrl = "https://expense-tracker-3bd1f-default-rtdb.firebaseio.com/";
    const submitHandler = async (event) => {
        event.preventDefault();
        const amount = enteredAmount.current.value;
        const description = enteredDescription.current.value;
        const expenseData = {
            amount: amount,
            description: description,
            category: category,
            email: email,
        }
        try {
            const response = await axios.post(
                `${firebaseUrl}/expenses/${email}.json?auth=${token}`,
                expenseData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.status === 200 || response.status === 201) {
                console.log(response.data);
                fetchExpenses();
            } 
            else {
                console.log('error in post');
                throw new Error('something went wrong');
            }
        } 
        catch (error) {
            console.log(error);
            alert(error);
        }
        enteredAmount.current.value = '0';
        enteredDescription.current.value = '';
    }
    const fetchExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${firebaseUrl}/expenses/${email}.json?auth=${token}`);
            const expensesData = response.data;
            console.log(expensesData)
            if (expensesData) {
                const expenses = Object.keys(expensesData).map((key) => ({
                    id: key,
                    ...expensesData[key],
                }));
                dispatch(expenseAction.addExpenses(expenses));
                setExpenseList(expenses);
            }
        } 
        catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }, [dispatch, token, email]);
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);
    const deleteExpenseHandler = async (expenseId) => {
        try {
            console.log('delete button')
            const response = await axios.delete(`${firebaseUrl}/expenses/${email}/${expenseId}.json?auth=${token}`);
            console.log('data deleted ')
            console.log(response)
            fetchExpenses();
        } 
        catch (error) {
            console.log(error)
        }
    }
    const editExpenseHandler = async (expenseId) => {
        const updatedExpense = expenseList.find(expense => expense.id === expenseId);
        const updatedExpenses = expenseList.map(expense => {
            if (expense.id === expenseId) {
                return {
                    ...expense,
                    amount: enteredAmount.current.value,
                    description: enteredDescription.current.value,
                };
            }
            return expense;
        });
        setExpenseList(updatedExpenses);
        const updateExpenseData = {
            amount: enteredAmount.current.value,
            description: enteredDescription.current.value,
            category: updatedExpense.category,
            email: email,
        };
        try {
            const response = await axios.put(
                `${firebaseUrl}/expenses/${email}/${expenseId}.json?auth=${token}`,
                updateExpenseData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            alert('data updated using ')
            console.log(response)
            fetchExpenses();
        } 
        catch (error) {
            alert('some error occurred in put')
            console.log(error)
        }
        enteredAmount.current.value = '0';
        enteredDescription.current.value = '';
        setEditingExpenseId(null);
    }

    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Amount</label>
                        <input
                            required
                            type="number"
                            placeholder="Add amount"
                            defaultValue="0"
                            ref={enteredAmount}
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Description</label>
                        <input
                            required
                            type="text"
                            placeholder="Description"
                            defaultValue="description"
                            ref={enteredDescription}
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Select Expense Category</label>
                        <select className="form-select" onChange={(e) => handleCategorySelect(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="School">School</option>
                        </select>
                    </div>
                </div>
                <button type="submit">Add Expense</button>
            </form>
            <div>
                <h2>Entered Expenses</h2>
                    <ul>
                        {expenseList.map((expense) => (
                            <li key={expense.id}>
                                {editingExpenseId === expense.id ? (
                                    <>
                                        <input
                                            type="number"
                                            defaultValue={expense.amount}
                                            ref={enteredAmount}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={expense.description}
                                            ref={enteredDescription}
                                        />
                                        <button onClick={() => editExpenseHandler(expense.id)}>
                                            Save
                                        </button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        Amount: {expense.amount},
                                        Description: {expense.description},
                                        Category: {expense.category}
                                        <button onClick={() => deleteExpenseHandler(expense.id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => startEditing(expense.id)}>Edit</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                <span>Total Expense:{totalAmount}</span>
            </div>
                {totalAmount >= 10000  && <Premium />}
                <button onClick={handleExportCSV}>Download Expenses</button>
        </div>
    );
};

export default ExpensesForm;