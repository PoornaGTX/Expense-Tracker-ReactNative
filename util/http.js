import axios from "axios";

export const storeExpense = (expenseData) => {
  axios.post(
    "https://react-native-course-cc283-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
};
