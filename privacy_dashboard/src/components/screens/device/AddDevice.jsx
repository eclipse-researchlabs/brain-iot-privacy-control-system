import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Icon, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import {registerNewDeviceAndPolicies, setStatus} from "../../../redux/ducks/device";
const useStyles = makeStyles(theme=>({

    rootNoClick: {
        borderRadius: 14,
        color: "white",
        backgroundColor: "#eed265",
        fontSize: 18,
        fontWeight: 800,
        padding: 12,
        display: "flex",
        alignItems: "center",
        height: "100%"
    },
    rootClick: {
        borderRadius: 14,
        fontSize: 18,
        fontWeight: 800,
        padding: 18,
        display: "flex",
        height: "100%",
    }
}))

function AddDevice(){

    const classes = useStyles();
    const dispatch = useDispatch();
    const [isClicked, setClicked] = useState(false)
    const [newDevice, setNewDevice] = useState({device_id: "", device_name: ""})
    const devices = useSelector(state=>state.device)


    function handleClick(){


        setClicked(true)

    }

    function handleCancel(){

        setClicked(false)

    }

    function handleConfirm(){

        if (newDevice.device_id === "")
            dispatch(setStatus({error: true, statusText: "Ciao"}))
        else if (newDevice.device_name === "")
            dispatch(setStatus({error: true, statusText: "No"}))
        else {

            let duplicates = devices.device_policy_list.filter((devicePolicy)=>devicePolicy.device_id === newDevice.device_id)

            if (duplicates.length === 0) {
                dispatch(registerNewDeviceAndPolicies({device_id: newDevice.device_id, policy_list: []}))
            }


            setClicked(false);
        }
    }

    function handleChange(event){


        const {id, value} = event.target;
        setNewDevice({...newDevice, [id]: value})

    }


    return !isClicked ?
        <Paper elevation={2} className={classes.rootNoClick}>
                <Grid container justify={"space-between"} align={"center"}  alignContent={"center"} >
                    <Grid item sm={12} xs={12}><Typography variant={"button"}>Add new device</Typography></Grid>
                    <Grid item sm={12} xs={12} style={{color:"white"}}>
                        <IconButton onClick={handleClick} style={{backgroundColor:"white",color: "#eed265", width: 40, height: 40}}><Icon>add</Icon></IconButton>
                    </Grid>
                </Grid>
            </Paper>:
        <Paper elevation={2} className={classes.rootClick}>
            <Grid container justify={"space-between"} align={"center"}  alignContent={"space-between"} spacing={2}>

                <Grid item sm={12} xs={12}>
                        <Typography variant={"subtitle2"}  color={"textPrimary"}>Add device details</Typography>
                    </Grid>

                    <Grid item container direction={"column"}>
                        <TextField id="device_id" label="Device id" onChange={handleChange} style={{fontSize: 12}} />
                        <TextField id="device_name" label="Device name" onChange={handleChange} style={{fontSize: 12, marginTop: 10}}/>
                    </Grid>

                    <Grid item container spacing={2}>
                        <Grid item sm={6} xs={12} style={{color:"white"}}>
                            <IconButton onClick={handleConfirm} style={{backgroundColor:"darkgreen",color: "white", width: 40, height: 40}}><CheckIcon/></IconButton>
                        </Grid>
                        <Grid item sm={6} xs={12} style={{color:"white"}}>
                            <IconButton onClick={handleCancel} style={{backgroundColor:"darkred",color: "white", width: 40, height: 40}}><CloseIcon/></IconButton>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>


}

export default AddDevice