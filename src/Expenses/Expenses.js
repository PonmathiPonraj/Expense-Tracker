import React from 'react';
import ExpensesForm from './ExpenseForm';
import UpdateDetail from '../UpdateDetail/UpdateDetail';

const Expenses = () => {
    return (
        <div>
            <UpdateDetail />
            <ExpensesForm />
        </div>
    );
};

export default Expenses;