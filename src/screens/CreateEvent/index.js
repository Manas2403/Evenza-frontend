import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { createEvent } from "../../utils/Api";
const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin:4
  },
  input: {
    marginBottom: 8,
    margin:8
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

const CreateEvent = ({route}) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "", 
    startDate: "",
    endDate: "",
    regDeadline: "",
    capacity: "",
    regFee: "", // Changed from "price" to "regFee"
    image: "",
  });
console.log(eventData)
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelection = (imageUri) => {
    setSelectedImage(imageUri);
    setEventData({ ...eventData, image: imageUri });
  };

  const handleInputChange = (text) => {
    // Validate input to allow only numbers
    const numericInput = text.replace(/[^0-9]/g, "");
    setEventData({ ...eventData, capacity: numericInput });
  };

   const handleCreate = async () => {
     try {
       const formData = new FormData();
       formData.append("title", eventData.title);
       formData.append("description", eventData.description);
       formData.append("location", eventData.location);
       formData.append("startDate", eventData.startDate.toString());
       formData.append("endDate", eventData.endDate.toString());
       formData.append("regDeadline", eventData.regDeadline.toString());
       formData.append("capacity", eventData.capacity);
       formData.append("regFee", eventData.regFee);
       formData.append("email",adminMail)
      console.log(formData)
       if (selectedImage) {
         const fileName = selectedImage.split("/").pop();
         const fileType = fileName.split(".").pop();

         formData.append("image", {
           uri: selectedImage,
           type: `image/${fileType}`,
           name: fileName,
         });
       }

       const response = await createEvent(formData,adminMail);

       console.log("Event created successfully:", response.data);
     } catch (error) {
       console.error("Error creating event:", error.message);
     }
   };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          label="title"
          value={eventData.title}
          onChangeText={(text) => setEventData({ ...eventData, title: text })}
        />
        <TextInput
          label="Description"
          value={eventData.description}
          onChangeText={(text) =>
            setEventData({ ...eventData, description: text })
          }
        />
        <TextInput
          label="Location"
          value={eventData.location}
          onChangeText={(text) =>
            setEventData({ ...eventData, location: text })
          }
        />
        <TextInput
          label="Capacity"
          keyboardType="numeric"
          value={eventData.capacity}
          onChangeText={handleInputChange}
        />
        <MyTextInput
          label="Registration Fee"
          value={eventData.regFee}
          onChangeText={(text) => setEventData({ ...eventData, regFee: text })}
        />
        <RangeDateInput setEventData={setEventData} eventData={eventData} />
        <SingleDateInput setEventData={setEventData} eventData={eventData} />
        <ImagePickerComponent onSelectImage={handleImageSelection} />
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
        <Button
          mode="outlined"
          onPress={handleCreate}
          style={{ marginTop: 16 }}
        >
          Create
        </Button>
      </View>
    </ScrollView>
  );
};

const MyTextInput = ({ label, value, onChangeText }) => (
  <TextInput label={label} value={value} onChangeText={onChangeText} />
);

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

const SingleDateInput = ({ setEventData, eventData }) => {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = ({ date }) => {
    setOpen(false);
    setDate(date);
    setEventData({ ...eventData, regDeadline: date });
  };

  return (
    <View style={styles.input}>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Registration Expiry Date
      </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
    </View>
  );
};
const ImagePickerComponent = ({ onSelectImage }) => {
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        onSelectImage(result.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <View>
      <Button onPress={pickImage} uppercase={false} mode="outlined">
        Select Image
      </Button>
    </View>
  );
};

export default CreateEvent;
