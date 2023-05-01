import React, { useContext } from "react";
import * as Linking from "expo-linking";
import { View } from "react-native";
import { gStyle } from "../../components/Consts";
import { Box, Text } from "native-base";
import TouchText from "../../components/TouchText";
import { AuthContext } from "../../context/auth";
import styles from "./styles";
import Modal from "./Modal";
import MapComponent from "../Map";
export default function Home() {
  const { showMap } = useContext(AuthContext);
  return (
    <Box style={gStyle.container}>
      {showMap && (
        <>
          <Modal />
          <MapComponent />
        </>
      )}

      {!showMap && (
        <View style={styles.containerNoLocation}>
          <Text style={styles.textLocationNeeded}>
            Precisamos dos dados de sua localização...
          </Text>
          <Text style={styles.textLocationNeeded}></Text>
          <TouchText
            onPress={() => {
              if (Platform.OS === "ios") {
                Linking.openURL("app-settings:");
              } else {
                Linking.openSettings();
              }
            }}
            style={styles.btnGoTo}
            styleText={styles.btnGoToText}
            text={"Ir para configurações"}
          />
        </View>
      )}
    </Box>
  );
}
