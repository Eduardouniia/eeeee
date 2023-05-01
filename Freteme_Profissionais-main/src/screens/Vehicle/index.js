import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Primary } from "../../components/Colors";
import React, { useEffect } from "react";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import styles from "./styles";
import { take } from "../../libs/default";
import * as FileSystem from "expo-file-system";
import { Client, Storage } from "appwrite";

export default function Vehicles({ route }) {
  const { veiculo, id, role_selected } = route.params;
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [load, setLoad] = useState(false);
  const [categoria, setCategoria] = useState(veiculo?.categoria);
  const [marca, setMarca] = useState(veiculo?.marca);
  const [modelo, setModelo] = useState(veiculo?.modelo);
  const [ano, setAno] = useState(veiculo?.ano);
  const [placa, setPlaca] = useState(veiculo?.placa);
  const [cor, setCor] = useState(veiculo?.cor);
  const [role, setRole] = useState(role_selected);
  const [image, setImage] = useState(null);
  const [succ, setSucc] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [camera, setCamera] = useState(null);

  const client = new Client();
  const storage = new Storage(client);
  client
    .setEndpoint("http://controle.freteme.com:4040/v1")
    .setProject("64205d840248f8b076f4");

  function sendXmlHttpRequest(data) {
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }
        console.log("xhr.status", xhr);

        if (xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Request Failed");
        }
      };

      xhr.open(
        "POST",
        `http://controle.freteme.com:4040/v1/storage/buckets/64205e760b9a86206232/files/`
      );
      // xhr.setRequestHeader("content-type", "multipart/form-data");
      xhr.setRequestHeader("X-Appwrite-Project", "64205d840248f8b076f4");
      xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
      xhr.setRequestHeader("x-sdk-version", "appwrite:web:9.0.1");
      xhr.send(data);
    });
  }

  const uploadImage = async () => {
    let filename = await image.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(image);
    let type = match ? `image/${match[1]}` : `image`;

    console.log("_--------------------------------------_");
    let formData = new FormData();
    formData.append("fileId", "unique()");
    formData.append("file", {
      uri: image,
      name: filename,
      type,
    });

    console.error("formData", formData);
    await sendXmlHttpRequest(formData).then(
      function (response) {
        console.log("response", response); // Success
        setSucc(true);
      },
      function (error) {
        console.log("error", error); // Failure
      }
    );
  };

  const handleCamera = async () => {
    if (permission !== "granted") {
      await requestPermission();
    }
    setModalVisible(true);
  };
  const pickImage = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      setImage(photo.uri);
      setModalVisible(false);
    }
  };

  const Services = [
    {
      id: 1,
      name: "Frete",
      source: require("../../../assets/img/frete.jpg"),
      description: "Adicional de ajudantes e horas",
      objective: "Feito para encomendas já embaladas",
    },
    {
      id: 2,
      name: "Mudança",
      source: require("../../../assets/img/mudanca.jpg"),
      description: "Adicional de ajudantes e horas",
      objective: "Para serviços com maior tempo ",
    },
    {
      id: 3,
      name: "Moto Frete",
      source: require("../../../assets/img/moto.jpg"),
      description: "Rápido e prático",
      objective: "Feito para encomendas pequenas",
    },
  ];

  function Register() {
    const data = {
      categoria: categoria,
      marca: marca,
      modelo: modelo,
      ano: ano,
      placa: placa,
      cor: cor,
    };
    setLoad(true);

    const putData = {
      cliente_id: id,
      veiculo: JSON.stringify(data),
      role: role,
    };

    take(putData, "put", `usuario`)
      .then((response) => {
        uploadImage();
        Alert.alert("Parabéns!", "Veículo cadastrado com sucesso!");
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
        setLoad(false);
      });
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
            <HStack
              px={2}
              w={"100%"}
              alignSelf={"center"}
              alignItems={"flex-start"}
            >
              <Box w={"100%"}>
                <Text p={2} style={styles.infoLabel}>
                  Categoria
                </Text>
                {Services.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      backgroundColor:
                        item.name == categoria ? Primary : "#fff",
                      marginBottom: 10,

                      borderRadius: 10,
                      padding: 5,
                      width: "100%",
                      alignSelf: "center",
                      shadowColor: "#c9c9c9",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      height: 70,
                    }}
                    onPress={() => {
                      setCategoria(item.name);
                      setRole(item.id);
                    }}
                  >
                    <HStack>
                      <Box
                        backgroundColor={"#fff"}
                        borderWidth={1}
                        borderRadius={6}
                        borderColor={
                          item.name != categoria ? "#c9c9c9" : "#FFF"
                        }
                        width={"60px"}
                        height={"60px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Image
                          alt=""
                          backgroundColor={"#fff"}
                          w={"55px"}
                          h={"55px"}
                          resizeMode="contain"
                          source={item.source}
                        />
                      </Box>

                      <VStack px={2}>
                        <HStack>
                          <Box w={"65%"}>
                            <Text
                              color={
                                item.name != categoria ? "#404040" : "#FFF"
                              }
                              fontWeight={"medium"}
                            >
                              {item.name}
                            </Text>
                          </Box>
                        </HStack>
                        <VStack>
                          <Text
                            color={item.name != categoria ? "#404040" : "#FFF"}
                          >
                            {item.description}
                          </Text>
                          <Text
                            color={item.name != categoria ? "#C9C9C9" : "#FFF"}
                          >
                            {item.objective}
                          </Text>
                        </VStack>
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </Box>
            </HStack>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Marca</Text>

              <Input
                value={marca}
                onChangeText={setMarca}
                width="90%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Marca do seu veículo"
                variant="underlined"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Modelo</Text>

              <Input
                variant="underlined"
                value={modelo}
                onChangeText={setModelo}
                width="90%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="O modelo do seu veículo"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Ano</Text>

              <Input
                variant="underlined"
                value={ano}
                onChangeText={setAno}
                width="90%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="O ano do seu veículo (Igual ao do documento)"
                keyboardType="numeric"
              />
            </Box>

            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Placa</Text>

              <Input
                variant="underlined"
                value={placa}
                onChangeText={setPlaca}
                width="90%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="A placa do seu veículo"
              />
            </Box>
            <Box py={2} alignSelf={"center"}>
              <Text style={styles.infoLabel}>Cor</Text>

              <Input
                variant="underlined"
                value={cor}
                onChangeText={setCor}
                width="90%"
                autoCapitalize="none"
                autoComplete="off"
                placeholder="A cor do seu veículo (Igual ao do documento)"
              />
            </Box>
            <Box
              flexDirection={"row"}
              width={"90%"}
              py={2}
              alignSelf={"center"}
              alignItems={"baseline"}
              justifyContent={"space-between"}
            >
              <Text style={styles.infoLabel}>Documento do veículo</Text>
            </Box>
            {image && (
              <Image
                resizeMode="cover"
                alt=""
                source={{ uri: image }}
                width={200}
                height={350}
                borderRadius={30}
              />
            )}
            <TouchableOpacity
              onPress={() => handleCamera()}
              style={{
                borderColor: Primary,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                alignSelf: "center",
                marginTop: "5%",
              }}
            >
              <Text color={Primary}>Tirar foto</Text>
            </TouchableOpacity>
            {load == 9 ? (
              <Button
                style={styles.infoButton}
                isLoading
                isLoadingText="Salvando..."
              ></Button>
            ) : (
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => Register()}
              >
                <Text style={styles.infoText}>Salvar</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      {modalVisible && (
        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          style={{ width: "100%", height: "100%" }}
          type={type}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <Button
            onPress={() => pickImage()}
            opacity={0.9}
            width={85}
            height={85}
            borderRadius={100}
            position={"absolute"}
            bottom={10}
            alignSelf={"center"}
            backgroundColor={"#fcfcfc"}
            borderColor={Primary}
            borderWidth={4}
          ></Button>
        </Camera>
      )}
    </KeyboardAvoidingView>
  );
}
