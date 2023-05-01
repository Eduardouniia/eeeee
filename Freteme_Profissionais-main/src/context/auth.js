//imports
import React, { createContext, useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { useServer } from "../libs/server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useContext } from "react";
export const AuthContext = createContext({});
function AuthProvider({ children }) {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });
  const navigation = useNavigation();
  const { getAccount, ceateFunction, realTime, handleToken, logout } =
    useServer();
  const [user, setUser] = useState(null);
  const [Ready, setReady] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Atenção!",
          "Precisamos da permissão para enviar notificações!"
        );
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#ffffff",
      });
    }

    return token;
  }

  const getLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let lastKnownLocation = await Location.getLastKnownPositionAsync();
      setCoords({
        lat: lastKnownLocation.coords.latitude,
        lon: lastKnownLocation.coords.longitude,
      });
      setShowMap(true);
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords({ lat: coords.latitude, lon: coords.longitude });
    } catch (error) {
      console.log("error getting location", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
      try {
        const sessionActive = await getAccount();
        if (sessionActive) {
          setUser(sessionActive);
          ceateFunction();
          realTime();

          registerForPushNotificationsAsync().then(async (token) => {
            await handleToken(sessionActive?.$id, "0", token);
          });
        }
      } catch (error) {
        console.error(error);
      }
      SplashScreen.hideAsync();
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    logout();
    setUser(null);
    navigation.navigate("Login");
  };

  return (
    <AuthContext.Provider
      value={{
        showMap,
        coordinates,
        logout,
        user,
        Ready,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
