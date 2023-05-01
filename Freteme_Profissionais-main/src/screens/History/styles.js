import { StyleSheet } from "react-native";
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Error,
  Primary,
  Shaddow,
  TextPrimary,
  TextTertiary,
  TextTitle,
} from "../../components/Colors";
import { colors, fonts } from "../../components/Consts";
import {
  SecondaryFontFamily,
  PrimaryFontFamily,
} from "../../components/FontFamily";
import {
  SecondaryFontSize,
  TertiaryFontSize,
  PrimaryFontSize,
} from "../../components/FontSize";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundPrimary,
  },
  container1: {
    alignSelf: "center",
    position: "relative",
    shadowColor: Shaddow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    marginTop: 40,
    width: "85%",
    borderRadius: 20,
    backgroundColor: BackgroundSecondary,
  },
  containerBanner: {
    backgroundColor: Primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 12,
  },
  bannerMuted: {
    color: colors.mint,
    fontFamily: fonts.uberMedium,
    fontSize: 12,
  },
  containerInput: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 48,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  containerSquare: {
    alignItems: "center",
    flex: 2,
  },
  square: {
    backgroundColor: Primary,
    height: 8,
    width: 8,
    borderRadius: 10,
  },
  text: {
    color: colors.greyAbbey,
    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 20,
  },
  title: {
    color: TextTitle,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: "bold",
  },
  containerIcon: {
    alignItems: "center",
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 2,
  },

  content: { paddingHorizontal: 10 },

  text: {
    color: TextTertiary,
    fontFamily: PrimaryFontFamily,
    fontSize: SecondaryFontSize,
  },

  textLogout: {
    color: Error,
    fontFamily: PrimaryFontFamily,
    fontSize: SecondaryFontSize,
  },
  share: {
    color: TextPrimary,
    fontFamily: PrimaryFontFamily,
    fontSize: PrimaryFontSize,
    marginTop: 10,
    textAlign: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,

    paddingHorizontal: 10,
  },
  cardContainer: {
    justifyContent: "space-between",

    marginVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: BackgroundSecondary,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    paddingVertical: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  logoHead: {
    marginTop: "10%",
    color: TextTertiary,
    fontSize: 25,
  },

  inputHead: {},
  HeaderTouchable: {
    width: "70%",
    marginTop: "10%",
  },
  rigthHeader: {
    marginTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    width: "21%",
    justifyContent: "space-between",
  },
  icon: {
    color: TextTertiary,
    fontSize: 25,
  },
  footerHeader: {
    paddingBottom: "3%",
    backgroundColor: BackgroundSecondary,
  },
  footerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  filter: { marginTop: 10 },
  footerText: {
    color: Primary,
  },
  filterOptions: {
    marginHorizontal: 5,
    borderRadius: 10,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderWidth: 1,
  },
  filterOptionsText: {
    color: TextTertiary,
  },
  name: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  title: {
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  star: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
    fontFamily: SecondaryFontFamily,
  },
  subTitle: {
    paddingHorizontal: 10,
    color: TextTertiary,
    fontSize: TertiaryFontSize,
    fontFamily: PrimaryFontFamily,
  },

  productContainer: {
    backgroundColor: BackgroundPrimary,
    borderRadius: 20,
    padding: 20,
    marginLeft: -20,
  },
  productCard: {
    width: "47%",
    height: 180,
    shadowColor: Shaddow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    backgroundColor: BackgroundSecondary,
    borderRadius: 20,
    margin: 10,
    justifyContent: "space-around",
  },
  imageCard: {
    width: 70,
    height: 80,
    marginTop: 20,
  },
  titleCard: {
    fontFamily: SecondaryFontFamily,
    color: TextTitle,
    fontSize: SecondaryFontSize,
    paddingVertical: 10,
  },
  subTitleCard: {
    fontFamily: PrimaryFontFamily,
    color: TextTertiary,
    fontSize: SecondaryFontSize,
  },
});
