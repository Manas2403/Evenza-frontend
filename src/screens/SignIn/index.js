// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Your login logic here
//     // Example: Check if the email and password match the user in your database
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={(text) => setEmail(text)}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry
//       />
//       <Button mode="outlined" className="mt-8 bg-purple-100 text-white rounded" onPress={handleLogin}>
//             Login
//           </Button>
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
  
// });

// export default SignIn;



import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('User');

  const handleLogin = () => {
    // Your login logic here
    // Example: Check if the email and password match the user in your database
    if (selectedRole === 'Admin') {
      // Handle Admin login
    } else {
      // Handle User login
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.radioContainer}>
        {/* <Text>Select Role:</Text> */}
        <RadioButton.Group onValueChange={(value) => setSelectedRole(value)} value={selectedRole}>
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
      <Button mode="outlined" className="mt-8 bg-purple-100 text-white " onPress={handleLogin}>
            Login
       </Button>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
 
});

export default SignIn;
