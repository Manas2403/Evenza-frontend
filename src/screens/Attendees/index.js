import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ApprovalCard from "../../components/ApprovalCard";
import { getAttendees } from "../../utils/Api";
export default function RequestManagement({ navigation, route }) {
    const [attendees, setAttendees] = useState(null);
    const getApproval = async () => {
        const {eventId,activityId }= route.params;
        const attendee = await getAttendees(eventId,activityId);
        setApprovals(attendee);
        console.log(attendee);
    };
    useEffect(() => {
        getApproval();
    }, []);
    return (
        <>
            <ScrollView>
                <View className="p-4 flex flex-col ">
                    <View className="flex flex-col gap-4">
                        {/* {approvals?.map(
                            (approval) =>
                                approval.status === "pending" && (
                                    <ApprovalCard
                                        key={approval._id}
                                        event={approval.event}
                                        user={approval.user}
                                    />
                                )
                        )} */}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
