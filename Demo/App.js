import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignIn from "./screens/SignIn";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SaveVehical from "./screens/SaveVehical";
import TempSearch from "./screens/TempSearch";
import MoreDetails from "./screens/MoreDetails";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TempSearch" component={TempSearch} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SaveVehical" component={SaveVehical} />
        <Stack.Screen name="MoreDetails" component={MoreDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
