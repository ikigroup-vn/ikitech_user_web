import getChannel, { IKIPOS } from "./channel";

const posTheme = {
  loginTitle: "IKIPOS",
  backgroundColor: "#3234f5",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/ikipos_logo_tab.png",
  //   logo: "/images/logo/ikipos_logo.png",
  //   logoLogin: "/images/logo/ikipos_login.jpg",
  logo: "/images/logo/ikitech_logo.jpg",
  logoLogin: "/images/logo/ikitech_login.jpg",
  favicon: "/images/logo/ikipos_logo_tab.png",
};

const ikitechTheme = {
  loginTitle: "KHKcare",
  backgroundColor: "#3234f5",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/ikitech_logo_tab.png",
  // logo: "/images/logo/ikitech_logo.jpg",
  // logoLogin: "/images/logo/ikitech_login.jpg",
  logo: "/images/logo/ikitech_logo.jpg",
  logoLogin: "/images/logo/ikitech_login.jpg",
  favicon: "/images/logo/ikitech_favicon.jpg",
};

export default function themeData() {
  if (getChannel() == IKIPOS) {
    return posTheme;
  }

  return ikitechTheme;
}
