export const homeStatic = require("../../assets/img/inicio.png");
export const settingsStatic = require("../../assets/img/setings.png");
export const profileStatic = require("../../assets/img/usuario.png");
export const Home = require("../../assets/img/home.gif");
export const Setting = require("../../assets/img/set.gif");
export const Profile = require("../../assets/img/user.gif");
export const Icons = [
  {
    key: "Home",
    static: homeStatic,
    navigate: "Home",
    size: "30",
    source: Home,
  },
  {
    key: "Settings",
    static: settingsStatic,
    navigate: "Settings",
    size: "30",
    source: Setting,
  },
  {
    key: "Profile",
    static: profileStatic,
    navigate: "Profile",
    size: "30",
    source: Profile,
  },
];

import colors from "./Colors";
import device from "./device";
import fonts from "./FontFamily";
import func from "./functions";
import gStyle from "./globalStyles";

export { colors, device, fonts, func, gStyle };
