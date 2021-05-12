import React, {useEffect, useState} from 'react';
import {
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {doLogout } from "../../../redux/ducks/user";
import {makeStyles} from "@material-ui/core/styles";

import {getDevicesAndPolicies, setStatus} from "../../../redux/ducks/device";
import MenuItem from "../../utils/MenuItem";
import {menu} from "./menu/menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LogoImage from "../../../images/logo_nome.png"
import DevicesPage from "../device/DevicesPage";

import PrivacyPage from "../device/privacy/PrivacyPage";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import UserService from "../../../services/UserService";

const useStyles = makeStyles(theme => ({

    rootStyle: {

        height: "100%",
        backgroundColor: 'rgb(250,250,250)',
        display: "flex",


    },

    drawer: {
        width: 280,
        flexShrink: 0,
        padding: "16px",


    },
    drawerPaper: {
        width: 280,
        backgroundColor: "#ffffff",
        justifyContent: "space-between",


    },
    content: {
        flexGrow: 1,

    },

    avatar: {
        height: "80px",
        width: "200px",
        alignSelf: "center",
        marginTop: 40
    },
    menuItems: {
        marginBottom: 10,
    },

    logoutText: {
        color: "white",
    },
    logout: {
        backgroundColor: "darkred",
        '&:hover': {
            background: "darkred",
        },
        textAlign: "right",

    },
    logoutIcon: {
        color: "white"
    },
    personalInfo: {

        padding: 10,
        backgroundColor: theme.palette.primary.main,
        borderColor: "transparent",
        textAlign: "center"
    },

    usernameText: {

        fontWeight: 500,
        fontSize: 14,
        color: theme.palette.primary.dark,
        overflow: 'hidden',
        textAlign: "center"


    }

}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomePage(props) {

    const dispatch = useDispatch();

    const devices = useSelector(state => state.device)

    const classes = useStyles();

    const selectedDeviceId = props.match.params.device_id ? props.match.params.device_id : null

    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0)
    const [isPopupVisible, setPopupVisibility] = useState(false)



    useEffect(()=>{
        dispatch(getDevicesAndPolicies());
    },[dispatch])


    useEffect(()=>{
        if (devices.error || devices.statusText){
            setPopupVisibility(true)
        }

    }, [dispatch, devices])

    function handlePopupClose(){
        setPopupVisibility(false)
        setTimeout(()=>{dispatch(setStatus({error:false, statusText: ""}))},500)
    }


    function handleLogout() {
        console.log("LOGGING OUT")
        dispatch(doLogout());
    }

    function handleClickMenuItem(id) {

        if (selectedMenuIndex !== id) {
            const item = menu.find((item) => item.id === id)
            if (item) {
                setSelectedMenuIndex(item.id)
            }
        }
    }





    return <div className={classes.rootStyle}>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{paper: classes.drawerPaper,}} anchor="left">

            <Grid container alignContent="space-between" style={{height: "100vh"}}>
                <Grid item container>



                    <Grid item sm={12} align="center">
                        <img alt="logoNome" src={LogoImage} className={classes.avatar}/>
                    </Grid>
                    <Grid item sm={12} style={{marginTop: 80}}>
                            <Typography variant="body2"
                                        className={classes.usernameText}>{UserService.getUsername()}</Typography>
                    </Grid>
                    <Grid item sm={12} style={{marginTop: 80}}>
                        <List className={classes.menuItems}>
                            {menu.map((menuItem, index) => (
                                <MenuItem key={index} selected={menuItem.id === selectedMenuIndex} item={menuItem}
                                          clickHandler={handleClickMenuItem}/>
                            ))}
                        </List>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <ListItem button className={classes.logout} onClick={() => handleLogout()}>
                        <ListItemIcon className={classes.logoutIcon}><ExitToAppIcon/></ListItemIcon>
                        <ListItemText>
                            <Typography variant={"button"} className={classes.logoutText}>
                                Logout</Typography></ListItemText>
                    </ListItem>
                </Grid>
            </Grid>
        </Drawer>
        {selectedDeviceId ? <PrivacyPage device_id={selectedDeviceId}/> : <DevicesPage/>}

        <Snackbar autoHideDuration={4000}  open={isPopupVisible} onClose={handlePopupClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Alert severity={devices.error ? "error" : "success"}>
                {devices.statusText}
            </Alert>
        </Snackbar>
    </div>

}

export default HomePage;