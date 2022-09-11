import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseID = route.params?.expnseID;

  const isEdititng = !!editedExpenseID; //convert editedExpenseID to boolean
  //isEdititng contain true or false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdititng ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdititng]);

  const deleteExpenseHandler = () => {
    navigation.goBack(); //navigate to previous screen
  };

  const cancleExpenseHandler = () => {
    navigation.goBack(); //navigate to previous screen
  };

  const ConfirmExpenseHandler = () => {
    navigation.goBack(); //navigate to previous screen
  };

  return (
    <View style={styles.container}>
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
