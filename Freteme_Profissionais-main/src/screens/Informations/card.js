import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import globalStyles, { scale } from "../../components/globalStyles";
import { VStack } from "native-base";
const Card = (props) => {
  return (
    <VStack width={props.width} space={scale(4)} style={styles.card}>
      <View style={styles.title}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="check" size={16} color="#ffffff" />
        </View>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.percent}>{props.subtitle}</Text>
      </View>
      <View style={styles.data}>
        <Text style={styles.dataText}>{props.value}</Text>
      </View>
      <View style={styles.range}>
        <View
          style={StyleSheet.flatten([
            styles.fill,
            { width: props.percent + "%" },
          ])}
        />
      </View>
    </VStack>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: scale(16),
    backgroundColor: "#fff",
    shadowColor: "#404040",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 20,
    maxHeight: scale(100),
    marginVertical: scale(8),
    justifyContent: "space-around",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    marginLeft: 8,
    color: globalStyles.gray,
    fontSize: globalStyles.h3,
    fontWeight: "bold",
  },
  percent: {
    marginLeft: 8,
    color: "#02972f",
    fontWeight: "bold",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  dataText: {
    color: "#1F2937",
    fontSize: globalStyles.h6,
    lineHeight: scale(24),
    fontWeight: "bold",
    textAlign: "left",
  },
  range: {
    backgroundColor: "#E5E7EB",
    width: "100%",
    height: 8,
    borderRadius: 4,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#10B981",

    height: "100%",
    borderRadius: 4,
  },
});

export default Card;
