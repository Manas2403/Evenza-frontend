import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/EvilIcons";
import moment from "moment";
// import { Document, Page } from "@react-pdf/renderer";
import { BlobUtil, RNFetchBlob } from "react-native-blob-util";
import DownloadPdf from "../../components/DownloadPdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { getEvent } from "../../utils/Api";
export default function EventDetails({ route, navigation }) {
    const { id } = route.params;
    const [event, setEvent] = useState(null);
    const [activities, setActivities] = useState(null);
    async function getEventDetails() {
        const { event, activities } = await getEvent(id);
        setEvent(event);
        setActivities(activities);
    }
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "ID Card",
        },
    ];
    useEffect(() => {
        getEventDetails();
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

    const html = `
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
        <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        Hello Expo!
        </h1>
        <img
        src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
        style="width: 90vw;" />
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
                                <View>
                                    <Item title={item.title} />
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
                        <Button className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 ">
                            Register
                        </Button>
                        <Button
                            className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                            onPress={printToFile}
                        >
                            Download ID-Card
                        </Button>
                        <Button
                            className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                            onPress={() => {
                                return navigation.navigate(
                                    "Request Management"
                                );
                            }}
                        >
                            Approve Requests
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
