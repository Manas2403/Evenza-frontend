import { View, Text, ScrollView } from "react-native";
import React from "react";
import QR from "../../components/QR";
import UserData from "../../components/UserData";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
    return (
        <ScrollView>
            <View>
                <QR />
                <UserData />
            </View>
        </ScrollView>
    );
};

export default Profile;
