import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
const QR = ({ qr }) => {
    return (
        <View className="flex items-center py-8">
            <QRCode
                value={qr ? qr : "NA"}
                size={200}
                color="white"
                backgroundColor="black"
            ></QRCode>
        </View>
    );
};

export default QR;
