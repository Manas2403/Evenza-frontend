import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";

function ApproveRegistration() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch user registrations from your server or API and update the state
    // Example:
    // fetchRegistrations().then(data => setRegistrations(data));
  }, []);

  const handleApprove = (registrationId) => {
    // Handle approval logic, e.g., update the status on the server
  };

  const handleDisapprove = (registrationId) => {
    // Handle disapproval logic, e.g., update the status on the server
  };

  return (
    <View>
      <FlatList
        data={registrations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <TouchableOpacity onPress={() => handleApprove(item.id)}>
              <Text>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDisapprove(item.id)}>
              <Text>Disapprove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default ApproveRegistration;
