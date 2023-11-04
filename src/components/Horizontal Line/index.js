import { View, Text } from 'react-native'
import React from 'react'

const HorizontalLine = () => {
  return (
    <View className=" mt-4 mb-1 flex justify-around items-center">
      <View //HORIZONTAL LINE
        className="h-[1px] w-11/12 bg-gray-400"
      />
    </View>
  );
}

export default HorizontalLine