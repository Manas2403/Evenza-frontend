import { useState } from "react";
import { View, Image } from "react-native";
import { Avatar, Button, Card, Text, Portal, Dialog } from "react-native-paper";
import Icon from "react-native-vector-icons/EvilIcons";
import moment from "moment";
const AdminEventCard = (props) => {
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const handleRegisteration = () => {
        hideDialog();
    };
    const utcMoment = moment(props.date);
    const istMoment = utcMoment.add(5, "hours").add(30, "minutes");
    const istTimeString = istMoment.format("YYYY-MM-DD");
    return (
        <>
            <Card className="my-3" onPress={props.onClick}>
                <Card.Cover source={{ uri: props.img }} />
                <View>
                    <Card.Title
                        title={props.title}
                        titleVariant="titleLarge"
                        className="mt-2"
                    />
                </View>
                <Card.Content className="flex-row justify-between items-center w-full my-2">
                    <View className="flex-row justify-between items-center">
                        <Icon name="calendar" size={16} />
                        <Text variant="titleSmall" className="ml-1">
                            {istTimeString}
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Icon name="location" size={16} />
                        <Text variant="titleSmall" className="ml-1">
                            {props.venue}
                        </Text>
                    </View>
                </Card.Content>

                <Card.Actions className="flex-col justify-evenly pr-5 items-center my-2">
                    <View className="flex-row justify-right">
                        <Button
                            className="w-1/2 m-2 font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
                            onPress={() => {
                                props.navigate("RequestManagement", {
                                    id: props.id,
                                });
                            }}
                        >
                            {props.isRegister
                                ? "Register"
                                : "Approve Registrations"}
                        </Button>
                        <Button
                            className="w-1/2 m-2 font-semibold text-lg  bg-purple-200 border rounded-lg border-purple-400 "
                            mode="outlined"
                            onPress={() =>
                                props.navigate("CreateSubevent", {
                                    eventId: props.id,
                                })
                            }
                        >
                            Create A Subevent
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Confirm Registeration ?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleRegisteration}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
};

export default AdminEventCard;
