import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as React from "react";
import { Searchbar, Button } from "react-native-paper";
import AdminEventCard from "../../components/AdminEventCard";
import ApprovalCard from "../../components/ApprovalCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllEvents } from "../../utils/Api";
import QRScanner from "../../components/QRScanner";

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
    const events = await getAllEvents();
    console.log(events.events);
    setEvents(events.events);
  };
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
            navigation.navigate("CreateEvent");
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
              img={{ uri: event.image }}
              registered={true}
              registerationCount={event.capacity}
              onClick={() => {
                navigation.navigate("EventDetails");
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
