import { View, Text, Image } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import React, { useState } from "react";
import HorizontalLine from "../Horizontal Line";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessagePrompt from "../MessagePrompt";

const UserData = ({ userData }) => {
    const navigation = useNavigation();
    function handleSignout() {
        AsyncStorage.removeItem("UserToken");
        navigation.navigate("SignIn");
    }
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const closeAlert = () => {
        setShowAlert(false);
    };
    return (
        <>
            <View className="mt-2 pb-8">
                <HorizontalLine />
                <View>
                    <View className="flex flex-row justify-between px-6 mt-4">
                        <Text className="text-gray-600 font-bold">
                            Personal Information
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Name</Text>
                        <Text className="text-gray-600 ">{userData.name}</Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Email</Text>
                        <Text className="text-gray-600 ">{userData.email}</Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Phone</Text>
                        <Text className="text-gray-600 ">
                            {userData.phoneNumber}
                        </Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Institution</Text>
                        <Text className="text-gray-600 ">
                            {userData.institute}
                        </Text>
                    </View>
                </View>
                <HorizontalLine />
                <View>
                    <View className="flex flex-row justify-between px-6 mt-4">
                        <Text className="text-gray-600 font-bold">
                            Events Information
                        </Text>
                    </View>

                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Registered</Text>
                        <Text className="text-gray-600 ">
                            {userData?.registered?.length}
                        </Text>
                    </View>
                </View>
                <HorizontalLine />
                <View>
                    <View
                        className="flex flex-row items-center justify-between px-8 mt-4"
                        onStartShouldSetResponder={showDialog}
                    >
                        <Text className="text-gray-600 ">Sign Out</Text>
                        <Icon name="logout" size={16} />
                    </View>
                </View>
            </View>
            <HorizontalLine />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure you want to Logout ?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleSignout}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default UserData;
