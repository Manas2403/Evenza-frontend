import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as React from "react";
import { Searchbar, Button } from "react-native-paper";
import AdminEventCard from "../../components/AdminEventCard";
import ApprovalCard from "../../components/ApprovalCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllEvents, getUserDetails } from "../../utils/Api";
import QRScanner from "../../components/QRScanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search for conferences"
            onChangeText={onChangeSearch}
            value={searchQuery}
            className="bg-gray-50 border-2 text-sm text-gray-100 border-purple-600  rounded-2xl"
        />
    );
};

const AdminHome = ({ navigation }) => {
    const [events, setEvents] = useState(null);
    const getEvents = async () => {
        const event = await getAllEvents();
        console.log(event.events);
        setEvents(event.events);
    };
    const email=AsyncStorage.getItem("email")
    useEffect(() => {
        getEvents()
    }, []);
    console.log(events)
    return (
        <ScrollView>
            <View className="p-4">
                <SearchBar />
            </View>
            <View className="flex flex-row gap-x-2 items-center justify-center">
                <Button
                    className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                    onPress={() => {
                        navigation.navigate("CreateEvent",{email:email});
                    }}
                >
                    Create Event
                </Button>
                <Button
                    className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                    onPress={() => {
                        navigation.navigate("YourEvents");
                    }}
                >
                    Past Events
                </Button>
                <Button
                    className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                    onPress={() => {
                        navigation.navigate("QRScanner");
                    }}
                >
                    Scan QR
                </Button>
            </View>
            <View className="px-4">
                {events &&
                    events.map((event) => (
                        <AdminEventCard
                            id={event._id}
                            title={event.title}
                            date={event.startDate}
                            venue={event.location}
                            img={event.url}
                            registered={true}
                            registerationCount={event.capacity}
                            onClick={() => {
                                navigation.navigate("EventDetails",{id:event._id});
                            }}
                            navigate={navigation.navigate}
                            isRegister={false}
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default AdminHome;
