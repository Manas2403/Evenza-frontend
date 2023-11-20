import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ApprovalCard from "../../components/ApprovalCard";
import AttendeeCard from "../../components/AttendeeCard";
import { getAttendees } from "../../utils/Api";
export default function Attendees({ navigation, route }) {
    const [attendees, setAttendees] = useState(null);
    const getApproval = async () => {
        const { eventId, activityId } = route.params;
        const attendee = await getAttendees(eventId, activityId);
        setAttendees(attendee);
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
                        {attendees?.map((attendee) => (
                            <AttendeeCard user={attendee} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
