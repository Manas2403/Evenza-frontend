import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, RadioButton, IconButton } from "react-native-paper";
import MessagePrompt from "../../components/MessagePrompt";
import { loginUser } from "../../utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("User");
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const closeAlert = () => {
        setShowAlert(false);
    };

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setAlertMessage("Either email or password is empty");
            setShowAlert(true);
            return;
        }

        // Create a user data object with email and password
        const userData = {
            email,
            password,
        };
         try {
                // Send the user data to the server for verification
                const response = await loginUser(userData);
                console.log(response);
                // If the server responds with a success message, log in the user and navigate to the home screen
                if (response.message === "Login successful") {
                    await AsyncStorage.setItem("UserToken", response.token)
                    await AsyncStorage.setItem("email",response.email);
                    setAlertMessage("User logged in successfully");
                    setShowAlert(true);
                    if(selectedRole==="Admin"){
                        navigation.navigate("AdminHome");
                    }
                    else{
                        navigation.navigate("Home");
                    }
                    
                } else {
                    setAlertMessage("User not found");
                    setShowAlert(true);
                }
            } catch (error) {
                console.log(error);
                setAlertMessage(`Error logging in user: ${error.message}`);
                setShowAlert(true);
            }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            outlined // Add this prop for outlined style
          />
          <IconButton
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          />
        </View>

        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(value) => setSelectedRole(value)}
            value={selectedRole}
          >
            <View style={styles.radioOption}>
              <RadioButton value="User" />
              <Text>User</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="Admin" />
              <Text>Admin</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Button mode="outlined" className="bg-purple-100" onPress={handleLogin}>
          Login
        </Button>
        <MessagePrompt
          visible={showAlert}
          message={alertMessage}
          onClose={closeAlert}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  passwordInput: {
    flex: 1,
    height: 40,
    padding: 8,
  },

  eyeIcon: {
    position: "absolute",
    right: 8,
  },
});

export default SignIn;
