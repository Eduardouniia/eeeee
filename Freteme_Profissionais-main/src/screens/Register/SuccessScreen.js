import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Center, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Primary } from "../../components/Colors";
export default function SuccessScreen({ navigation }) {
  return (
    <Center style={styles.container}>
      <Box contentContainerStyle={styles.content}>
        <MaterialIcons
          name="pending-actions"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.heading}>Parabéns!</Text>
        <Text style={styles.message}>Seu cadastro está sob análise.</Text>
        <Button
          onPress={() => navigation.navigate("Login")}
          block
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ir para tela inicial</Text>
        </Button>
      </Box>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",

    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 80,
    color: Primary,
    marginBottom: "20%",
    alignSelf: "center",
    marginTop: "-10%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Primary,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
