import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAllEvents } from "../../utils/Api";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import EventCard from "../../components/EventCard";

const AdminEvents = ({ navigation }) => {
    const [events, setEvents] = useState(null);
    const getEvents = async () => {
        const events = await getAllEvents();
        setEvents(events.events);
    };
    useEffect(() => {
        getEvents();
    }, []);
    return (
        <View>
            <View className="px-4">
                {events &&
                    events.map((event) => (
                        <EventCard
                            title={event.title}
                            date={event.startDate}
                            venue={event.location}
                            img={{ uri: event.image }}
                            registered={true}
                            registerationCount={event.capacity}
                            onClick={() => {
                                navigation.navigate("EventDetails");
                            }}
                        />
                    ))}
            </View>
        </View>
    );
};

export default AdminEvents;
