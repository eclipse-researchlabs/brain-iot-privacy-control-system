import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    List,
    ListSubheader,
    Paper,
} from "@material-ui/core";

import PolicyItem from "./PolicyItem";

const useStyles = makeStyles(theme=>({

   root: {
       height: "100%",
   }

}))



function PolicyList(props){

    const classes = useStyles();

    return <Paper elevation={2} className={classes.root}>
        <List subheader={<ListSubheader disableSticky={true}>Available policies</ListSubheader>}>
            {props.available_policy.map((policy, index)=>(
                <PolicyItem key={index} policy_name={policy} handleToggle={props.handleToggle} checked={props.set_policies.includes(policy)}/>))}

        </List>
    </Paper>

}

export default PolicyList;