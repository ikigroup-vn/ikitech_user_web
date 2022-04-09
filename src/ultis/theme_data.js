import getChannel, { IKIPOS } from "./channel"

const posTheme = {
    loginTitle: "IKIPOS",
    backgroundColor: "#E56F25",
    modalNoti:"#E56F25",
    buttonYes:"#F7C23E",
    logo: "/images/logo/ikipos_logo.png",
    logoTab: "/images/logo/ikipos_logo_tab.png",
    logoLogin: "/images/logo/ikipos_login.jpg",
}

const ikitechTheme = {
    loginTitle: "IKITECH",
    backgroundColor: "#C12026",
    modalNoti:"#E56F25",
    buttonYes:"#F7C23E",
    logo: "/images/logo/ikitech_logo.jpg",
    logoTab: "/images/logo/ikitech_logo_tab.png",
    logoLogin: "/images/logo/ikitech_login.jpg",
}


export default function themeData() {
    if (getChannel() == IKIPOS) {
        return posTheme
    }

    return ikitechTheme
}