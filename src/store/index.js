import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from './authSlice';
import {expenseSlice} from './expensesSlice';
import { csvExportSLice } from './CSVExportSlice';
import { premiumSlice } from './PremiumSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expenses:expenseSlice.reducer,
        premium:premiumSlice.reducer,
        csv:csvExportSLice.reducer,
    },
});

export default store;