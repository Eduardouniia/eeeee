import React, { useRef } from "react";
import { Box, Button, Divider, HStack, Image, Text, VStack } from "native-base";
import globalStyles, { scale } from "../globalStyles";
import { Feather, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../screens/Ride/styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Accepted({ order }) {
  const navigation = useNavigation();
  return (
    <Box
      backgroundColor={globalStyles.white}
      width={"95%"}
      alignSelf={"center"}
      borderRadius={20}
      justifyContent={"space-around"}
      alignItems={"center"}
      padding={scale(4)}
      shadow={2}
      marginTop={scale(12)}
      position={"absolute"}
      top={0}
      zIndex={150}
    >
      <HStack
        justifyContent={"space-between"}
        width={"100%"}
        alignItems={"center"}
      >
        <Text style={styles.label}>Você tem um serviço ativo!</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyOrder", { order });
          }}
        >
          <Text style={styles.detailText}>Detalhes</Text>
        </TouchableOpacity>
      </HStack>
      <Divider margin={scale(2)} />
      <Box padding={scale(1)} style={styles.box}>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          backgroundColor={globalStyles.white}
          borderRadius={10}
        >
          <Image
            alt=""
            backgroundColor={"#fff"}
            borderRadius={20}
            resizeMode={"contain"}
            size="sm"
            source={{ uri: order?.foto_user }}
          />
          <Divider orientation="vertical" height={"50%"} />
          <VStack space={scale(2)} alignItems={"flex-start"}>
            <HStack space={scale(2)}>
              <Octicons
                name="package"
                size={scale(16)}
                color={globalStyles.primary}
              />
              <Text>{order?.servico} </Text>
            </HStack>
            <HStack space={scale(2)}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={scale(16)}
                color={globalStyles.primary}
              />
              <Text>{order?.distancia} Km</Text>
            </HStack>
          </VStack>
          <Divider orientation="vertical" height={"50%"} />

          <VStack space={scale(2)} alignItems={"flex-start"}>
            <HStack alignItems={"center"} space={scale(2)}>
              <MaterialCommunityIcons
                name="cash"
                size={scale(16)}
                color={globalStyles.primary}
              />
              <Text>R$ {order?.frete_valor?.toFixed(2)}</Text>
            </HStack>
            <HStack alignItems={"center"} space={scale(1)}>
              <MaterialCommunityIcons
                name="list-status"
                size={scale(16)}
                color={globalStyles.primary}
              />
              <Text> {order?.status}</Text>
            </HStack>
          </VStack>
        </HStack>
        <Text style={styles.label}>{order?.userName}</Text>
        <HStack
          width={"100%"}
          paddingY={scale(4)}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            backgroundColor={globalStyles.primary}
            padding={scale(2)}
            borderRadius={50}
          >
            <Octicons
              name="package-dependents"
              size={scale(18)}
              color="white"
            />
          </Box>
          <Divider
            width={"33%"}
            backgroundColor={
              order?.status != "pendente"
                ? globalStyles.primary
                : globalStyles.gray
            }
          />
          <Box
            backgroundColor={globalStyles.primary}
            width={scale(4)}
            height={scale(4)}
            borderRadius={50}
          ></Box>
          <Divider
            width={"33%"}
            backgroundColor={
              order?.status == "finalizado"
                ? globalStyles.primary
                : globalStyles.gray
            }
          />

          <Box
            backgroundColor={
              order?.status == "finalizado"
                ? globalStyles.primary
                : globalStyles.gray
            }
            padding={scale(2)}
            borderRadius={50}
          >
            <Feather name="check" size={scale(18)} color="white" />
          </Box>
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Text style={styles.listItems}>{order?.endereco_origem}</Text>
          </Box>

          <Box>
            <Text style={styles.listItems}>{order?.endereco_destino}</Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
