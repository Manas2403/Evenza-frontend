import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { getAllEvents } from "../../utils/Api";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import EventCard from "../../components/EventCard";

const YourEvents = ({ navigation }) => {
    const [events, setEvents] = useState(null);
    const getEvents = async () => {
        const events = await getAllEvents();
        console.log(events.events);
        setEvents(events.events);
    };
    useEffect(() => {
        getEvents();
    }, []);
    return (
        <ScrollView>
            <View className="px-4">
                {events &&
                    events.map((event) => (
                        <EventCard
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
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default YourEvents;
