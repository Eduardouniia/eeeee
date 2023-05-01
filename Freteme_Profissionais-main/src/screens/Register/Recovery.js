import { Box, Button, Input, ScrollView, Text } from "native-base";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import axios from "axios";
import styles from "./styles";

export default function Recovery({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [load, setLoad] = useState(false);
  const passwordRef = useRef(null);
  const rpasswordRef = useRef(null);
  const [user, setUser] = useState(null);
  const email = route.params;
  const handlePasswordSubmit = () => {
    rpasswordRef.current.focus();
  };
  const handleRPasswordSubmit = () => {
    rpasswordRef.current.blur();
  };

  async function Register() {
    setLoad(true);

    if (password !== rpassword || password === "" || password === undefined) {
      setErro("As senhas não coincidem.");
      setLoad(false);
    } else if (password.length < 6) {
      setErro("A senha deve conter no mínimo 6 caracteres.");
      setLoad(false);
    } else {
      const response = await axios.get(
        `https://api.freteme.com/api/login?email=${email.email}`
      );
      const id = response.data[0].id;
      const options = {
        method: "PUT",
        url: "https://api.freteme.com/api/usuario",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          cliente_id: id,
          senha: password.trim(),
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.data) {
            console.error(response.data);
            Alert.alert("Parabéns!", "Senha atualizada com sucesso.");
            navigation.navigate("Login");
            setLoad(false);
          } else {
            Alert.alert("Atenção", "Por favor digite um CEP Válido");
            setLoad(false);
          }
        })
        .catch(function (error) {
          setLoad(false);
          console.error(error);
        });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false} width="100%">
          <View style={styles.containerInfo}>
            <Box py={4} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Senha</Text>

              <Input
                variant="underlined"
                value={password}
                onChangeText={setPassword}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                returnKeyType="next"
                onSubmitEditing={handlePasswordSubmit}
                blurOnSubmit={false}
                ref={passwordRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Repita sua senha</Text>

              <Input
                variant="underlined"
                value={rpassword}
                onChangeText={setRPassword}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                returnKeyType="done"
                onSubmitEditing={handleRPasswordSubmit}
                blurOnSubmit={false}
                ref={rpasswordRef}
              />
            </Box>
            {load ? (
              <Button
                style={styles.infoButton}
                isLoading
                isLoadingText="Registrando"
              ></Button>
            ) : (
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  Register();
                }}
              >
                <Text style={styles.infoText}> Alterar senha </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
