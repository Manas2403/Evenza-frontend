import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Card, Text } from "react-native-paper";
const ApprovalCard = () => {
    return (
        <>
            <View className="flex flex-row items-center justify-between mb-4">
                <View>
                    <Text>Manas Gupta</Text>
                </View>
                <View className="flex flex-row gap-1 items-center">
                    <Icon name="checkcircle" size={24} color={"green"} />
                    <Icon name="closecircle" size={24} color={"red"} />
                </View>
            </View>
        </>
    );
};
export default ApprovalCard;
