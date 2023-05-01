import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login/index";
import Register from "../screens/Register";
import Email from "../screens/Register/Email";
import Home from "../screens/Home";
import Settings from "../screens/Profile";
import Profile from "../screens/History";
import Wallet from "../screens/Wallet";
import { BackgroundPrimary, Primary, TextSubTitle } from "../components/Colors";
import ProfileInfo from "../screens/Informations";
import Code from "../screens/Register/Code";
import { Icons } from "../components/Consts";
import { AuthContext } from "../context/auth";
import Vehicle from "../screens/Vehicle";
import { Divider } from "native-base";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Platform } from "expo-modules-core";
import Recovery from "../screens/Register/Recovery";
import SuccessScreen from "../screens/Register/SuccessScreen";
import Vehicles from "../screens/Vehicle/vehicle";
import { useNavigation } from "@react-navigation/native";
import MyOrder from "../screens/Ride";
import globalStyles from "../components/globalStyles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { scale } from "../components/globalStyles";
import {
  Text,
  Button,
  Avatar,
  Box,
  Menu,
  Pressable,
  HamburgerIcon,
  HStack,
  Image,
} from "native-base";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carregando...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator(route) {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName=" Tab"
    >
      {isSignedIn === null ? (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      ) : isSignedIn === false ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{
              title: "Cadastro",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{
              title: "Cadastro",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Code"
            component={Code}
            options={{
              title: "Cadastro",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Cadastro",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Recovery"
            component={Recovery}
            options={{
              title: "Recuperar senha",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ProfileInfo"
            component={ProfileInfo}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "transparent",
              },
              title: null,

              headerTransparent: true,

              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={globalStyles.primary}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <Menu
                  placement="bottom right"
                  borderRadius={scale(10)}
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                      >
                        <HamburgerIcon
                          size={"lg"}
                          color={globalStyles.primary}
                        />
                      </Pressable>
                    );
                  }}
                >
                  <Menu.Item>
                    <TouchableOpacity
                      style={styles.options}
                      onPress={() => logout()}
                    >
                      <HStack space={scale(2)}>
                        <MaterialIcons
                          style={styles.content}
                          name="help-outline"
                          size={20}
                          color={globalStyles.darkGray}
                        />
                        <Text style={styles.textLogout}>Ajuda</Text>
                      </HStack>
                    </TouchableOpacity>
                  </Menu.Item>

                  <Menu.Item>
                    <TouchableOpacity
                      style={styles.options}
                      onPress={() => logout()}
                    >
                      <HStack
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        space={scale(2)}
                      >
                        <MaterialIcons
                          style={styles.content}
                          name="delete-outline"
                          size={20}
                          color={globalStyles.red}
                        />
                        <Text style={styles.textLogout}>Deletar</Text>
                      </HStack>
                    </TouchableOpacity>
                  </Menu.Item>

                  <Menu.Item>
                    <TouchableOpacity
                      style={styles.options}
                      onPress={() => logout()}
                    >
                      <HStack space={scale(2)}>
                        <MaterialIcons
                          name="logout"
                          size={20}
                          color={globalStyles.red}
                        />
                        <Text style={styles.textLogout}>Sair</Text>
                      </HStack>
                    </TouchableOpacity>
                  </Menu.Item>
                </Menu>
              ),
            })}
          />
          <Stack.Screen
            name="Vehicle"
            component={Vehicle}
            options={{
              headerShadowVisible: false,

              title: "Meus Veículos",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="Vehicles"
            component={Vehicles}
            options={{
              headerShadowVisible: false,

              title: "Meu Veículo",
              headerStyle: {
                backgroundColor: BackgroundPrimary,
              },
              headerTintColor: TextSubTitle,
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "transparent",
              },
              title: null,

              headerTransparent: true,

              headerLeft: () => (
                <Button
                  backgroundColor={globalStyles.primary}
                  onPress={() => navigation.navigate("Tab")}
                  borderRadius={50}
                  width={scale(50)}
                  height={scale(50)}
                  shadow={1}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={globalStyles.white}
                  />
                </Button>
              ),
            })}
          />

          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              title: "Carteira",
              headerTitleStyle: {
                fontWeight: "bold",
                alignSelf: "center",
              },
            }}
          />
          <Stack.Screen
            name="MyOrder"
            component={MyOrder}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "transparent",
              },
              title: null,

              headerTransparent: true,

              headerLeft: () => (
                <Button
                  backgroundColor={globalStyles.primary}
                  onPress={() => navigation.navigate("Tab")}
                  borderRadius={50}
                  width={scale(50)}
                  height={scale(50)}
                  shadow={1}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={globalStyles.white}
                  />
                </Button>
              ),
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
function TabNavigator(route) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarBackground: (focused) => (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: scale(50),
              borderRadius: 15,
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: Primary,
          borderRadius: 15,
          paddingBottom: 0,

          height: scale(60),
          width: "50%",
          marginHorizontal: "25%",
          bottom: "3%",
          position: "absolute",
        },

        tabBarItemStyle: ({ focused }) => ({
          borderRadius: 15,
          height: scale(60),
          width: "100%",
        }),
      }}
    >
      <Tab.Screen
        name={Icons[0].key}
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <Box
              paddingBottom={scale(2)}
              borderBottomWidth={focused ? 1 : 0}
              borderBottomColor={globalStyles.white}
            >
              <Image
                width={scale(35)}
                height={scale(35)}
                alt=""
                source={focused ? Icons[0].source : Icons[0].static}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name={Icons[1].key}
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          title: null,

          headerTransparent: true,

          headerRight: () => (
            <Menu
              placement="bottom right"
              borderRadius={scale(10)}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    margin={scale(4)}
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <HamburgerIcon size={"lg"} color={globalStyles.primary} />
                  </Pressable>
                );
              }}
            >
              <Menu.Item>
                <TouchableOpacity
                  style={styles.options}
                  onPress={() =>
                    Linking.openURL(
                      "https://api.whatsapp.com/send?phone=5527997211101&text=ol%C3%A1%20FreteMe,%20preciso%20de%20ajuda"
                    )
                  }
                >
                  <HStack space={scale(2)}>
                    <MaterialIcons
                      style={styles.content}
                      name="help-outline"
                      size={20}
                      color={globalStyles.darkGray}
                    />
                    <Text style={styles.textLogout}>Ajuda</Text>
                  </HStack>
                </TouchableOpacity>
              </Menu.Item>

              <Menu.Item>
                <TouchableOpacity
                  style={styles.options}
                  onPress={() => logout()}
                >
                  <HStack
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    space={scale(2)}
                  >
                    <MaterialIcons
                      style={styles.content}
                      name="delete-outline"
                      size={20}
                      color={globalStyles.red}
                    />
                    <Text style={styles.textLogout}>Deletar</Text>
                  </HStack>
                </TouchableOpacity>
              </Menu.Item>

              <Menu.Item>
                <TouchableOpacity
                  style={styles.options}
                  onPress={() => logout()}
                >
                  <HStack space={scale(2)}>
                    <MaterialIcons
                      name="logout"
                      size={20}
                      color={globalStyles.red}
                    />
                    <Text style={styles.textLogout}>Sair</Text>
                  </HStack>
                </TouchableOpacity>
              </Menu.Item>
            </Menu>
          ),
          tabBarShowLabel: false,
          headerLeftLabelVisible: false,
          tabBarIcon: ({ focused }) => (
            <Box
              paddingBottom={scale(2)}
              borderBottomWidth={focused ? 1 : 0}
              borderBottomColor={globalStyles.white}
            >
              <Image
                width={scale(35)}
                height={scale(35)}
                resizeMode="cover"
                alt=""
                source={focused ? Icons[1].source : Icons[1].static}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name={Icons[2].key}
        component={Profile}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          headerLeft: () => (
            <Avatar
              size={"md"}
              rounded
              source={{
                uri: route.params?.avatar,
              }}
            >
              {route.params?.avatar}
            </Avatar>
          ),
          tabBarLabelStyle: { display: "none" },
          headerLeftLabelVisible: false,
          tabBarIcon: ({ focused }) => (
            <Box
              paddingBottom={focused && scale(2)}
              borderBottomWidth={focused ? 1 : 0}
              borderBottomColor={globalStyles.white}
            >
              <Image
                width={scale(35)}
                height={scale(35)}
                resizeMode="cover"
                alt=""
                source={focused ? Icons[2].source : Icons[2].static}
              />
            </Box>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return <StackNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  options: {},
});
