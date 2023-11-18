import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as React from "react";
import { Searchbar, Button } from "react-native-paper";
import EventCard from "../../components/EventCard";
import ApprovalCard from "../../components/ApprovalCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllEvents } from "../../utils/Api";
import { BackHandler } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetails } from "../../utils/Api";
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

const Home = ({ navigation }) => {
    
    const [events, setEvents] = useState(null);
    const getEvents = async () => {
        const events = await getAllEvents();
        console.log(events.events);
        setEvents(events.events);
    };
    const [user, setUser] = useState(null);
    
   const getUserDetail = async () => {
     const token = await AsyncStorage.getItem("email");
     const user = await getUserDetails(token);
     console.log(token)
     console.log(user);
     console.log(user.user._id)
     setUser(user);
   };
   useEffect(() => {
     getEvents();
     getUserDetail();
   }, []); 
    return (
        <ScrollView>
            <View className="p-4">
                <SearchBar />
            </View>
            <View className="flex flex-row gap-x-2 items-center justify-center">
                <Button
                    className="w-1/3 font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                    onPress={() => {
                        navigation.navigate("YourEvents");
                    }}
                >
                    Your Events
                </Button>
            </View>
            <View className="px-4">
                {events && user &&
                    events.map((event) => (
                        <EventCard
                            key={event._id}
                            title={event.title}
                            date={event.startDate}
                            venue={event.location}
                            user={user.user._id}
                            event={event._id} 
                            img={event.url}
                            registered={true}
                            registerationCount={event.capacity}
                            onClick={() => {
                                navigation.navigate("EventDetails", {
                                    id: event._id,
                                });
                            }}
                            isRegister={true}
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default Home;
