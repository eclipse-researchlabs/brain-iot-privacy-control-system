import DevicesIcon from "@material-ui/icons/Devices";
import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";

export const menu = [
    {
        id: 0,
        name: 'Devices',
        icon: <DevicesIcon/>,
        url: "/home"

    }, {
        id: 1,
        name: 'Settings',
        icon: <SettingsIcon/>,
        url: "/home/device_id"

    }


]
