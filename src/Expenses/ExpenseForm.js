import React, { useState, useEffect } from 'react';

const ExpenseForm = () => {
    const [moneySpent, setMoneySpent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);

    const handleMoneySpentChange = (event) => {
        setMoneySpent(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (you can send this data to the backend in the next step).
        const newExpense = {
            moneySpent,
            description,
            category,
        };
        // Update the expenses array with the new expense
        setExpenses([...expenses, newExpense]);
        // Clear the form fields
        setMoneySpent('');
        setDescription('');
        setCategory('');
        fetch('https://expensetracker-411c3-default-rtdb.firebaseio.com/expenses.json', {
            method: 'POST',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add the expense');
            }
            // Clear the form fields
            setMoneySpent('');
            setDescription('');
            setCategory('');
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        // Perform a GET request to fetch expenses data when the component mounts
        fetch('https://expensetracker-411c3-default-rtdb.firebaseio.com/expenses.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            return response.json();
        })
        .then((data) => {
            // Process the data as needed and set it in state
            if (data) {
                const expensesArray = Object.values(data);
                setExpenses(expensesArray);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, []); 

    return (
        <div>
            <h2>Expense Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Money Spent:
                    <input type="number" value={moneySpent} onChange={handleMoneySpentChange} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={handleDescriptionChange} />
                </label>
                <br />
                <label>
                    Category:
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        {/* Add more categories as needed */}
                    </select>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <h2>Expenses List</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseForm;