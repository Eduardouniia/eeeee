import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { Box, Image, Text } from "native-base";
import styles from "./styles";

import { Switch } from "native-base";
export default function Offline({ onValueChange, value }) {
  return (
    <Box borderRadius={20} style={styles.container}>
      <View style={styles.containerBanner}>
        <Text style={styles.bannerText}>Você está offline</Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: "green", false: "gray" }}
          thumbColor={value ? "white" : "gray"}
        />
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.text}>Ative o app para receber serviços</Text>
      </View>
    </Box>
  );
}
