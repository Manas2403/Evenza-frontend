import { View, ScrollView, FlatList, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/EvilIcons";
// import { Document, Page } from "@react-pdf/renderer";
import { BlobUtil, RNFetchBlob } from "react-native-blob-util";
import DownloadPdf from "../../components/DownloadPdf";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { getEvent } from "../../utils/Api";
export default function EventDetails({ route, navigation }) {
    const { id } = route.params;
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "Visit the Acropolic and spend time with the locals",
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Take pictures with the locals and enjoy the food",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Begin your venture into the city of Athens",
        },
    ];
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
                            IEEE Conference
                        </Text>
                        <View className="flex flex-row justify-between items-center">
                            <View className="flex-row justify-between items-center">
                                <Icon name="calendar" size={16} />
                                <Text variant="titleSmall" className="ml-1">
                                    3rd-6th Oct
                                </Text>
                            </View>
                            <Text variant="titleSmall">
                                1200+ registerations
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <View>
                        <Text variant="bodySmall">
                            The IEEE International Conference on Advanced
                            Technologies is a premier global gathering that
                            brings together leading researchers, innovators,
                            engineers, and professionals from various fields to
                            explore, discuss, and advance the latest
                            advancements in technology and engineering.
                            Organized annually by the Institute of Electrical
                            and Electronics Engineers (IEEE), this conference
                            serves as a focal point for sharing knowledge,
                            fostering collaboration, and shaping the future of
                            technology.
                        </Text>
                    </View>
                    <Divider />
                    <View className="flex flex-col">
                        <Text variant="titleLarge" className="mb-2">
                            Inclusions
                        </Text>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                                <Item title={item.title} />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <Divider />
                    <View>
                        <Text variant="titleLarge">Where ?</Text>
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
