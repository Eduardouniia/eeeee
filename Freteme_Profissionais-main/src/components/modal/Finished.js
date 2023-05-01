import React, { useContext, useEffect } from "react";
import { Box, Text, Image, VStack, HStack } from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Primary } from "../../components/Colors";
import { useNavigation } from "@react-navigation/native";
import { ShowContext } from "../../context/show";
import axios from "axios";

export default function Finished(props) {
  const { setShow } = useContext(ShowContext);

  const order = props.order;
  const navigation = useNavigation();
  const [time, setTime] = React.useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const handlerStatusPagamento = await axios.get(
        "https://api.freteme.com/api/servicos?servico_id=" + order.id
      );
      const ride = handlerStatusPagamento.data[0];

      const data = new Date(ride?.data);
      const update_data = new Date(ride?.update_data);
      const diff = update_data - data; // Calcula a diferença entre as datas em milissegundos
      const diffInMinutes = diff / 1000 / 60; // Converte a diferença para minutos
      const hours = Math.floor(diffInMinutes / 60); // Calcula as horas inteiras
      const minutes = Math.round(diffInMinutes % 60); // Calcula os minutos restantes

      setTime(
        `${hours.toString().padStart(2, "0") + "h"}:${
          minutes.toString().padStart(2, "0") + "m"
        }`
      );
    };

    fetchData();
  }, []);

  if (!order) {
    return (
      <Box
        backgroundColor={"#fff"}
        width={"75%"}
        height={"30%"}
        alignSelf={"center"}
        borderRadius={20}
        top={"25%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          w={"100"}
          h={"100"}
          alt=""
          source={require("../../../assets/img/load.gif")}
        />
      </Box>
    );
  } else {
    return (
      <>
        <VStack
          borderRadius={10}
          top={"5%"}
          alignSelf={"center"}
          width={"90%"}
          position={"absolute"}
          backgroundColor={"#121212"}
          space={6}
          paddingY={"2.5%"}
          borderBottomWidth={0}
        >
          <Box pb={4} px={4}>
            <Text
              fontSize={25}
              fontWeight={"bold"}
              fontFamily={"heading"}
              color={"#fff"}
            >
              Obrigado pelo serviço!
            </Text>
            <Text color={"#fff"}>
              Relatório do serviço de {order?.userName}
            </Text>
          </Box>

          <VStack
            padding={2}
            borderRadius={10}
            alignSelf={"center"}
            width={"90%"}
            backgroundColor={"#fff"}
            space={6}
          >
            <Box>
              <HStack
                width={"27.7%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <MaterialIcons name="location-on" size={24} color={Primary} />
                <Text fontWeight={"medium"} color={Primary} fontSize={18}>
                  Origem
                </Text>
              </HStack>
              <Box paddingX={5}>
                <Text color={"#c9c9c9"}>{order?.endereco_origem} </Text>
              </Box>
            </Box>
            <Box>
              <HStack
                width={"27.7%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <MaterialCommunityIcons
                  name="map-marker-check-outline"
                  size={24}
                  color="green"
                />
                <Text fontWeight={"medium"} color={"green.700"} fontSize={18}>
                  Destino
                </Text>
              </HStack>
              <Box paddingX={5}>
                <Text color={"#c9c9c9"}> {order?.endereco_destino}</Text>
              </Box>
            </Box>
          </VStack>
          <VStack paddingX={4} space={1}>
            <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
              Valor: R$ {order?.frete_valor}
            </Text>
            <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
              Serviço: {order?.servico}
            </Text>
            <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
              Distância:
              {order?.distancia} KM
            </Text>
            <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
              Tempo de serviço:
              {" " + time}
            </Text>
          </VStack>
          <HStack pb={1} justifyContent={"center"} space={"5%"}>
            <TouchableOpacity
              onPress={() => setShow(0)}
              style={{
                backgroundColor: Primary,
                width: "42.5%",
                height: 35,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
                Fechar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={{
                backgroundColor: Primary,
                width: "42.5%",
                height: 35,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color={"#fff"} fontSize={16} fontWeight={"medium"}>
                Ver Todos
              </Text>
            </TouchableOpacity>
          </HStack>

          <HStack ml={"-1%"} position={"absolute"} bottom={0} space={"4.5%"}>
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#FFF",
                border: "none",
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",

                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderBottomColor: "#fff",
                borderBottomWidth: 0,
              }}
            />
            <Box
              style={{
                width: 25,
                height: 12.5,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            />
          </HStack>
        </VStack>
      </>
    );
  }
}
