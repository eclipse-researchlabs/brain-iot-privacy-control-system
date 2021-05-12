import React from 'react';
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Service from "./Service";
import AddService from "./AddService";

const useStyles = makeStyles(theme=>({

    root: {


    },




}))

function ServicesList(props) {

    const classes = useStyles();

    const servicesAndPolicies = useSelector(state => state.service);
    const services = servicesAndPolicies.service_policy_list


    if (!services)
        return (<div style={{margin:"auto", textAlign: "center"}}>
            <Typography variant={"h6"}>Fetching services...</Typography>
            <CircularProgress style={{marginTop: 10}}/>
        </div>);


    let servicesToDisplay = services.slice()
    servicesToDisplay.sort((t1,t2)=>{
        if (t1.service_name < t2.service_name) {
            return -1;
        }
        if (t1.service_name > t2.service_name) {
            return 1;
        }
        return 0;
    })

    return <Grid container spacing={2} className={classes.root}>

        <Grid item sm={12} md={4}>
            <AddService/>
        </Grid>
        {servicesToDisplay.map((service, index) => (
            <Grid key={index} item sm={12} md={4}>
                <Service service_id={service.name} service_name={service.name} setPolicies={service.resource_scopes.length}/>
            </Grid>
        ))}


    </Grid>

    //
    // const service = useSelector(state => state.service);
    //
    // if (service.name === "")
    //     return (<div style={{margin:"auto", textAlign: "center"}}>
    //         <Typography variant={"h6"}>Fetching services...</Typography>
    //         <CircularProgress style={{marginTop: 10}}/>
    //     </div>);
    //
    //
    // return <Grid container spacing={2} className={classes.root}>
    //     <Grid item sm={12} md={12}>
    //         <Service id={service.name} name={service.name} setPolicies={service.scope_list.length}/>
    //     </Grid>
    // </Grid>

}

export default ServicesList;