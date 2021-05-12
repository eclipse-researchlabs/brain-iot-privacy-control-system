import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import PolicyList from "./PolicyList";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from "../../../../history";
import {useDispatch, useSelector} from "react-redux";
import {updateServiceAndPolicies} from "../../../../redux/ducks/service";

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
    const service_id = props.service_id;


    const services = useSelector(state=>state.service);

    const {service_policy_list, available_policy} = services



    if (!service_policy_list)
        return <Grid container alignItems={"center"} justify={"center"} style={{height: "100vh"}}>
            <Grid item  align={"center"} >
                <Typography variant={"h6"}>Fetching service info...</Typography>
                <CircularProgress style={{marginTop: 10}}/>
            </Grid>
    </Grid>


    const {loading, } = services;

    const selected_service_policy_list = service_policy_list.find((servicePolicy)=>servicePolicy.name === service_id)
    const set_policies = selected_service_policy_list.resource_scopes;

    let tempPolicies;
    tempPolicies = set_policies.slice()


    function handleToggle(policy_id, new_state){

        if (new_state)
            tempPolicies.push(policy_id)
        else
            tempPolicies = tempPolicies.filter(e=>e!==policy_id)


    }




     function handleSaveButtonClick()  {

        dispatch(updateServiceAndPolicies({name: service_id, resource_scopes: tempPolicies}))

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
                <Typography variant="h4" className={classes.title}>{service_id}</Typography>
            </Grid>
            <Grid item sm={12} className={classes.policyList}>
                <PolicyList service_id={service_id} available_policy={available_policy} set_policies={set_policies} handleToggle={handleToggle}/>
            </Grid>
        </Grid>



    </Grid>













    //
    //
    //
    //
    //
    //
    // const service = useSelector(state=>state.service);
    //
    //
    //
    //
    // if (service.scope_list.length === undefined)
    //     return <Grid container alignItems={"center"} justify={"center"} style={{height: "100vh"}}>
    //         <Grid item  align={"center"} >
    //             <Typography variant={"h6"}>Fetching service info...</Typography>
    //             <CircularProgress style={{marginTop: 10}}/>
    //         </Grid>
    //     </Grid>
    //
    //
    // const {loading, } = service;
    //
    // const set_policies = service.scope_list;
    //
    // let tempPolicies;
    // tempPolicies = set_policies.slice()
    //
    //
    // function handleToggle(policy_id, new_state){
    //
    //     if (new_state)
    //         tempPolicies.push(policy_id)
    //     else
    //         tempPolicies = tempPolicies.filter(e=>e!==policy_id)
    //
    //     console.log(tempPolicies)
    //
    // }
    //
    //
    //
    //
    // function handleSaveButtonClick()  {
    //
    //     dispatch(registerNewServicesAndPolicies({name: service_name, scope_list: tempPolicies}))
    //
    // }
    //
    //
    //
    // return <Grid container className={classes.root} alignContent={"space-between"}>
    //     <Grid item container>
    //         <Grid item sm={6} >
    //             <Button
    //                 color="primary"
    //                 className={classes.button}
    //                 startIcon={<ArrowBackIcon/>}
    //                 onClick={()=>history.push("/home")}
    //             >Back to devices</Button>
    //         </Grid>
    //         <Grid item sm={6} className={classes.buttonContainer}>
    //             <Button
    //                 variant={loading ? "outlined" :  "contained" }
    //                 color="primary"
    //                 onClick={handleSaveButtonClick}
    //                 className={classes.buttonStyle}>
    //                 Save settings
    //                 {loading && <CircularProgress size={24} className={classes.buttonProgress} />}</Button>
    //
    //         </Grid>
    //         <Grid item sm={12} style={{marginTop: 20}}>
    //             <Typography variant="h6" className={classes.subtitle}>Policy settings</Typography>
    //             <Typography variant="h4" className={classes.title}>{service_name}</Typography>
    //         </Grid>
    //         <Grid item sm={12} className={classes.policyList}>
    //             <PolicyList service_name={service.name} available_policies={service.available_policy} set_policies={service.scope_list} handleToggle={handleToggle}/>
    //         </Grid>
    //     </Grid>
    //
    //
    //
    // </Grid>




}


export default PrivacyPage;