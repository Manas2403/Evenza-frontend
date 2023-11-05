import { View, Text, ScrollView } from "react-native";
import React from "react";
import QR from "../../components/QR";
import UserData from "../../components/UserData";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserDetails,getUserId } from "../../utils/Api";
const Profile = () => {
    const userToken=localStorage.getItem('UserToken');
    const [userData,setUserData]=useState({});
    const [userId,setUserId]=useState('');
    async function fetchData(){
        const data = await getUserId(userToken);
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
