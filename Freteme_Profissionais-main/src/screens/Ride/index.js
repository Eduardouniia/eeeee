import { TouchableOpacity, View } from "react-native";
import React from "react";
import {
  Box,
  HStack,
  VStack,
  Divider,
  Text,
  ScrollView,
  Button,
  Image,
} from "native-base";
import { scale } from "../../components/globalStyles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import styles from "./styles";
import MapComponent from "../Map";
import sty from "../../components/globalStyles";
import { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import HandleServices from "../../libs/services";
import { useEffect } from "react";
import { useServer } from "../../libs/server";
export default function MyOrder({ navigation }) {
  const { order } = HandleServices();
  const { updateServicoStatus } = useServer();
  return (
    <Box safeAreaBottom style={styles.container}>
      <Box style={styles.map}>
        <MapComponent />
      </Box>

      <ScrollView padding={scale(4)} showsVerticalScrollIndicator={false}>
        <HStack paddingY={scale(2)} space={scale(4)} style={styles.infos}>
          <Image
            alt=""
            backgroundColor={"#fff"}
            borderRadius={20}
            resizeMode={"contain"}
            size="sm"
            source={{ uri: order?.foto_user }}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{order?.userName}</Text>
            <Text width={"90%"} style={styles.detailText} isTruncated>
              {order?.endereco_origem}
            </Text>
          </View>
          <Divider height={"50%"} alignSelf={"center"} orientation="vertical" />

          <Box>
            <Text style={styles.subLabel}>Valor</Text>
            <Text style={styles.detailText}>
              R$ {order?.frete_valor?.toFixed(2)}
            </Text>
          </Box>
        </HStack>

        <Box style={styles.box}>
          <Text style={styles.subLabel}>Detalhes do serviço </Text>
          <HStack
            paddingY={scale(2)}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Text style={styles.subLabel}>Serviço</Text>
              <Text>{order?.servico}</Text>
            </Box>
            <Divider
              height={"50%"}
              alignSelf={"center"}
              orientation="vertical"
            />

            <Box>
              <Text style={styles.subLabel}>Valor</Text>
              <Text>R$ {order?.frete_valor?.toFixed(2)}</Text>
            </Box>
            <Divider
              height={"50%"}
              alignSelf={"center"}
              orientation="vertical"
            />

            <Box>
              <Text style={styles.subLabel}>Distancia</Text>
              <Text>{order?.distancia?.toFixed(2)} Km</Text>
            </Box>
          </HStack>
          <Divider margin={scale(1)} opacity={0.5} />
          <Text style={styles.subLabel}>Endereço</Text>
          <HStack
            paddingY={4}
            justifyContent={"flex-start"}
            space={scale(4)}
            alignItems={"center"}
          >
            <VStack space={1} w={"10%"} alignItems={"center"}>
              <MaterialIcons name="location-on" size={24} color={sty.primary} />
              <Divider
                height={scale(2)}
                orientation="vertical"
                backgroundColor={sty.primary}
              />

              <Feather name="arrow-down" size={24} color={sty.primary} />
            </VStack>
            <VStack space={scale(4)} w={"80%"}>
              <Box>
                <Text>
                  {order?.endereco_origem + ", n° " + order?.numero_origem}
                </Text>
              </Box>
              <Box w={"100%"}>
                <Text>
                  {order?.endereco_destino + ", n° " + order?.numero_destino}
                </Text>
              </Box>
            </VStack>
          </HStack>
          <Divider margin={scale(1)} opacity={0.5} />
          <Text style={styles.subLabel}>Complemento </Text>
          <Box m={scale(1)} justifyContent={"center"}>
            <Text>{order?.complemento}</Text>
          </Box>
        </Box>
        <Divider margin={scale(1)} opacity={0.5} />

        <Box paddingY={2} style={styles.box}>
          <Text style={styles.subLabel}>Descrição dos itens </Text>
          <Box m={scale(2)} justifyContent={"center"}>
            <Text>{order?.detalhes_servico}</Text>
          </Box>
          <Divider margin={scale(1)} opacity={0.5} />
          {order?.helpers > 0 && (
            <>
              <Text style={styles.subLabel}>Ajudantes </Text>

              <Box m={scale(2)} justifyContent={"center"}>
                <Text>{order?.helpers}</Text>
              </Box>
              <Divider margin={scale(1)} opacity={0.5} />
            </>
          )}
          {order?.mounters > 0 && (
            <>
              <Text style={styles.subLabel}>Montadores </Text>

              <Box m={scale(2)} justifyContent={"center"}>
                <Text>{order?.mounters}</Text>
              </Box>
              <Divider margin={scale(1)} opacity={0.5} />
            </>
          )}
          {order?.hours > 0 && (
            <>
              <Text style={styles.subLabel}>Horas de serviço </Text>

              <Box m={scale(2)} justifyContent={"center"}>
                <Text>{order?.hours}</Text>
              </Box>
              <Divider margin={scale(1)} opacity={0.5} />
            </>
          )}
        </Box>
      </ScrollView>
      <HStack padding={scale(2)} width={"100%"} justifyContent={"space-around"}>
        <Button style={styles.touchableCancel}>
          <Text style={styles.touchabletext}>Cancelar </Text>
        </Button>
        <Button
          style={styles.touchable}
          onPress={() => {
            order?.status == "aceito"
              ? updateServicoStatus(order?.$id, "iniciado")
              : order?.status == "iniciado"
              ? updateServicoStatus(order?.$id, "pagamento pendente")
              : order?.status == "pagamento pendente"
              ? updateServicoStatus(order?.$id, "finalizado")
              : updateServicoStatus(order?.$id, "cancelado");
          }}
        >
          <Text style={styles.touchabletext}>
            {order?.status == "aceito"
              ? "Iniciar"
              : order?.status == "iniciado"
              ? "Finalizar"
              : "Confirmar"}
          </Text>
        </Button>
      </HStack>
    </Box>
  );
}
