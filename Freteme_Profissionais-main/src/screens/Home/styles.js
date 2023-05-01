import { StyleSheet } from "react-native";
import { colors, device, fonts } from "../../components/Consts";
export default StyleSheet.create({
  map: {
    flex: 1,
    height: device.height,
    position: "absolute",
    width: device.width,
  },
  containerNoLocation: {
    alignItems: "center",
    height: device.height,
    justifyContent: "center",
    position: "absolute",
    width: device.width,
  },
  textLocationNeeded: {
    fontFamily: fonts.uberRegular,
    fontSize: 16,
    marginBottom: 16,
  },
  btnGoTo: {
    backgroundColor: colors.black,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnGoToText: {
    color: colors.white,
    fontFamily: fonts.uberRegular,
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: device.iPhoneNotch ? 58 : 34,
    position: "absolute",
    top: 0,
    left: 5,
  },
  help: {
    textAlign: "center",
    width: 32,
  },
  placeholder: {
    height: 32,
    width: 32,
  },
  rightContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    width: 40,
  },
  icon: {
    borderRadius: 18,
    height: 36,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 36,
  },
  iconQRCode: {
    backgroundColor: colors.blue,
    marginBottom: 16,
  },
  iconShield: {
    backgroundColor: colors.white,
  },
});
