import React, { useRef } from "react";
import { StyleSheet, Animated, View } from "react-native";
import globalStyles, {
  height,
  scale,
  width,
} from "../../components/globalStyles";
import { Box, VStack, HStack, Text, Image, Divider, Button } from "native-base";
import styles from "./styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useServer } from "../../libs/server";
import { useNavigation } from "@react-navigation/native";
const Card = ({ order }) => {
  const { updateServicoStatus } = useServer();
  const glowing = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  Animated.loop(
    Animated.timing(glowing, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    })
  ).start();

  const borderColor = glowing.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [globalStyles.white, globalStyles.primary, globalStyles.white],
  });

  return (
    <Box alignSelf={"center"} position={"absolute"} zIndex={150} safeArea>
      <Animated.View
        style={[
          styles.card,
          {
            borderColor: borderColor,
          },
        ]}
      >
        <VStack space={scale(3)} alignItems={"center"} w={"100%"}>
          <View style={styles.infos}>
            <Box style={styles.image}>
              <Image
                alt=""
                source={{ uri: order?.foto_user }}
                height={scale(50)}
                borderRadius={10}
                resizeMode="contain"
              />
            </Box>
            <View style={styles.info}>
              <Text style={styles.name}>{order?.userName}</Text>
              <Text width={"75%"} style={styles.function} isTruncated>
                {order?.endereco_origem}
              </Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.flex}>
              <Text style={styles.stateValue}> Serviço </Text>
              <Text style={styles.function}>{order?.servico}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.stateValue}>Distancia</Text>
              <Text style={styles.function}>
                {(order?.distancia).toFixed(2)} Km
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.stateValue}>Valor</Text>
              <Text style={styles.function}>
                R$ {order?.frete_valor?.toFixed(2)}
              </Text>
            </View>
          </View>
          <HStack
            width={"100%"}
            space={scale(2)}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <VStack alignItems={"center"} space={scale(1)}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={globalStyles.primary}
              />

              <Feather
                name="arrow-down"
                size={24}
                color={globalStyles.primary}
              />
            </VStack>
            <VStack space={scale(2)}>
              <Box>
                <Text style={styles.stateValue}>{order?.endereco_origem}</Text>
              </Box>
              <Box w={"100%"}>
                <Text style={styles.stateValue}>{order?.endereco_destino}</Text>
              </Box>
            </VStack>
          </HStack>
          <HStack
            marginTop={scale(4)}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Button style={styles.touchableDeny} onPress={() => {}}>
              <Text style={styles.touchabletext}>Rejeitar</Text>
            </Button>
            <Button
              style={styles.touchable}
              onPress={() => {
                updateServicoStatus(order?.$id, "aceito");
                navigation.navigate("MyOrder");
              }}
            >
              <Text style={styles.touchabletext}>Aceitar</Text>
            </Button>
          </HStack>
        </VStack>
      </Animated.View>
    </Box>
  );
};

export default Card;
