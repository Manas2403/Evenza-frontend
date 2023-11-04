import { View, Text } from 'react-native'
import React from 'react'
import { Image } from "react-native";

const QR= () => {
  return (
    <View className="flex items-center py-8">
      <Image
        source={require("../../../assets/QR.png")}
        className="w-[250px] h-[250px]"
      />
    </View>
  );
}

export default QR