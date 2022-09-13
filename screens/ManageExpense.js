import { useLayoutEffect, useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

//components
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverLay from "../components/UI/ErrorOverLay";

//context
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

//http request
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false); //for loading sprinner
  const [error, setError] = useState();

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

  const deleteExpenseHandler = async () => {
    setIsSubmiting(true); //for loading sprinner

    try {
      await deleteExpense(editedExpenseID);
      expenseCtx.deleteExpense(editedExpenseID);
      navigation.goBack(); //navigate to previous screen
    } catch (error) {
      setError("Could not delete expense - please try agin later!");
      setIsSubmiting(false); //for loading sprinner
    }
  };

  const cancleExpenseHandler = () => {
    navigation.goBack(); //navigate to previous screen
  };

  const ConfirmExpenseHandler = async (expenseData) => {
    setIsSubmiting(true); //for loading sprinner

    try {
      if (isEdititng) {
        //1st we update locally and then we update data base then we can optimize the performance
        expenseCtx.updateExpense(editedExpenseID, expenseData);
        await updateExpense(editedExpenseID, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack(); //navigate to previous screen
    } catch (error) {
      setError("Could not save date - please try again later");
      setIsSubmiting(false);
    }
  };

  //for error

  if (error && !isSubmiting) {
    return <ErrorOverLay message={error} />;
  }

  //for loading sprinner

  if (isSubmiting) {
    return <LoadingOverlay />;
  }

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
