import { useState, useEffect } from "react";
import { Appbar } from "react-native-paper";
import { goBack } from "../../utils/NavigationRef.js";
const Header = ({ back, route, navigation }) => {
    return (
      <Appbar.Header
        dark={true}
        mode="center-aligned"
        statusBarHeight={0}
        style={{ backgroundColor: "#4f378b" }}
      >
        {back && (
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
              navigation.navigate("AdminProfile");
            }}
          />
        )}
      </Appbar.Header>
    );
};
export default Header;
