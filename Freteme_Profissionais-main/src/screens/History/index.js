import {
  Box,
  Text,
  HStack,
  FlatList,
  Image,
  Center,
  VStack,
  Avatar,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BackgroundSecondary, Primary } from "../../components/Colors";
import { colors } from "../../components/Consts";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { Platform } from "react-native";
import User from "../../context/useUser";
import { AuthContext } from "../../context/auth";
import { useNavigation } from "@react-navigation/native";
import { scale } from "../../components/globalStyles";
moment.locale("pt-br");
export default function Profile({ navigation: { setParams } }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setOrder] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Avatar
          margin={scale(4)}
          size={"md"}
          rounded={"full"}
          source={{
            uri: user?.foto_perfil,
          }}
        >
          {user?.name[0] + user?.name[1]}
        </Avatar>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text fontSize={18} fontWeight={"bold"} color={colors.blue}>
          {}
        </Text>
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#fff",
        elevation: 0,
      },
      headerTintColor: colors.blue,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {order && order.length == 0 ? (
        <Center flex={1} backgroundColor={BackgroundSecondary}>
          <Text fontSize={18}>Você ainda não tem serviços!</Text>
        </Center>
      ) : (
        <FlatList
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
          backgroundColor={BackgroundSecondary}
          opacity={modalVisible ? 0.1 : 1}
          pt={2}
          style={styles.filter}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={order}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(true);
                setSelectedOrder(item);
              }}
            >
              <Box
                marginY={3}
                padding={2}
                borderRadius={10}
                alignSelf={"center"}
                width={"95%"}
                shadowColor={"#121212"}
                shadowOffset={{
                  width: 0,
                  height: 1,
                }}
                shadowOpacity={0.11}
                shadowRadius={1.41}
                elevation={2}
                backgroundColor={BackgroundSecondary}
              >
                <Box
                  alignSelf={"flex-end"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  backgroundColor={"#121212"}
                  borderRadius={10}
                  paddingX={2}
                  height={"35px"}
                >
                  <Text color={"#fff"}>
                    {moment(item.data).format("LLL")} h
                  </Text>
                </Box>
                <VStack space={6}>
                  <Box>
                    <HStack
                      width={"27.7%"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <MaterialIcons
                        name="location-on"
                        size={24}
                        color={colors.blue}
                      />
                      <Text fontWeight={"medium"} color={Primary} fontSize={18}>
                        Origem
                      </Text>
                    </HStack>
                    <Box paddingX={10}>
                      <Text color={"#c9c9c9"}>{item.endereco_origem} </Text>
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
                      <Text
                        fontWeight={"medium"}
                        color={"green.700"}
                        fontSize={18}
                      >
                        Destino
                      </Text>
                    </HStack>
                    <Box paddingX={10}>
                      <Text color={"#c9c9c9"}> {item.endereco_destino}</Text>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </SafeAreaView>
  );
}
