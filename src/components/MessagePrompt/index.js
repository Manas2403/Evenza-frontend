import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

const MessagePrompt = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <View style={styles.alertBox}>
          <Text>{message}</Text>
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default MessagePrompt;
