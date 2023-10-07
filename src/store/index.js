import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from './authSlice';
import {expenseSlice} from './expensesSlice';
import { csvExportSLice } from './CSVExportSlice';
import { premiumSlice } from './PremiumSlice';
import { darkModeSlice } from './DarkModeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expenses:expenseSlice.reducer,
        premium:premiumSlice.reducer,
        csv:csvExportSLice.reducer,
        darkMode:darkModeSlice.reducer,
    },
});

export default store;