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
        const email = await AsyncStorage.getItem("email");

        const event = await getAllEvents(email);
        setEvents(event);
    };
    const email = AsyncStorage.getItem("email");
    useEffect(() => {
        getEvents();
    }, []);
    return (
        <ScrollView>
            <View className="p-4">
                <SearchBar />
            </View>
            <View className="flex flex-row gap-x-2 items-center justify-center">
                <Button
                    className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                    onPress={() => {
                        navigation.navigate("CreateEvent", { email: email });
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
            </View>
            <View className="px-4">
                {events &&
                    events.map((obj) => (
                        <AdminEventCard
                            id={obj.event._id}
                            title={obj.event.title}
                            date={obj.event.startDate}
                            venue={obj.event.location}
                            img={obj.event.url}
                            registered={true}
                            registerationCount={obj.event.capacity}
                            onClick={() => {
                                navigation.navigate("EventDetails", {
                                    id: obj.event._id,
                                });
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
