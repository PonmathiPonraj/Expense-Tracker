import React, { useState, useEffect } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = () => {
    const [moneySpent, setMoneySpent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null); // To track which expense is being edited
    const [editedMoneySpent, setEditedMoneySpent] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedCategory, setEditedCategory] = useState('');

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
        const newExpense = {
            moneySpent,
            description,
            category,
        };
        // Send a POST request to add the new expense to the database
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
            return response.json();
        })
        .then(() => {
            setExpenses([...expenses, newExpense]);
            setMoneySpent('');
            setDescription('');
            setCategory('');
        })
        .catch((error) => {
            console.error(error);
        });
    };
  
    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditedMoneySpent(expenses[index].moneySpent);
        setEditedDescription(expenses[index].description);
        setEditedCategory(expenses[index].category);
    };
  
    const handleSaveClick = (index) => {
        const editedExpense = {
            moneySpent: editedMoneySpent,
            description: editedDescription,
            category: editedCategory,
        };
  
        // Make a PUT request to update the edited expense in the database
        fetch(`https://expensetracker-411c3-default-rtdb.firebaseio.com/expenses/${index}.json`, {
            method: 'PUT',
            body: JSON.stringify(editedExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update the expense');
            }
            return response.json();
        })
        .then(() => {
            const updatedExpenses = [...expenses];
            updatedExpenses[index] = editedExpense;
            setExpenses(updatedExpenses);
            setEditingIndex(null);
        })
        .catch((error) => {
            console.error(error);
        });
    };
  
    const handleDeleteClick = (index) => {
        // Make a DELETE request to remove the expense from the database
        fetch(`https://expensetracker-411c3-default-rtdb.firebaseio.com/expenses${index}.json`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete the expense');
            }
            return response.json();
        })
        .then(() => {
            const updatedExpenses = expenses.filter((_, i) => i !== index);
            setExpenses(updatedExpenses);
            console.log('Expense successfully deleted');
        })
        .catch((error) => {
            console.error(error);
        });
    };
  
    useEffect(() => {
        // Fetch expenses data when the component mounts
        fetch('https://expensetracker-411c3-default-rtdb.firebaseio.com/expenses.json').then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            return response.json();
        })
        .then((data) => {
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
        <div className={styles.expenseForm}>
            <h2>Expense Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Money Spent:
                    <input 
                        type="number"
                        value={moneySpent}
                        onChange={handleMoneySpentChange}
                        className={styles.input}  />
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
                <button type="submit" className={styles.button}>
                    Submit
                </button>
            </form>
            <h2>Expenses List</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                {/* Edit mode input fields */}
                                <input
                                    type="number"
                                    value={editedMoneySpent}
                                    onChange={(e) => setEditedMoneySpent(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                                <select
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
                                >
                                {/* Options for categories */}
                                </select>
                                <button onClick={() => handleSaveClick(index)}>Save</button>
                            </>
                        ) : (
                            <>
                                {/* Display expense details */}
                                Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
                                <button onClick={() => handleEditClick(index)}>Edit</button>
                                <button onClick={() => handleDeleteClick(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}	   
            </ul>	    
        </div>
    );
};

export default ExpenseForm;