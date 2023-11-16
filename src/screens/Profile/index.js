import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import QR from "../../components/QR";
import UserData from "../../components/UserData";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserDetails, getUserId } from "../../utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState("");
    async function fetchData() {
        const userToken = await AsyncStorage.getItem("UserToken");
        console.log(userToken);
        const data = await getUserId(userToken);
        console.log(data);
        setUserId(data.id);
        const userData = await getUserDetails(data.id);
        setUserData(userData);
    }
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
