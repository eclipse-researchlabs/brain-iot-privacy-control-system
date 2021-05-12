import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Icon, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import {registerNewServiceAndPolicies, setStatus} from "../../../redux/ducks/service";
const useStyles = makeStyles(theme=>({

    rootNoClick: {
        borderRadius: 14,
        color: "white",
        backgroundColor: "#89bf6d",
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

function AddService(){

    const classes = useStyles();
    const dispatch = useDispatch();
    const [isClicked, setClicked] = useState(false)
    const [newService, setNewService] = useState({service_id: "", service_name: ""})
    const services = useSelector(state=>state.service)


    function handleClick(){


        setClicked(true)

    }

    function handleCancel(){

        setClicked(false)

    }

    function handleConfirm(){

        if (newService.service_id === "")
            dispatch(setStatus({error: true, statusText: "Service Id can't be empty!"}))
        // else if (newService.service_name === "")
        //     dispatch(setStatus({error: true, statusText: "No"}))
        else {

            let duplicates = services.service_policy_list.filter((servicePolicy)=>servicePolicy.name === newService.service_id)


            if (duplicates.length === 0) {
                dispatch(registerNewServiceAndPolicies({name: newService.service_id, resource_scopes: []}))
            }


            setClicked(false);
        }
    }

    function handleChange(event){


        const {id, value} = event.target;
        setNewService({...newService, [id]: value})

    }


    return !isClicked ?
        <Paper elevation={2} className={classes.rootNoClick}>
            <Grid container justify={"space-between"} align={"center"}  alignContent={"center"} >
                <Grid item sm={12} xs={12}><Typography variant={"button"}>Add new service</Typography></Grid>
                <Grid item sm={12} xs={12} style={{color:"white"}}>
                    <IconButton onClick={handleClick} style={{backgroundColor:"white",color: "#89bf6d", width: 40, height: 40}}><Icon>add</Icon></IconButton>
                </Grid>
            </Grid>
        </Paper>:
        <Paper elevation={2} className={classes.rootClick}>
            <Grid container justify={"space-between"} align={"center"}  alignContent={"space-between"} spacing={2}>

                <Grid item sm={12} xs={12}>
                    <Typography variant={"subtitle2"}  color={"textPrimary"}>Add service details</Typography>
                </Grid>

                <Grid item container direction={"column"}>
                    <TextField id="service_id" label="Service id" onChange={handleChange} style={{fontSize: 12}} />
                    {/*<TextField id="service_name" label="Service name" onChange={handleChange} style={{fontSize: 12, marginTop: 10}}/>*/}
                </Grid>

                <Grid item container spacing={2} style={{marginTop: 10}}>
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

export default AddService;