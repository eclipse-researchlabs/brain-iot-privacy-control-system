import React from 'react';
import Device from "./Device";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import AddDevice from "./AddDevice";

const useStyles = makeStyles(theme=>({

    root: {


    },




}))

function DevicesList(props) {

    const classes = useStyles();

    const devicesAndPolicies = useSelector(state => state.device);
    const devices = devicesAndPolicies.device_policy_list

    if (!devices)
        return (<div style={{margin:"auto", textAlign: "center"}}>
            <Typography variant={"h6"}>Fetching devices...</Typography>
            <CircularProgress style={{marginTop: 10}}/>
        </div>);


    let devicesToDisplay = devices.slice()
    devicesToDisplay.sort((t1,t2)=>{
        if (t1.device_id < t2.device_id) {
            return -1;
        }
        if (t1.device_id > t2.device_id) {
            return 1;
        }
        return 0;
    })

    return <Grid container spacing={2} className={classes.root}>

        <Grid item sm={12} md={4}>
            <AddDevice/>
        </Grid>
        {devicesToDisplay.map((device, index) => (
            <Grid key={index} item sm={12} md={4}>
                <Device id={device.device_id} name={device.device_id} setPolicies={device.policy_list.length}/>
            </Grid>
        ))}


    </Grid>

}

export default DevicesList;