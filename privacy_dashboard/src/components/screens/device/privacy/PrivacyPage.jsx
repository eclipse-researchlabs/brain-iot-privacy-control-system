import React  from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import PolicyList from "./PolicyList";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from "../../../../history";
import {useDispatch, useSelector} from "react-redux";
import {

    updateDeviceAndPolicies
} from "../../../../redux/ducks/device";

const useStyles = makeStyles(theme=>({

    root:{

        padding: 60,
        height: "100%",
        width: "100%",
        display: "flex"

    },
    title: {

        fontWeight: 600,
        color: theme.palette.primary.main

    },
    subtitle: {

        fontWeight: 600,
        color: theme.palette.primary.light,
        marginBottom: 20
    },
    policyList:{
        marginTop: 30,
    },
    buttonContainer: {

        textAlign: "right",


    },
    buttonStyle:{
        height: "40px",
    },
    buttonSuccess: {
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    buttonProgress: {
        color: theme.palette.primary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}));

function PrivacyPage(props){

    const classes = useStyles();
    const dispatch = useDispatch();

    const device_id = props.device_id;
    const devices = useSelector(state=>state.device);

    const {available_policy, device_policy_list} = devices

    if (!device_policy_list)
        return <Grid container alignItems={"center"} justify={"center"} style={{height: "100vh"}}>
            <Grid item  align={"center"} >
                <Typography variant={"h6"}>Fetching device info...</Typography>
                <CircularProgress style={{marginTop: 10}}/>
            </Grid>
        </Grid>


    const {loading, } = devices;

    const selected_device_policy_list = devices.device_policy_list.find((devicePolicy)=>devicePolicy.device_id === props.device_id)
    const set_policies = selected_device_policy_list.policy_list;
    const storage_policy = selected_device_policy_list.storage_policy;

    let tempPolicies;
    tempPolicies = set_policies.slice()

    let tempStoragePolicy = storage_policy;

    function handleToggle(policy_id, new_state){

        if (new_state)
            tempPolicies.push(policy_id)
        else
            tempPolicies = tempPolicies.filter(e=>e!==policy_id)

        console.log(tempPolicies)

    }

    function handleSetDate(storage_policy){


        tempStoragePolicy = storage_policy

    }



     function handleSaveButtonClick()  {

        dispatch(updateDeviceAndPolicies({device_id: props.device_id, policy_list: tempPolicies, storage_policy: tempStoragePolicy}))

    }



    return <Grid container className={classes.root} alignContent={"space-between"}>
        <Grid item container>
            <Grid item sm={6} >
                <Button
                    color="primary"
                    className={classes.button}
                    startIcon={<ArrowBackIcon/>}
                    onClick={()=>history.push("/home")}
                >Back to devices</Button>
            </Grid>
            <Grid item sm={6} className={classes.buttonContainer}>
                <Button
                    variant={loading ? "outlined" :  "contained" }
                    color="primary"
                    onClick={handleSaveButtonClick}
                    className={classes.buttonStyle}>
                    Save settings
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}</Button>

            </Grid>
            <Grid item sm={12} style={{marginTop: 20}}>
                <Typography variant="h6" className={classes.subtitle}>Policy settings</Typography>
                <Typography variant="h4" className={classes.title}>{device_id}</Typography>
            </Grid>
            <Grid item sm={12} className={classes.policyList}>
                <PolicyList device_id={device_id} available_policies={available_policy} set_policies={set_policies} storage_policy={storage_policy} handleToggle={handleToggle} handleSetDate={handleSetDate}/>
            </Grid>
        </Grid>



    </Grid>
}


export default PrivacyPage;