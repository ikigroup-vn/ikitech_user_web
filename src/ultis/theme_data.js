import getChannel, { IKIPOS } from "./channel";

const posTheme = {
  loginTitle: "GBIZ",
  backgroundColor: "#E56F25",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/gtot_login.jpg",
  //   logo: "/images/logo/ikipos_logo.png",
  //   logoLogin: "/images/logo/ikipos_login.jpg",
  logo: "/images/logo/gtot_logo.jpg",
  logoLogin: "/images/logo/gtot_login.jpg",
  favicon: "/images/logo/gtot_logo.ico",
};

const ikitechTheme = {
  loginTitle: "GBIZ",
  backgroundColor: "#C12026",
  modalNoti: "#E56F25",
  buttonYes: "#F7C23E",
  logoTab: "/images/logo/gtot_login.jpg",
  // logo: "/images/logo/ikitech_logo.jpg",
  // logoLogin: "/images/logo/ikitech_login.jpg",
  logo: "/images/logo/gtot_logo.jpg",
  logoLogin: "/images/logo/gtot_login.jpg",
  favicon: "/images/logo/gtot_logo.ico",
};

export default function themeData() {
  if (getChannel() == IKIPOS) {
    return posTheme;
  }

  return ikitechTheme;
}
