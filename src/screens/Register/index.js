import { View, Text, Linking } from "react-native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button } from "react-native-paper";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
WebBrowser.maybeCompleteAuthSession();

const Icon = () => (
    <Image source={require("../../../assets/google.png")} className="w-8 h-8" />
);

const Register = ({ navigation }) => {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId:
            "82076083385-42384eifb70nntd4n6hmpjb62fls17re.apps.googleusercontent.com",
        webClientId:
            "82076083385-nbd1jfc30hdv74i835r1q0vbcro5o3gp.apps.googleusercontent.com",
    });
    React.useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }
    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (e) {
            console.log(e);
        }
    };
    const handleRegister = () => {
        navigation.navigate("Home");
        Linking.openURL("https://evenza-backend.onrender.com/signin");
    };
    return (
        <SafeAreaView className="flex-1 bg-white w-full">
            <View className="bg-white flex-1 justify-center items-center">
                <Text>{}</Text>
                <View className="p-6">
                    <Text className="text-5xl text-purple-900 font-semibold text-center  mt-10 ">
                        Evenza
                    </Text>
                </View>
                <View className="p-2">
                    <Text className="text-2xl font-bold text-purple-900 text-center  font-sans px-6">
                        Conference Management App
                    </Text>
                </View>
                <View className="p-8 mt-8 w-4/5">
                    {/* <Button
                        // icon={() => <Icon />}
                        onPress={() =>{
                            return navigation.navigate("Home")
                        }}
                        className="w-full bg-purple-50 border-2 border-black rounded-md flex p-1 justify-evenly items-center"
                    >
                        <Text>Sign In</Text>
                    </Button> */}
                    <Button
                        mode="outlined"
                        className="mt-4 rounded-lg bg-purple-50"
                        onPress={() => {
                            return navigation.navigate("SignIn");
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        mode="outlined"
                        className="mt-4 rounded-lg bg-purple-50"
                        onPress={() => {
                            return navigation.navigate("RegisterUser");
                            //    return navigation.navigate("AdminHome")
                        }}
                    >
                        Sign Up
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
