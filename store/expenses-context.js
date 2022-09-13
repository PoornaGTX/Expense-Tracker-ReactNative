import { createContext, useState, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  if (action.type === "ADD") {
    return [...state, action.payload];
  }
  if (action.type === "UPDATE") {
    const updatableExpenseIndex = state.findIndex(
      (expense) => expense.id === action.payload.id
    );
    //access intndex in state array state[updatableExpenseIndex]
    const updatableExpense = state[updatableExpenseIndex];
    const updateItem = { ...updatableExpense, ...action.payload.data };
    const updatedExpenses = [...state];
    updatedExpenses[updatableExpenseIndex] = updateItem;
    return updatedExpenses;
  }

  if (action.type === "DELETE") {
    return state.filter((expense) => expense.id !== action.payload);
  }

  if (action.type === "SET") {
    const inverted = action.payload.reverse(); //to maintain order its mean new expense will come to first
    return inverted;
  }

  throw new Error(`no such action : ${action.type}`);
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpenseMethod = (expenseDate) => {
    dispatch({ type: "ADD", payload: expenseDate });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const updateExpenseMethod = (id, expenseDate) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseDate } });
  };

  const deleteExpenseMethod = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpenseMethod,
    setExpenses: setExpenses,
    updateExpense: updateExpenseMethod,
    deleteExpense: deleteExpenseMethod,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
