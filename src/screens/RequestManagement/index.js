import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ApprovalCard from "../../components/ApprovalCard";
export default function RequestManagement({ navigation }) {
    return (
        <>
            <ScrollView>
                <View className="p-4 flex flex-col ">
                    <ApprovalCard />
                    <ApprovalCard />
                </View>
            </ScrollView>
        </>
    );
}
