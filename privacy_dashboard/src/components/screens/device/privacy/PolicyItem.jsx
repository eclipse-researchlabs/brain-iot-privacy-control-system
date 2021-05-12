import React, {useState} from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText, Switch} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme=>({

    root: {},
    policyElement:{
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 500
    }


}))


function PolicyItem(props){

    const classes = useStyles()

    function handleToggle(){

        const new_state = !isSelected

        setSelected(new_state)
        props.handleToggle(props.policy_name, new_state)
    }

    const [isSelected, setSelected] = useState(props.checked)


    return <ListItem>
        <ListItemText id="switch-list-label-wifi" primary={<Typography variant={"body1"} className={classes.policyElement}>{props.policy_name}</Typography>}/>
        <ListItemSecondaryAction>
            <Switch
                edge="end"
                onChange={handleToggle}
                color={"primary"}
                checked={isSelected}
            />
        </ListItemSecondaryAction>
    </ListItem>



}
export default PolicyItem;