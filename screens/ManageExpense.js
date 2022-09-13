import { useLayoutEffect, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";

//components
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

//context
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseID = route.params?.expnseID;

  const selecetedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseID
  );

  const isEdititng = !!editedExpenseID; //convert editedExpenseID to boolean
  //isEdititng contain true or false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdititng ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdititng]);

  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(editedExpenseID);
    navigation.goBack(); //navigate to previous screen
  };

  const cancleExpenseHandler = () => {
    navigation.goBack(); //navigate to previous screen
  };

  const ConfirmExpenseHandler = (expenseData) => {
    if (isEdititng) {
      expenseCtx.updateExpense(editedExpenseID, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack(); //navigate to previous screen
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEdititng ? "Update" : "Add"}
        onCancle={cancleExpenseHandler}
        onSubmit={ConfirmExpenseHandler}
        defualtValuesExpense={selecetedExpense}
      />

      {isEdititng && (
        <View style={styles.deleteConatiner}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteConatiner: {
    margin: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center", //left to right
  },
});
