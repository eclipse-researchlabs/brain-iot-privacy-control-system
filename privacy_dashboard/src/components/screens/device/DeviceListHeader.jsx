import React from 'react';
import {Box, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({

    root: {

        borderRadius: 14,
        color: "white",
        backgroundColor: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: 800,
        padding: 8

    }

}))

function DeviceListHeader(props) {

    const classes = useStyles();

    return <Box >
            <Paper elevation={4} className={classes.root}>
                <Grid container justify={"space-between"} align={"center"}  alignContent={"center"} >
                    <Grid item sm={3} xs={12}>Device name</Grid>
                    <Grid item sm={3} xs={12}>Device identifier</Grid>
                    <Grid item sm={3} xs={12}>Number of set policies</Grid>
                    <Grid item sm={3} xs={12}>Actions</Grid>
                </Grid>
            </Paper>

    </Box>
}

export default DeviceListHeader;