import AuthProvider from "./src/context/auth";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Routes from "./src/routes/routes";
import TrackRide from "./src/context/useService";
import { ShowProvider } from "./src/context/show";
import * as Updates from "expo-updates";
import ServerProvider from "./src/libs/server";
import "url-search-params-polyfill";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function updateApp() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          setAppIsReady(true);
        } else {
          setAppIsReady(true);
        }
      } catch (error) {
        console.log(error);
        setAppIsReady(true);
      } finally {
        setAppIsReady(true);
      }
    }
    updateApp();
  }, []);

  if (!appIsReady) {
    return null;
  }
  return (
    <ServerProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthProvider>
            <ShowProvider>
              <TrackRide>
                <Routes />
              </TrackRide>
            </ShowProvider>
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </ServerProvider>
  );
}
