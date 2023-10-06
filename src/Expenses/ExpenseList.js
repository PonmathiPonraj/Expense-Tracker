import React from 'react';

const ExpenseList = ({
    expenses,
    editingIndex,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    editedMoneySpent,
    setEditedMoneySpent,
    editedDescription,
    setEditedDescription,
    editedCategory,
    setEditedCategory,
}) => {
    return (
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
    );
};

export default ExpenseList;