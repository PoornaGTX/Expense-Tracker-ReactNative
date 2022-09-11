import { View, FlatList, StyleSheet } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummery from "./ExpensesSummery";

import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
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
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Some bananas",
    amount: 59.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e7",
    description: "A book",
    amount: 14.99,
    date: new Date("2021-02-19"),
  },
  {
    id: "e8",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummery expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
