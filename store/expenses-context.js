import { createContext, useState, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes lk",
    amount: 59.99,
    date: new Date("2022-09-05"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 59.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2021-02-19"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  if (action.type === "ADD") {
    const id = new Date().toString() + Math.random().toString();
    return [...state, { ...action.payload, id: id }];
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

  throw new Error(`no such action : ${action.type}`);
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpenseMethod = (expenseDate) => {
    dispatch({ type: "ADD", payload: expenseDate });
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
