import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    List,
    ListSubheader,
    Paper,
} from "@material-ui/core";

import PolicyItem from "./PolicyItem";
import PrivacyStorageItem from "./PrivacyStorageItem";

const useStyles = makeStyles(theme=>({

   root: {
       height: "100%",
       margin: "10px"
   }

}))



function PolicyList(props){

    const classes = useStyles();

    return <Paper elevation={2} className={classes.root}>
        <List subheader={<ListSubheader disableSticky={true}>Available policies</ListSubheader>}>
            {props.available_policies.map((policy, index)=>(
                policy !== "storage_policy" && <PolicyItem key={index} policy_name={policy} handleToggle={props.handleToggle} checked={props.set_policies.includes(policy)}/>))}
                <PrivacyStorageItem storage_policy={props.storage_policy ? Date.parse(props.storage_policy) : null} handleSetDate={props.handleSetDate}/>
        </List>
    </Paper>

}

export default PolicyList;