import React from 'react';
import {
    Grid,
    IconButton,
    Paper, Tooltip,
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import history from "../../../history";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DevicesIcon from "@material-ui/icons/Devices";
import {useDispatch} from "react-redux";
import {removeService} from "../../../redux/ducks/service";

const useStyles = makeStyles(theme => ({

    root: {

        borderRadius: 14,
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 500,
        padding: 16,
        display: "flex",
        alignItems: "center",
    },
    settingsIcon:
        {
            color: "#afc633"
        },

    inspectIcon:
        {
            color: "#bfbce9"
        },
    deleteIcon:
        {
            color: 'darkred'
        },


}))

function Service(props) {

    const classes = useStyles()
    const dispatch = useDispatch()

    function handlePrivacyButtonClick() {
        history.push('/home/service/' + props.service_id)
    }

    function handleDeleteServiceClick(){

        dispatch(removeService({service_id: props.service_id}))

    }


    return <Paper elevation={2} className={classes.root}>
        <Grid container justify={"space-between"} spacing={2} >
            <Grid item container sm={12}>
                <Grid item sm={6}>
                    <Typography variant={"subtitle2"}  color={"textPrimary"}>Brain-IoT service</Typography>
                </Grid>
                <Grid item sm={6} style={{textAlign: "right"}}>
                    <DevicesIcon style={{color: "#afc633"}}/>
                </Grid>
            </Grid>
            <Grid item container spacing={2} direction={"column"} sm={12} justify={"space-between"}>
                <Grid item>
                    <Typography variant={"overline"}  color={"textSecondary"}>Id</Typography>
                    <Typography variant={"body1"} style={{fontWeight: 600, lineBreak: "anywhere"}}>{props.service_id} </Typography>
                </Grid>
                {/*<Grid item>*/}
                {/*    <Typography variant={"overline"} color={"textSecondary"}>Name</Typography>*/}
                {/*    <Typography variant={"body1"} style={{fontWeight: 600}}>{props.service_name}</Typography>*/}
                {/*</Grid>*/}
                <Grid item>
                    <Typography variant={"overline"}  color={"textSecondary"}>Set policies</Typography>
                    <Typography variant={"body1"} style={{fontWeight: 600}}>{props.setPolicies}</Typography>
                </Grid>
            </Grid>
            <Grid item container  sm={12}  justify={"center"}>
                <Tooltip title={'Privacy settings'}>
                    <IconButton onClick={handlePrivacyButtonClick}>
                        <SettingsIcon className={classes.settingsIcon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={'Inspect device'}>
                    <IconButton>
                        <VisibilityIcon className={classes.inspectIcon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={'Delete device'}>
                    <IconButton onClick={handleDeleteServiceClick}>
                        <DeleteIcon className={classes.deleteIcon}/>
                    </IconButton>
                </Tooltip>

            </Grid>
        </Grid>

    </Paper>

}

export default Service;