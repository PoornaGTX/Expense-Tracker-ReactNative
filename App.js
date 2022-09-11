import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//components
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpense from "./screens/RecentExpense";

//styles
import { GlobalStyles } from "./constants/styles";

//icons
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white", //font color
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 }, //bottom navigation background color,
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpense}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ManageExpenseOverView"
            component={ExpensesOverView}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
