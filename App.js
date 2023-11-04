import { StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import Profile from "./src/screens/Profile";
import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import EventDetails from "./src/screens/EventDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";
import { navigationRef } from "./src/utils/NavigationRef.js";
import Header from "./src/components/Header";
import QRScanner from "./src/components/QRScanner";
import CreateEvent from "./src/screens/CreateEvent";
import RequestManagement from "./src/screens/RequestManagement";
import AdminHome from "./src/screens/AdminHome";
import YourEvents from "./src/screens/YourEvents";
import AdminEvents from "./src/screens/AdminEvents";
import AdminProfile from "./src/screens/AdminProfile";
import RegisterUser from "./src/screens/RegisterUser";
const Stack = createNativeStackNavigator();
export default function App() {
    let [firstScreen, setFirstScreen] = useState("Register");
    const startUp = async () => {};
    useEffect(() => {
        startUp();
    });
    return (
      <PaperProvider>
        <StatusBar backgroundColor={"#4f378b"} barStyle="default" />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={firstScreen}
            screenOptions={{
              header: (props) => <Header {...props} />,
            }}
          >
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
              //   options={{ headerShown: false }}
            />
            <Stack.Screen name="QRScanner" component={QRScanner} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="YourEvents" component={YourEvents} />
            <Stack.Screen name="AdminEvents" component={AdminEvents} />
            <Stack.Screen name="RegisterUser" component={RegisterUser} />
            <Stack.Screen name="AdminProfile" component={AdminProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
}
//   Google Certificate Fingerprint:     53:04:CC:AE:FD:FC:23:6C:8A:EC:67:5D:17:83:88:F7:18:36:43:4F
//     Google Certificate Hash (SHA-1):    5304CCAEFDFC236C8AEC675D178388F71836434F
//     Google Certificate Hash (SHA-256):  5B864CE45C80ACB7D793FD8DF6E2F7CB4305C5F845842159F17DC2A2632E1312
//     Facebook Key Hash:                  UwTMrv38I2yK7GddF4OI9xg2Q08=
