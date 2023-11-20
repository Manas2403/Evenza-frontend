import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import QR from "../../components/QR";
import UserData from "../../components/UserData";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserDetails, getUserId } from "../../utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState("");
    async function fetchData() {
        const userEmail = await AsyncStorage.getItem("email");
        const data = await getUserDetails(userEmail);
        setUserData(data.user);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <ScrollView>
            <View>
                <QR qr={userData.email} />
                <UserData userData={userData} />
            </View>
        </ScrollView>
    );
};

export default Profile;
