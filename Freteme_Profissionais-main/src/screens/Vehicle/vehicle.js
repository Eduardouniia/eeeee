import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import { Primary } from "../../components/Colors";
import User from "../../context/useUser";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default function Vehicles({ navigation }) {
  const { user } = User();
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    if (user && user?.veiculo) {
      setVeiculos(JSON.parse(user?.veiculo));
    }
  }, [user, user?.veiculo]);
  if (user && user?.veiculo) {
    return (
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
            <VStack height={150} justifyContent={"space-between"} width={"35%"}>
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
              <FontAwesome name="drivers-license" size={30} color={Primary} />
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
    );
  } else {
    return (
      <Box
        flex={1}
        backgroundColor={"#fff"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"#fff"}
        >
          <Text fontSize={16}>Você não possui Veículos cadastrados</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() =>
              navigation.navigate("Vehicle", {
                veiculo: null,
                id: user?.cliente_id,
                role_selected: null,
              })
            }
          >
            <Text style={styles.infoText}>Cadastrar</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  }
}
const styles = StyleSheet.create({
  bar: {
    bordertopLeftRadius: 10,
    borderBottomRightRadius: 50,
    height: height * 0.06,
    backgroundColor: Primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  infoButton: {
    backgroundColor: Primary,
    width: width * 0.778,
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
    alignSelf: "center",
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
  },
  card: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    borderRadius: 10,
    top: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
});
