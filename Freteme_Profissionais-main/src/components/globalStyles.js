import { Dimensions, Platform } from "react-native";
import colors from "./Colors";
export const { width, height } = Dimensions.get("window");
const guidelineBaseWidth = 375; // largura base usada para definir proporções
const guidelineBaseHeight = 812; // largura base usada para definir proporções
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
export const horizontalScale = (size) => (width / BASE_WIDTH) * size;
export const verticalScale = (size) => (height / BASE_HEIGHT) * size;
export const scale = (size) =>
  size * (verticalScale(size) / horizontalScale(size));
export const rem = (size) => scale(size);
const color = {
  primary: "rgba(26, 115, 232, 1)",
  white: "rgba(255, 255, 255, 1)",
  iceWhite: "rgb(252, 252, 252)",
  lightGray: "rgba(236, 236, 236, 1)",
  gray: "rgb(172, 177, 192)",
  darkGray: "rgb(34, 43, 69)",
  black: "rgba(18, 18, 18, 1)",
  red: "rgba(255, 0, 0, 1)",
};

const FONT_SIZE_MULTIPLIER = Platform.select({
  ios: 1,
  android: 1,
});
export default {
  activeOpacity: 0.7,
  container: {
    flex: 1,
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  flexRowSpace: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navHeaderStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    elevation: 0,
  },

  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },

  mB8: { marginBottom: 8 },
  mR8: { marginRight: 8 },
  mR16: { marginRight: 16 },
  mR24: { marginRight: 24 },
  mR48: { marginRight: 48 },
  mR64: { marginRight: 64 },

  mV16: { marginVertical: 16 },
  mV24: { marginVertical: 24 },
  mV32: { marginVertical: 32 },

  p4: { padding: 4 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  p24: { padding: 24 },

  pH4: { paddingHorizontal: 4 },
  pH8: { paddingHorizontal: 8 },
  pH16: { paddingHorizontal: 16 },
  pH24: { paddingHorizontal: 24 },
  h1: rem(12) * FONT_SIZE_MULTIPLIER,
  h2: rem(14) * FONT_SIZE_MULTIPLIER,
  h3: rem(16) * FONT_SIZE_MULTIPLIER,
  h4: rem(18) * FONT_SIZE_MULTIPLIER,
  h5: rem(20) * FONT_SIZE_MULTIPLIER,
  h6: rem(22) * FONT_SIZE_MULTIPLIER,
  h7: rem(24) * FONT_SIZE_MULTIPLIER,
  h8: rem(26) * FONT_SIZE_MULTIPLIER,
  h9: rem(28) * FONT_SIZE_MULTIPLIER,
  h10: rem(30) * FONT_SIZE_MULTIPLIER,
  ...color,
};
