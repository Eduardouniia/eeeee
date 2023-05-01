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
export default function Register({ navigation, route }) {
  const { email } = route.params;
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const emailRef = useRef(null);
  const nomeRef = useRef(null);
  const telefoneRef = useRef(null);
  const cpfRef = useRef(null);
  const cepRef = useRef(null);
  const logradouroRef = useRef(null);
  const numeroRef = useRef(null);
  const bairroRef = useRef(null);
  const cidadeRef = useRef(null);
  const estadoRef = useRef(null);
  const passwordRef = useRef(null);
  const rpasswordRef = useRef(null);
  const handleEmailSubmit = () => {
    nomeRef.current.focus();
  };
  const handleNomeSubmit = () => {
    cpfRef.current.focus();
  };
  const handleTelefoneSubmit = () => {
    nomeRef.current.focus();
  };
  const handleCpfSubmit = () => {
    cepRef.current.focus();
  };
  const handleCepSubmit = () => {
    logradouroRef.current.focus();
  };
  const handleLogradouroSubmit = () => {
    cidadeRef.current.focus();
  };
  const handleNumeroSubmit = () => {
    passwordRef.current.focus();
  };
  const handleBairroSubmit = () => {
    numeroRef.current.focus();
  };
  const handleCidadeSubmit = () => {
    estadoRef.current.focus();
  };
  const handleEstadoSubmit = () => {
    bairroRef.current.focus();
  };
  const handlePasswordSubmit = () => {
    rpasswordRef.current.focus();
  };
  const handleRPasswordSubmit = () => {
    rpasswordRef.current.blur();
  };

  useEffect(() => {
    if (cep.length === 8) {
      const options = {
        method: "GET",
        url: `http://viacep.com.br/ws/${cep.replace(/[^0-9]/g, "")}/json/`,
      };

      axios
        .request(options)
        .then(function (response) {
          setAddress(response.data);
          setLogradouro(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);

          if (response.data.erro) {
          } else {
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [cep]);

  function Register(data) {
    setLoad(true);

    if (password !== rpassword || password === "" || password === undefined) {
      setErro("As senhas não coincidem.");
      setLoad(false);
    } else {
      const options = {
        method: "POST",
        url: "https://api.freteme.com/api/cadastro",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          nome: nome.toLowerCase(),
          cpf: cpf,
          telefone: telefone,
          endereco: logradouro,
          numero: numero,
          email: email.toLowerCase().trim(),
          bairro: bairro,
          cidade: cidade,
          estado: estado,
          cep: cep,
          senha: password.trim(),
          status: 0,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.data) {
            Alert.alert("Parabéns!", "Usuário cadastrado com sucesso.");
            navigation.navigate("Success");
            setLoad(false);
          } else {
            Alert.alert("Atenção", "Por favor digite um CEP Válido");
            setLoad(false);
          }
        })
        .catch(function (error) {
          setErro("Dados já cadastrados");
          setLoad(false);
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
            <View style={styles.textInfoView}>
              <Text style={styles.infoTitle}>Agora vamos te conhecer</Text>
              <Text style={styles.infoSubTitle}>
                Precisamos de algumas informações.
              </Text>
            </View>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Email</Text>

              <Input
                variant="underlined"
                isDisabled={true}
                value={email}
                onChangeText={email}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={handleEmailSubmit}
                blurOnSubmit={false}
                ref={emailRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Telefone</Text>

              <Input
                value={telefone}
                onChangeText={setTelefone}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                variant="underlined"
                returnKeyType="next"
                onSubmitEditing={handleTelefoneSubmit}
                blurOnSubmit={false}
                ref={telefoneRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Nome</Text>

              <Input
                variant="underlined"
                value={nome}
                onChangeText={setNome}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu nome"
                returnKeyType="next"
                onSubmitEditing={handleNomeSubmit}
                blurOnSubmit={false}
                ref={nomeRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cpf</Text>

              <Input
                variant="underlined"
                value={cpf}
                onChangeText={setCpf}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu cpf"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={handleCpfSubmit}
                blurOnSubmit={false}
                ref={cpfRef}
              />
            </Box>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cep</Text>

              <Input
                variant="underlined"
                value={cep}
                onChangeText={setCep}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu cep"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={handleCepSubmit}
                blurOnSubmit={false}
                ref={cepRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Endereço</Text>

              <Input
                variant="underlined"
                value={logradouro}
                onChangeText={setLogradouro}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu endereço"
                returnKeyType="next"
                onSubmitEditing={handleLogradouroSubmit}
                blurOnSubmit={false}
                ref={logradouroRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cidade</Text>

              <Input
                variant="underlined"
                value={cidade}
                onChangeText={setCidade}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite sua cidade"
                returnKeyType="next"
                onSubmitEditing={handleCidadeSubmit}
                blurOnSubmit={false}
                ref={cidadeRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Estado</Text>

              <Input
                variant="underlined"
                value={estado}
                onChangeText={setEstado}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu estado"
                returnKeyType="next"
                onSubmitEditing={handleEstadoSubmit}
                blurOnSubmit={false}
                ref={estadoRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Bairro</Text>

              <Input
                variant="underlined"
                value={bairro}
                onChangeText={setBairro}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu bairro"
                returnKeyType="next"
                onSubmitEditing={handleBairroSubmit}
                blurOnSubmit={false}
                ref={bairroRef}
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Número</Text>

              <Input
                variant="underlined"
                value={numero}
                onChangeText={setNumero}
                width="77.7%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Digite seu número"
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={handleNumeroSubmit}
                blurOnSubmit={false}
                ref={numeroRef}
              />
            </Box>

            <Box py={2} alignSelf={"center"}>
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
                <Text style={styles.infoText}> Cadastre-se </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
