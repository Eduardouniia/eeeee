import { StyleSheet } from "react-native";

import style, {
  horizontalScale,
  scale,
  verticalScale,
  width,
} from "../../components/globalStyles";
import globalStyles from "../../components/globalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.white,
    justifyContent: "space-around",
  },
  infos: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    height: scale(56),
    width: scale(56),
    borderRadius: 8,
    marginRight: scale(16),
  },

  info: {},
  name: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500",
    color: globalStyles.gray,
  },
  icon: {
    color: style.primary,
  },
  title: {
    fontSize: style.h2,
    color: style.darkGray,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: style.h2,
    color: style.gray,
  },
  label: {
    fontSize: style.h3,
    color: style.gray,
    fontWeight: "500",
    paddingVertical: scale(4),
  },
  subLabel: {
    fontSize: style.h2,
    color: style.gray,
    fontWeight: "400",
    paddingVertical: scale(2),
  },
  detailText: {
    fontSize: style.h2,
    color: style.primary,
    fontWeight: "500",
  },
  listItems: {
    fontSize: style.h1,
    color: style.gray,
  },
  map: {
    height: verticalScale(300),
  },
  mapcard: {
    marginHorizontal: scale(16),
    borderRadius: scale(10),
  },
  content: {
    padding: scale(16),
    borderRadius: scale(10),
    backgroundColor: style.white,
    justifyContent: "space-between",
  },
  touchableCancel: {
    borderRadius: 10,
    backgroundColor: style.red,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: verticalScale(45),
  },
  touchable: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "47.5%",
    height: verticalScale(45),
    alignSelf: "center",
    backgroundColor: style.primary,
  },
  touchablePending: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: style.primary,
    paddingHorizontal: scale(16),
  },
  detalhes: {
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(45),
    width: horizontalScale(150),
    flexDirection: "row",
  },
  touchabletext: {
    color: style.white,
    fontSize: style.h2,
    fontWeight: "bold",
  },
  touchabletextCancel: {
    color: style.white,
    fontSize: style.h3,
  },
  detalhesText: {
    color: style.primary,
    fontSize: style.h3,
    marginLeft: scale(5),
  },
  picture: {
    backgroundImage: "linear-gradient(to right, #b8d3db, #000)",
    height: verticalScale(100),
    paddingHorizontal: scale(16),
    width: "90%",
  },
  box: {},
});
