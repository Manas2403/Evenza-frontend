import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { createSubEvent } from "../../utils/Api";
import MessagePrompt from "../../components/MessagePrompt";
const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 4,
  },
  input: {
    marginBottom: 8,
    margin: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

const CreateSubEvent = ({ route }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    capacity: "",
    event: route.params.eventId,
  });
console.log(eventData)
  const handleInputChange = (text, field) => {
    setEventData({ ...eventData, [field]: text });
  };
  const [message, setMessage] = useState("");
  const [isMessageVisible, setMessageVisible] = useState(false);
 const hideMessage = () => {
   setMessageVisible(false);
 };
  const handleCreate = async () => {
    try {
      const response = await createSubEvent(eventData);
      console.log(response);
      // Show success message
      setMessage("Subevent created successfully");
      setMessageVisible(true);
    } catch (error) {
        console.log(error)        
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          label="title"
          value={eventData.title}
          onChangeText={(text) => handleInputChange(text, "title")}
        />
        <TextInput
          label="Description"
          value={eventData.description}
          onChangeText={(text) => handleInputChange(text, "description")}
        />
        <TextInput
          label="Location"
          value={eventData.location}
          onChangeText={(text) => handleInputChange(text, "location")}
        />
        <TextInput
          label="Capacity"
          keyboardType="numeric"
          value={eventData.capacity}
          onChangeText={(text) => handleInputChange(text, "capacity")}
        />
        <RangeDateInput setEventData={setEventData} eventData={eventData} />
        {/* <SingleDateInput setEventData={setEventData} eventData={eventData} /> */}
        {/* <ImagePickerComponent onSelectImage={handleImageSelection} /> */}
        {/* Add other relevant input fields */}
        <Button
          mode="outlined"
          onPress={handleCreate}
          style={{ marginTop: 16 }}
        >
          Create
        </Button>
        {/* MessagePrompt */}
        <MessagePrompt
          visible={isMessageVisible}
          message={message}
          onClose={hideMessage}
        />
      </View>
    </ScrollView>
  );
};



const RangeDateInput = ({ setEventData, eventData }) => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = ({ startDate, endDate }) => {
    setOpen(false);
    setRange({ startDate, endDate });
    setEventData({ ...eventData, startDate, endDate });
  };

  return (
    <View style={styles.input}>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Select Start and End Dates
      </Button>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
    </View>
  );
};




export default CreateSubEvent;
