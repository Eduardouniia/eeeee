import { Box, Button, Icon, Image, Input, Pressable, Text } from "native-base";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

import { Error } from "../../components/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useServer } from "../../libs/server";
export default function Login({ navigation }) {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loginUsingCredentials, getAccount } = useServer();

  const handleLogin = async () => {
    setLoad(true);
    try {
      const response = await loginUsingCredentials(email, password);
      console.error(response);
    } catch (error) {
      setError(error.message);
    }
    setLoad(false);
  };

  return (
    <TouchableWithoutFeedback
      style={{ position: "absolute" }}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <Box w={"77%"}>
          <Image
            alt=""
            source={require("../../../assets/img/logo.png")}
            style={styles.logo}
          />
        </Box>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
          width={"77.77%"}
          height={42}
          returnKeyType="next"
          autoComplete="email"
          alignSelf="center"
          variant="underlined"
          keyboardType="email-address"
          fontSize={14}
        />
        <Input
          marginTop={5}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          onChangeText={setPassword}
          onSubmitEditing={Login}
          value={password}
          placeholder="Senha"
          autoCapitalize={"none"}
          autoCorrect={false}
          width={"77.77%"}
          height={42}
          returnKeyType="next"
          alignSelf="center"
          variant="underlined"
          keyboardType="default"
          fontSize={14}
          secure
        />
        {error !== "" ? <Text style={{ color: Error }}>{error}</Text> : <></>}
        <Button
          onPress={() => handleLogin()}
          style={styles.loginButton}
          isLoading={load}
          isLoadingText="Entrando..."
        >
          <Text style={styles.loginText}>Entrar</Text>
        </Button>

        <View style={styles.divisor}>
          <View style={styles.divisorLine}></View>
          <Text style={{ marginHorizontal: "3%", color: "#979797" }}>OU</Text>
          <View style={styles.divisorLine}></View>
        </View>

        <View style={styles.forgotContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Email", { recovery: true })}
          >
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Não tem uma conta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Email", { recovery: false })}
          >
            <Text style={styles.signUpButton}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
