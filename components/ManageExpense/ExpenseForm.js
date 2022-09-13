import { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import Input from "./Input";

const ExpenseForm = ({
  submitButtonLabel,
  onCancle,
  onSubmit,
  defualtValuesExpense,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defualtValuesExpense ? defualtValuesExpense.amount.toString() : "",
      isValid: true, //!!defualtValuesExpense return true or false
    },
    date: {
      value: defualtValuesExpense
        ? defualtValuesExpense.date.toISOString().slice(0, 10) //toISOString is used to get YYYY-MM-DD this kind of format and slice is used to get first 10 characters
        : "",
      isValid: true, //!!defualtValuesExpense return true or false
    },
    description: {
      value: defualtValuesExpense ? defualtValuesExpense.description : "",
      isValid: true, //!!defualtValuesExpense return true or false
    },
  });

  const inputChangeHandler = (inputIdentifier, enterdValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enterdValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value /*+ damme number ekata convert karanna*/,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0; // !isNaN number ekak newi
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"; //the reson is if date is invalid type new Date("hello") ==> this will be return "Invalid Date"
    const descriptionIsValid = expenseData.description.trim().length > 0; //trim() is used to remove the space in the String

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid || //true nam false false nam true
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"), //bind the inputIdentifier as "amount" becuse in the state we have define it as "amount"
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //autoCaptitalize:'words',
          //autoCorrect: false, default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
