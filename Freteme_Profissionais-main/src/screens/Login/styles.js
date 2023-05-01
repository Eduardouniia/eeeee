import { Platform, StyleSheet } from "react-native";
import {
  BackgroundSecondary,
  Border,
  Primary,
  Shaddow,
  TextTertiary,
} from "../../components/Colors";

export default StyleSheet.create({
  container: {
    backgroundColor: BackgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    marginBottom: Platform.OS === "android" ? "8%" : "10%",

    resizeMode: "contain",

    ...Platform.select({
      ios: {},
      android: {},
    }),
  },
  socialIcons: {
    width: 35,
    height: 35,
    marginTop: 20,
  },
  LoginV: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BackgroundSecondary,
    width: "90%",
    height: "90%",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    width: "77.77%",
    height: 42,
    backgroundColor: BackgroundSecondary,
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Border,
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: "77.71%",
    height: 42,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: BackgroundSecondary,
  },
  divisor: {
    marginTop: "10%",
    flexDirection: "row",
    width: "77.71%",
    alignItems: "center",
    justifyContent: "center",
  },
  divisorLine: {
    width: "42%",
    height: 2,
    backgroundColor: Border,
  },
  fbContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyConte1t: "center",
    marginTop: "10%",
  },
  fbText: {
    color: Primary,
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  forgotContainer: {
    width: "77.77%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  forgotText: {
    fontSize: 12,
    color: Primary,
    fontWeight: "300",
  },
  signUpContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: "5%",
  },
  signUpText: {
    color: TextTertiary,
    paddingRight: 5,
  },
  signUpButton: {
    color: Primary,
    fontWeight: "bold",
  },
});
