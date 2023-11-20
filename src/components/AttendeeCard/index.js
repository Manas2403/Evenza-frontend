import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button, Card, Text } from "react-native-paper";
import { approveRegisteration } from "../../utils/Api";
const AttendeeCard = ({ user }) => {
    return (
        <>
            <View className="flex flex-row items-center justify-between mb-4 pl-4 mt-2">
                <View>
                    <Text>{user.email}</Text>
                </View>
                <View className="flex flex-row gap-1 items-center justify-center"></View>
            </View>
        </>
    );
};
export default AttendeeCard;
