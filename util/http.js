import axios from "axios";

const URL = "https://react-native-course-cc283-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(URL + "/expenses.json", expenseData);
  const id = response.data.name; //to get auntogenrated id from firebase
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return axios.delete(URL + `/expenses/${id}.json`);
};
