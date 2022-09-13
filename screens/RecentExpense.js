import { useContext, useState, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverLay from "../components/UI/ErrorOverLay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

//http request
import { getExpenses } from "../util/http";

const RecentExpense = () => {
  const [isFetching, setIsFetching] = useState(true); //for loading sprinner
  const [error, setError] = useState(); //for any error

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    //we add seperate funcation because we cant use directlt asyns await to this  getExpenses() beacuse useEffect() not accept that
    const getExpensesData = async () => {
      setIsFetching(true); //for loading sprinner

      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false); //for loading sprinner
    };
    getExpensesData();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverLay message={error} />;
  }

  //for loading sprinner

  if (isFetching) {
    return <LoadingOverlay />;
  }

  //useEffect eken setExpenses() karama DB eken ana ewa recentExpenses aya fetch karana nisa
  //data hamathisseama update wenwa

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No Expenses registred for the last 7 days."
    />
  );
};

export default RecentExpense;
