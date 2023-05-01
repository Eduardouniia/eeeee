import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  Modal,
  Text,
  VStack,
  Divider,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  default as globalStyles,
  height,
  scale,
} from "../../components/globalStyles";
import { AuthContext } from "../../context/auth";
import { useServer } from "../../libs/server";
import { toName } from "../../utils";
import styles from "./styles";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "native-base";
import { View } from "react-native";
const ProfileInfo = (header) => {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("perfil");

  const { updatePreferences, updateName } = useServer();
  useEffect(() => {
    if (user) {
      setTelefone(user?.phone);
      setNome(user?.name);
      setEmail(user?.email);
      setPassword(user?.password);
    }
  }, [user]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        ios: "padding",
        android: null,
      })}
    >
      <Modal
        bottom={scale(height * 0.2)}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{item?.title}</Modal.Header>
          <Modal.Body>
            <Text>{item?.label}</Text>
            <Input
              ref={initialRef}
              value={nome}
              onChange={setNome}
              placeholder="Seu nome"
            />
            <Text mt={scale(4)}>Confirme sua senha</Text>
            <Input
              w={"100%"}
              borderRadius={scale(10)}
              type={show ? "text" : "password"}
              InputRightElement={
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr={2}
                    color="muted.400"
                  />
                </TouchableOpacity>
              }
              placeholder="Sua senha"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancelar
              </Button>
              <Button onPress={() => {}}>Salvar</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box safeArea justifyContent={"space-between"} flex={1}>
        <VStack
          alignItems={"center"}
          justifyContent={"space-around"}
          space={scale(2)}
        >
          <Avatar
            size={"lg"}
            bg={globalStyles.primary}
            source={{ uri: user?.perfil }}
          >
            <Avatar.Badge />
            {user && user?.name[0] + user?.name[1]}
          </Avatar>
          <VStack space={scale(1)}>
            <Heading size="md">
              {user && user?.name && toName(user?.name)}
            </Heading>
            <Text color={globalStyles.gray}>{user?.email}</Text>
          </VStack>
          <HStack py={scale(2)} width={"75%"} justifyContent={"space-around"}>
            <VStack alignItems={"center"}>
              <Text color={globalStyles.primary}>21</Text>
              <Text color={globalStyles.gray}>Serviços</Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Text color={globalStyles.primary}>
                5 <FontAwesome name="star" size={scale(14)} color="gold" />
              </Text>
              <Text color={globalStyles.gray}>Avaliação</Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Text color={globalStyles.primary}>R$ 0,00</Text>
              <Text color={globalStyles.gray}>Saldo</Text>
            </VStack>
          </HStack>
          <Divider margin={scale(4)} width={"75%"} alignSelf={"center"} />

          <HStack mt={scale(2)} width={"100%"} justifyContent={"space-around"}>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.tabNav,
                {
                  backgroundColor:
                    info == "perfil"
                      ? globalStyles.primary
                      : globalStyles.iceWhite,
                },
                styles.flaten, // adicionando estilo 'flaten'
              ])}
              onPress={() => setInfo("perfil")}
            >
              <FontAwesome
                name="drivers-license-o"
                size={scale(18)}
                style={{ marginRight: scale(16) }}
                color={
                  info == "perfil" ? globalStyles.white : globalStyles.gray
                }
              />
              <Text
                color={
                  info == "perfil" ? globalStyles.white : globalStyles.gray
                }
                style={styles.labelTab}
              >
                Perfil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.tabNav,
                {
                  backgroundColor:
                    info === "veiculo"
                      ? globalStyles.primary
                      : globalStyles.iceWhite,
                },
                styles.flaten, // adicionando estilo 'flaten'
              ])}
              onPress={() => setInfo("veiculo")}
            >
              <FontAwesome5
                name="shipping-fast"
                size={scale(18)}
                style={{ marginRight: scale(16) }}
                color={
                  info == "veiculo" ? globalStyles.white : globalStyles.gray
                }
              />
              <Text
                color={
                  info == "veiculo" ? globalStyles.white : globalStyles.gray
                }
                style={styles.labelTab}
              >
                Veículo
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <ScrollView marginTop={scale(4)}>
          {info == "perfil" ? (
            <VStack justifyContent={"space-around"}>
              <Box py={scale(4)} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Email</Text>
                <HStack justifyContent={"space-around"}>
                  <Input
                    variant="filled"
                    isDisabled={true}
                    value={email}
                    width="80%"
                    autoCapitalize="none"
                    autoComplete="off"
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                  />
                  <MaterialCommunityIcons
                    name="account-lock-outline"
                    size={scale(24)}
                    color={globalStyles.primary}
                  />
                </HStack>
              </Box>
              <Box py={scale(4)} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Nome</Text>
                <HStack justifyContent={"space-around"}>
                  <Input
                    isDisabled={true}
                    variant="filled"
                    value={nome}
                    onChangeText={setNome}
                    width="80%"
                    color={globalStyles.darkGray}
                    autoCapitalize="none"
                    autoComplete="name"
                    placeholder="Digite seu nome"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setItem({
                        title: "Editar nome",
                        label: "Nome",
                        value: nome,
                        func: (data) => updateName(data),
                      });
                      setModalVisible(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="pencil-circle"
                      size={scale(24)}
                      color={globalStyles.primary}
                    />
                  </TouchableOpacity>
                </HStack>
              </Box>
              <Box py={scale(4)} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <HStack justifyContent={"space-around"}>
                  <Input
                    variant="filled"
                    isDisabled={true}
                    value={telefone}
                    onChangeText={setTelefone}
                    width="80%"
                    autoCapitalize="none"
                    autoComplete="off"
                    placeholder="Digite seu telefone"
                    keyboardType="phone-pad"
                  />
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="pencil-circle"
                      size={scale(24)}
                      color={globalStyles.primary}
                    />
                  </TouchableOpacity>
                </HStack>
              </Box>
              <Box py={scale(4)} alignSelf={"center"}>
                <Text style={styles.infoLabel}>Senha</Text>
                <HStack justifyContent={"space-around"}>
                  <Input
                    isDisabled={true}
                    variant="filled"
                    value={password}
                    onChangeText={setPassword}
                    width="80%"
                    autoCapitalize="none"
                    autoComplete="off"
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                  />
                  <TouchableOpacity onPress={() => userupdate()}>
                    <MaterialCommunityIcons
                      name="pencil-circle"
                      size={scale(24)}
                      color={globalStyles.primary}
                    />
                  </TouchableOpacity>
                </HStack>
              </Box>
            </VStack>
          ) : (
            <Box backgroundColor={"#fff"} flex={1}>
              <Box style={styles.card}>
                <View style={styles.bar}>
                  <Text color={"#fff"} fontSize={18}>
                    {veiculos?.marca + veiculos?.modelo}
                  </Text>
                </View>

                <HStack
                  w={width * 0.778}
                  margin={"auto"}
                  justifyContent={"space-between"}
                  pt={4}
                >
                  <Image
                    resizeMode="contain"
                    alt=""
                    borderRadius={10}
                    width={"55%"}
                    height={150}
                    source={
                      user?.role == 1
                        ? require("../../../assets/img/frete.jpg")
                        : user?.role == 2
                        ? require("../../../assets/img/mudanca.jpg")
                        : require("../../../assets/img/moto.jpg")
                    }
                  />
                  <VStack
                    height={150}
                    justifyContent={"space-between"}
                    width={"35%"}
                  >
                    <Box
                      borderRadius={10}
                      padding={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                      backgroundColor={"#e6f4ff"}
                      height={65}
                    >
                      <Text>Cor</Text>
                      <Text fontWeight={"500"}>{veiculos?.cor}</Text>
                    </Box>
                    <Box
                      borderRadius={10}
                      padding={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                      backgroundColor={"#e6f4ff"}
                      height={65}
                    >
                      <Text>Ano</Text>
                      <Text fontWeight={"500"}>{veiculos?.ano}</Text>
                    </Box>
                  </VStack>
                </HStack>
                <VStack width={width * 0.778} margin={"auto"} pt={4} space={2}>
                  <HStack
                    height={60}
                    borderRadius={10}
                    space={4}
                    alignItems={"center"}
                  >
                    <MaterialCommunityIcons
                      name="car-multiple"
                      size={30}
                      color={Primary}
                    />
                    <Box>
                      <Text>Tipo de Veículo</Text>
                      <Text fontWeight={"500"}>
                        {user?.role == 1
                          ? "Fretes e carretos"
                          : user?.role == 2
                          ? "Mudanças"
                          : "Moto-Frete"}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack
                    height={60}
                    borderRadius={10}
                    space={4}
                    alignItems={"center"}
                  >
                    <Image
                      alt="placa"
                      size={30}
                      source={require("../../../assets/img/placa.png")}
                    />
                    <Box>
                      <Text>Placa</Text>
                      <Text fontWeight={"500"}>{veiculos?.placa}</Text>
                    </Box>
                  </HStack>
                  <HStack
                    height={60}
                    borderRadius={10}
                    space={4}
                    alignItems={"center"}
                  >
                    <FontAwesome
                      name="drivers-license"
                      size={30}
                      color={Primary}
                    />
                    <Box>
                      <Text>Documento do veículo</Text>
                      <Text fontWeight={"500"}>xxxxxxxxxxxxxxx</Text>
                    </Box>
                  </HStack>
                </VStack>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() =>
                    navigation.navigate("Vehicle", {
                      veiculo: veiculos,
                      id: user?.cliente_id,
                      role_selected: user?.role,
                    })
                  }
                >
                  <Text style={styles.infoText}>Editar</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          )}
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
};
export default ProfileInfo;
