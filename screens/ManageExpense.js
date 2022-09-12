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
  const editedExpenseID = route.params?.expnseID;

  const isEdititng = !!editedExpenseID; //convert editedExpenseID to boolean
  //isEdititng contain true or false

  const expenseCtx = useContext(ExpensesContext);

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

  const ConfirmExpenseHandler = () => {
    if (isEdititng) {
      expenseCtx.updateExpense(editedExpenseID, {
        description: "!!!!!!Test",
        amount: 19.99,
        date: new Date("2022-09-05"),
      });
    } else {
      expenseCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-09-08"),
      });
    }
    navigation.goBack(); //navigate to previous screen
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode="flat"
          onPress={cancleExpenseHandler}
        >
          Cancle
        </Button>
        <Button style={styles.button} onPress={ConfirmExpenseHandler}>
          {isEdititng ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteConatiner: {
    margin: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center", //left to right
  },
});
