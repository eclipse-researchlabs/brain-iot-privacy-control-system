import React, {useEffect, useState} from 'react';
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import {Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import LogoImage from "../../../images/logo_nome.png";
import UserService from "../../../services/UserService";
import MenuItem from "../../utils/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Snackbar from "@material-ui/core/Snackbar";
import {doLogout} from "../../../redux/ducks/user";
import {useDispatch, useSelector} from "react-redux";
import {menu} from "./menu/menu";
import ServicesPage from "../service/ServicesPage";
import {getServicesAndPolicies, setStatus} from "../../../redux/ducks/service";
import PrivacyPage from "../service/privacy/PrivacyPage";


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
        textOverflow: 'ellipsis',
        color: theme.palette.primary.dark,
        overflow: 'hidden',
        textAlign: "center",
        margin: 12


    }

}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomePageServiceProvider(props){

    const classes = useStyles();
    const dispatch = useDispatch();

    const services = useSelector(state => state.service)


    const selectedServiceId = props.match.params.service_name ? props.match.params.service_name : null


    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0)
    const [isPopupVisible, setPopupVisibility] = useState(false)


    useEffect(()=>{
        dispatch(getServicesAndPolicies());
    },[dispatch])


    useEffect(()=>{
        if (services.error || services.statusText){
            setPopupVisibility(true)
        }
    }, [dispatch, services])



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
        {selectedServiceId ? <PrivacyPage service_id={selectedServiceId}/> : <ServicesPage/>}

        <Snackbar autoHideDuration={4000}  open={isPopupVisible} onClose={handlePopupClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Alert severity={services.error ? "error" : "success"}>
                {services.statusText}
            </Alert>
        </Snackbar>
    </div>

}


export default HomePageServiceProvider;