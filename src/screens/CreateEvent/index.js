import React from "react";
import { useForm } from "react-hook-form";
import { Text, View ,StyleSheet} from "react-native";
import { TextInput, Button, Appbar, Provider, Portal, Dialog , DatePicker } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const styles = StyleSheet.create({
    container: {
        padding: 16, // Add padding to create space around the inputs
    },
    input: {
      marginBottom:8, // Add margin to the bottom of each input
    },
  });

  function RangeDateInput() {
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
  
     const onDismiss = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);
  
   const onConfirm = React.useCallback(
      ({ startDate, endDate }) => {
        setOpen(false);
        setRange({ startDate, endDate });
      },
      [setOpen, setRange]
    );
  
    return (
        <View style = {styles.input}>
          <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            Select Start and End Dates
          </Button>
          <DatePickerModal
            locale="en"
            mode= "range"
            visible={open}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
          />
        </View>
    )
  }

  function SingleDateInput() {
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
  
    const onDismissSingle = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);
  
    const onConfirmSingle = React.useCallback(
      (params) => {
        setOpen(false);
        setDate(params.date);
      },
      [setOpen, setDate]
    );
    const handleCreate=()=>{
        console.log(date);
    }
    return (
        <View style= {styles.input}>
          <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            Registeration Expiry Date
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
          <Button mode="outlined" className="mt-10 bg-purple-100 text-white">
            Create
          </Button>
        </View>
    )
  }

const MyTextInput = ({label}) => {

    const [text, setText] = React.useState("");

    return (
        <TextInput
            style = {styles.input}
            mode = 'outlined'
            label = {label}
            value={text}
            onChangeText={text => setText(text)}
        />
    );
};

const CreateEvent = () => {
    return (
        <>
        <View style = {styles.container}>
            <MyTextInput label = "Event Name"/ >
            <MyTextInput label = "Desciption"/>
            <MyTextInput label = "Venue"/>
            <RangeDateInput />
            <SingleDateInput/>
        </View>
        </>
        
    );
};

export default CreateEvent;
