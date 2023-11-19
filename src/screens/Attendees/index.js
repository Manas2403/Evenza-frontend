import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ApprovalCard from "../../components/ApprovalCard";
import { getApprovals } from "../../utils/Api";
export default function RequestManagement({ navigation, route }) {
    const [approvals, setApprovals] = useState(null);
    const getApproval = async () => {
        const eventId = route.params.id;
        const approvals = await getApprovals(eventId);
        setApprovals(approvals);
        console.log(approvals);
    };
    useEffect(() => {
        getApproval();
    }, []);
    return (
        <>
            <ScrollView>
                <View className="p-4 flex flex-col ">
                    <View className="flex flex-col gap-4">
                        {approvals?.map(
                            (approval) =>
                                approval.status === "pending" && (
                                    <ApprovalCard
                                        key={approval._id}
                                        event={approval.event}
                                        user={approval.user}
                                    />
                                )
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
