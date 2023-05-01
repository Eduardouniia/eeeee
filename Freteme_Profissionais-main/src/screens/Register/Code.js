import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
} from "react-native";
import styles from "./styles";
import { HStack, Text, Button } from "native-base";
import { Primary } from "../../components/Colors";
import axios from "axios";
import { Alert } from "react-native";
export default function Code({ route }) {
  const { codigo, email, recovery, name } = route.params;

  const [value, setValue] = useState("");
  const [seconds, setSeconds] = useState(60);
  const navigation = useNavigation();
  const [enable, setEnable] = useState(false);
  const [load, setLoad] = useState(false);
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

  async function handleResend() {
    setLoad(true);
    try {
      const response = await axios.get(
        `https://api.freteme.com/api/email?email=${email}&nome=${name}&codigo=${codigo}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      if (response.status == 200) {
        Alert.alert("Parabéns", "Código reenviado com sucesso!");

        setSeconds(60);
        setEnable(false);
        setLoad(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Ops!", "Erro ao enviar email");
      setLoad(false);
    } finally {
    }
  }

  function handlesolicitar() {
    if (value == "") {
      Alert.alert("Atenção", "Digite o código.");
      return;
    }
    if (value !== codigo) {
      Alert.alert("Atenção", "Código inválido.");
      return;
    }
    setEnable(true);
    navigation.navigate(recovery ? "Recovery" : "Register", { email: email });
  }
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newValues = [...value];
    newValues[index] = text;
    setValue(newValues.join(""));

    if (text.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  console.error(codigo);
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
          <Text style={styles.CodeTitle}>Continuando...</Text>
          <Text style={styles.CodeSubTitle}>Insira o código que recebeu.</Text>
          <HStack width={"77.7%"} justifyContent={"space-between"} mt={4}>
            {[...Array(4)].map((_, index) => (
              <TextInput
                style={{
                  backgroundColor: "#f1f1f1",

                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#404040",
                  borderWidth: 1,
                  borderColor: value === codigo ? "green" : "#f1f1f1",
                }}
                width={55}
                height={55}
                borderRadius={100}
                textAlign={"center"}
                key={index}
                ref={(input) => (inputRefs.current[index] = input)}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </HStack>
          <HStack marginY={"25px"}>
            <Text>Não recebeu o código? </Text>
            <TouchableOpacity
              onPress={() => handleResend()}
              disabled={!enable ? true : false}
            >
              <Text color={enable ? Primary : "#c9c9c9"}>
                Reenviar {!enable && "(" + seconds + " s" + ")"}
              </Text>
            </TouchableOpacity>
          </HStack>
          {load ? (
            <Button
              style={styles.CodeButton}
              isLoading
              isLoadingText="Enviando"
            ></Button>
          ) : (
            <TouchableOpacity
              onPress={handlesolicitar}
              style={styles.CodeButton}
            >
              <Text style={styles.mailText}>Confirmar código</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
