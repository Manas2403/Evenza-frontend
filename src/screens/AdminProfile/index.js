import { View, Text, ScrollView } from "react-native";
import React from "react";
import AdminData from "../../components/AdminData";
import { SafeAreaView } from "react-native-safe-area-context";
const AdminProfile = () => {
  return (
    <ScrollView>
      <View>
        <AdminData />
      </View>
    </ScrollView>
  );
};

export default AdminProfile;
