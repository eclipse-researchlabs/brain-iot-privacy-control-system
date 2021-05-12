import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch} from "react-redux";
import {doLoginKeycloak} from "../../../redux/ducks/user";


const useStyles = makeStyles((theme) => ({

    buttonStyle: {
        marginTop: "50px",
        height: "50px",
        width: "100%"

    },

    textInputStyle: {

        backgroundColor: "#FFFFFF",
        width: "100%",
        marginTop: "20px"


    },
    formStyle: {

        marginTop: "20px",
        width: "70%"

    },


}));

function Form(props) {

    const classes = useStyles();
    const dispatch = useDispatch();


    const [errorText, setErrorText] = useState("");



    function handleClick() {

        dispatch(doLoginKeycloak())

    }

    function handleClose(event, reason) {
        setErrorText("")
    }


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return <div>
        <form>
            <Grid container alignContent="space-between" className={classes.formStyle}>
                <Grid item sm={12} align="start">
                    <Typography variant="h4" color="primary">Log in</Typography>
                </Grid>
                <Grid item sm={12}>
                    <Button className={classes.buttonStyle} variant="contained" color="primary"
                            onClick={handleClick}>Access to Brain-IoT</Button>
                </Grid>
            </Grid>
        </form>
        <Snackbar open={errorText !== ""} onClose={handleClose} autoHideDuration={3000}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Alert onClose={handleClose} severity="error">
                {errorText}
            </Alert>
        </Snackbar>
    </div>
}

export default Form;