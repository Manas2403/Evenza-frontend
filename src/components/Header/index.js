import { useState, useEffect } from "react";
import { Appbar } from "react-native-paper";
import { goBack } from "../../utils/NavigationRef.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
const Header = ({ back, route, navigation }) => {
  const r=useRoute();
    return (
      <Appbar.Header
        dark={true}
        mode="center-aligned"
        statusBarHeight={0}
        style={{ backgroundColor: "#4f378b" }}
      >
        {back && (AsyncStorage.getItem(
          "UserToken"
        ) !== null && r.name!=="Home" && r.name!=="AdminHome") && (
          <Appbar.BackAction
            color="#ffffff"
            onPress={() => {
              goBack();
            }}
          />
        )}
        <Appbar.Content title={route.name} color="#ffffff" />
        {route.name === "Home" && (
          <Appbar.Action
            icon="account"
            color="#ffffff"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
        )}
        {route.name === "AdminHome" && (
          <Appbar.Action
            icon="account"
            color="#ffffff"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
        )}
      </Appbar.Header>
    );
};
export default Header;
