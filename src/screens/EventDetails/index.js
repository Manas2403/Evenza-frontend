import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/EvilIcons";
import moment from "moment";
// import { Document, Page } from "@react-pdf/renderer";
import { BlobUtil, RNFetchBlob } from "react-native-blob-util";
import DownloadPdf from "../../components/DownloadPdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { getEvent, getUserDetails } from "../../utils/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
export default function EventDetails({ route, navigation }) {
    const viewRef = useRef(null);
    const { id, userId } = route.params;
    const [event, setEvent] = useState(null);
    const [activities, setActivities] = useState(null);
    const [user, setUser] = useState(null),
        [status, setStatus] = useState(null);
    async function getEventDetails() {
        const { currentEvent, activities } = await getEvent(id);
        setEvent(currentEvent);
        setActivities(activities);
        const token = await AsyncStorage.getItem("email");
        let user = currentEvent.requests.filter(
            (item) => item.user.email === token
        );
        setStatus(user[0]?.status);
    }
    async function getUserDetail() {
        const token = await AsyncStorage.getItem("email");
        const user = await getUserDetails(token);
        setUser(user.user);
    }
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "ID Card",
        },
    ];
    useEffect(() => {
        getEventDetails();
        getUserDetail();
    }, []);
    const backendEndDate = event?.startDate;

    // Parse the string using the Date object
    const parsedDate = new Date(backendEndDate);

    // Format the date using moment
    const formattedDate = moment(parsedDate).format("MMMM Do YYYY");

    const Item = ({ title }) => (
        <View className="mb-2">
            <Text>{`\u25CF ${title}`}</Text>
        </View>
    );
    const qrCodeToSvgString = async (data, size) => {
        const svgString = await new QRCode({
            value: data ? data : "NA",
            size: size || 100,
            color: "black",
            backgroundColor: "white",
        }).toSVGString();
        return svgString;
    };
    const html = `
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
        <h2 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        ${user?.name}
        </h2>
        <h2 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        ${user?.email}
        </h2>    
    </body>
    </html>
    `;

    const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({ html });
        console.log("File has been saved to:", uri);
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    };

    return (
        <>
            <ScrollView>
                <View className="p-4 flex flex-col gap-4">
                    <View className="flex flex-col">
                        <Text variant="titleLarge" className="mb-2">
                            {event?.title}
                        </Text>
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex-row justify-between items-center">
                                <Icon name="calendar" size={16} />
                                <Text variant="titleSmall" className="ml-1">
                                    {formattedDate}
                                </Text>
                            </View>
                            <Text>{event?.capacity} Registerations</Text>
                        </View>
                    </View>
                    <Divider />
                    <View>
                        <Text variant="bodySmall">{event?.description}</Text>
                    </View>
                    <Divider />
                    <View className="flex flex-col">
                        <Text variant="titleLarge" className="mb-2">
                            Inclusions
                        </Text>
                        <FlatList
                            data={activities}
                            renderItem={({ item }) => (
                                <View className="flex flex-row justify-between m-2 items-center">
                                    <Item title={item.title} />
                                    <View className="flex flex-row justify-center items-center ">
                                        {user?.isAdmin && (
                                            <Button
                                                className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 mr-4 "
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "QRScanner"
                                                    );
                                                }}
                                            >
                                                Scan QR
                                            </Button>
                                        )}
                                        {user?.isAdmin && (
                                            <Button
                                                className="font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "Attendees"
                                                    );
                                                }}
                                            >
                                                Attendees
                                            </Button>
                                        )}
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <Divider />
                    <View>
                        <Text variant="titleLarge">Where ?</Text>
                        <Text variant="bodySmall">{event?.location}</Text>
                    </View>
                    <View className="flex flex-col gap-y-2  justify-center items-center">
                        {!user?.isAdmin && (
                            <Button
                                className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                                disabled={status === "none" ? false : true}
                            >
                                {status === "none"
                                    ? "Register"
                                    : status === "pending"
                                    ? "Pending"
                                    : status === "approved"
                                    ? "Approved"
                                    : "Declined"}
                            </Button>
                        )}
                        {!user?.isAdmin && (
                            <Button
                                className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                                onPress={printToFile}
                            >
                                Download ID-Card
                            </Button>
                        )}
                        {user?.isAdmin && (
                            <Button
                                className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                                onPress={() => {
                                    return navigation.navigate(
                                        "RequestManagement",
                                        { id: event._id }
                                    );
                                }}
                            >
                                Approve Requests
                            </Button>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
