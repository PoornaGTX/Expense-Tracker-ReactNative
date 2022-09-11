import { useLayoutEffect } from "react";
import { View, Text } from "react-native";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseID = route.params?.expnseID;

  const isEdititng = !!editedExpenseID; //convert editedExpenseID to boolean
  //isEdititng contain true or false

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdititng ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdititng]);

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  );
};

export default ManageExpense;
