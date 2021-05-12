import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme=>({

    root: {
        "&$rootSelected":{
            backgroundColor:theme.palette.primary.main,

        },
        "&$rootSelected:hover":{
            backgroundColor: theme.palette.primary.main
        }
    },
    rootSelected:{},
    text: {
        color: theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 500,
        textAlign: "right"


    },
    icon: {
        color: theme.palette.primary.main
    },

    textSelected:{
        color:"white",
        fontSize: 14,
        fontWeight: 500,
        textAlign: "right"


    },
    iconSelected:{
        color:"white"
    },


}))






function MenuItem(props){

    const classes = useStyles();

    return <ListItem button
                     disabled={props.item.id !== 0}
                     classes={{root: classes.root, selected: classes.rootSelected}}
                     selected={props.selected}
                     onClick={()=>props.clickHandler(props.item.id)}>
        <ListItemIcon
            className={!props.selected ? classes.icon : classes.iconSelected}>{props.item.icon}</ListItemIcon>
        <ListItemText>
            <Typography
                className={!props.selected ? classes.text : classes.textSelected}>
                {props.item.name}</Typography></ListItemText>
    </ListItem>

}

export default MenuItem;