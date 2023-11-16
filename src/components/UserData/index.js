import { View, Text, Image } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";
import React, { useState } from "react";
import HorizontalLine from "../Horizontal Line";
import Icon from "react-native-vector-icons/AntDesign";

const UserData = ({ userData }) => {
    console.log(userData);
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
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
                        <Text className="text-gray-600 ">Participated</Text>
                        <Text className="text-gray-600 ">5</Text>
                    </View>
                    <View className="flex flex-row justify-between px-8 mt-4">
                        <Text className="text-gray-600 ">Registered</Text>
                        <Text className="text-gray-600 ">6</Text>
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
                        <Button>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default UserData;
