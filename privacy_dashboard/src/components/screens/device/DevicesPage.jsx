import React from 'react'
import DevicesList from "./DevicesList";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(theme=>({

    root:{

        padding: 60,
        height: "100%"


    },
    title: {

        fontWeight: 600,
        color: theme.palette.primary.main

    },

    deviceList:{

        marginTop: 40,


    }
    }));

function DevicesPage(props){

    const classes = useStyles();


    return <Grid container className={classes.root} alignContent={"flex-start"}>
        <Grid item sm={12}>
            <Typography variant="h4" className={classes.title}>My devices</Typography></Grid>
        <Grid item sm={12} className={classes.deviceList}>
            <DevicesList/>
        </Grid>

    </Grid>

}

export default DevicesPage;