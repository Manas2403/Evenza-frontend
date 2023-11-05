import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { registerUser } from "../../utils/Api";
import MessagePrompt from "../../components/MessagePrompt";

const RegisterUser = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [institute, setInstitute] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match");
      setShowAlert(true);
      return;
    }

    const userData = {
      name,
      email,
      password,
      phoneNumber,
      institute,
    };

    try {
      const response = await registerUser(userData);
      console.log(response);
      setAlertMessage("User registered successfully");
      setShowAlert(true);
      navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
      setAlertMessage(`Error registering user: ${error.message}`);
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Institute"
        onChangeText={(text) => setInstitute(text)}
      />
      <Button
        mode="outlined"
        className="bg-purple-50 " // Added the style property here
        onPress={handleSignUp} // Removed the extra arrow function
      >
        Create
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
  button: {
    marginTop: 8,
    backgroundColor: "purple",
    color: "white",
    borderRadius: 8,
  },
});

export default RegisterUser;
