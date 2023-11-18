import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Button, Card, Text } from "react-native-paper";
import { approveRegisteration } from "../../utils/Api";
const ApprovalCard = (props) => {
    const handleApproved = async(value) => {
        const user=props.user
        const event=props.event
        const response=await approveRegisteration(event,user,value)
        console.log(response)
    };
    return (
        <>
            <View className="flex flex-row items-center justify-between mb-4 pl-4">
                <View>
                    <Text>{props.name}</Text>
                </View>
                <View className="flex flex-row gap-1 items-center justify-center">
                <Button onPress={()=>{handleApproved(true)}} className="">
                    <Icon name="checkcircle" size={20} color={"green"}  />
                </Button>
                   <Button onPress={()=>{handleApproved(false)}}>
                    <Icon name="closecircle" size={20} color={"red"} />
                   </Button> 
                </View>
            </View>
        </>
    );
};
export default ApprovalCard;
