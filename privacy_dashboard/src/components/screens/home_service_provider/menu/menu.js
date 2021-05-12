import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import ExtensionIcon from '@material-ui/icons/Extension';
export const menu = [
    {
        id: 0,
        name: 'Services',
        icon: <ExtensionIcon/>,
        url: "/home"

    }, {
        id: 1,
        name: 'Settings',
        icon: <SettingsIcon/>,
        url: "/home/device_id"

    }


]
