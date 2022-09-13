import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({
  submitButtonLabel,
  onCancle,
  onSubmit,
  defualtValuesExpense,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defualtValuesExpense ? defualtValuesExpense.amount.toString() : "",
    date: defualtValuesExpense
      ? defualtValuesExpense.date.toISOString().slice(0, 10) //toISOString is used to get YYYY-MM-DD this kind of format and slice is used to get first 10 characters
      : "",
    description: defualtValuesExpense ? defualtValuesExpense.description : "",
  });

  const inputChangeHandler = (inputIdentifier, enterdValue) => {
    setInputValues((currentIputValues) => {
      return {
        ...currentIputValues,
        [inputIdentifier]: enterdValue,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount /*+ damme number ekata convert karanna*/,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"), //bind the inputIdentifier as "amount" becuse in the state we have define it as "amount"
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //autoCaptitalize:'words',
          //autoCorrect: false, default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancle}>
          Cancle
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
});
