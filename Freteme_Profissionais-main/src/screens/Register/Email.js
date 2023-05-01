import { Button, Input, Text } from "native-base";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./styles";
import { Error } from "../../components/Colors";
export default function Email({ route, navigation }) {
  const nameInputRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [register, setRegister] = useState(false);
  const [load, setLoad] = useState(false);
  const [enable, setEnable] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const { recovery } = route.params;
  let codigo = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  async function SendEmail() {
    if (email == null || name == null) {
      alert("Preencha todos os campos");
    }
    setLoad(true);
    try {
      const idResponse = await axios.get(
        "https://api.freteme.com/api/usuario",
        {
          headers: { Accept: "application/json" },
        }
      );
      const allUsers = idResponse.data;

      const userId = allUsers.find((user) => user.email == email);
      if (userId && !recovery) {
        Alert.alert("Oops!", "Email já cadastrado");
        setLoad(false);
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao verificar usuário existente");
      setLoad(false);
      return;
    }

    if (register == false || recovery) {
      try {
        const response = await axios.get(
          `https://api.freteme.com/api/email?email=${email}&nome=${name}&codigo=${codigo}`,
          {
            headers: { Accept: "application/json" },
          }
        );
        if (response.status == 200) {
          if (recovery) {
            Alert.alert(
              "Parabéns",
              "Código de recuperação enviado com sucesso"
            );
          } else {
            Alert.alert("Parabéns", "Código enviado com sucesso");
          }

          setLoad(false);
          setEnable(false);
          setSeconds(60);
          navigation.navigate("Code", {
            email: email,
            codigo: codigo,
            recovery: recovery,
            name: name,
          });
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Ops!", "Erro ao enviar email");
        setLoad(false);
      } finally {
        setLoad(false);
      }
    }
  }
  useEffect(() => {
    if (!enable) {
      const countdown = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            setEnable(true);
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [enable]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerMail}>
          <Text style={styles.mailSubTitle}>
            {recovery
              ? "por favor, insira seu email. você receberá um link para confirmar sua identidade "
              : "Vamos começar, por favor, insira seu email. você receberá um link para confirmar sua identidade "}
          </Text>
          {!enable ? (
            <Text color={Error}>
              Aguarde {seconds} segundos para tentar novamente{" "}
            </Text>
          ) : null}
          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize={"none"}
            autoCorrect={false}
            width={"77.77%"}
            height={42}
            alignSelf="center"
            variant="underlined"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => nameInputRef.current?.focus()} // Vai para o próximo input
          />

          <Input
            ref={nameInputRef} // Permite acessar o input com o ref
            onChangeText={setName}
            value={name}
            placeholder="Seu nome"
            autoCapitalize={"words"}
            autoCorrect={false}
            width={"77.77%"}
            height={42}
            alignSelf="center"
            variant="underlined"
            onSubmitEditing={SendEmail}
            returnKeyType="done"
          />
          {load || !enable ? (
            <Button
              style={styles.mailButton}
              isLoading
              isLoadingText={load ? "Enviando" : "Aguarde"}
            ></Button>
          ) : (
            <TouchableOpacity
              disabled={!enable}
              onPress={SendEmail}
              style={styles.mailButton}
            >
              <Text style={styles.mailText}>Enviar código</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
