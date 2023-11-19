import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { getAllEvents, getUserDetails } from "../../utils/Api";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import EventCard from "../../components/EventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
const YourEvents = ({ navigation }) => {
    const [events, setEvents] = useState(null);
    const getEvents = async () => {
        const userEmail = await AsyncStorage.getItem("email");
        const user = await getUserDetails(userEmail);
        console.log(user.user.registered);
        setEvents(user.user.registered);
    };
    useEffect(() => {
        getEvents();
    }, []);
    return (
        <ScrollView>
            <View className="px-4">
                {events &&
                    events.map((event, i) => (
                        <EventCard
                            key={i}
                            title={event.title}
                            date={event.startDate}
                            venue={event.location}
                            img={event.url}
                            registered={true}
                            registerationCount={event.capacity}
                            onClick={() => {
                                navigation.navigate("EventDetails", {
                                    id: event._id,
                                });
                            }}
                            status="approved"
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default YourEvents;
