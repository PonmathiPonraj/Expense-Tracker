import React, { useState } from 'react';

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
    };

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