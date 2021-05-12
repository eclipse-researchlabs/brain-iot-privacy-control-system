import React from 'react';
import Form from './Form';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import BackgroundImage from "../../../images/background.jpg"
import LogoImage from "../../../images/logo.jpg"
import {useTheme} from "@material-ui/styles";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles({

    rootStyle: {

        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        display: "flex"

    },

    myStyle: {
        backgroundColor: "beige",
        textAlign: "center"

    },
    logoStyle: {

        height: "150px",
        width: "150px",
        marginTop: "36px",


    },

    formStyle: {

        //marginTop: "50px"

    },

    titleStyle: {

        fontWeight: 300,
        margin:"30px"

    },

    copyrightStyle: {
        textAlign:"center",
        margin: "20px"
    }

})



function LoginPage(props) {

    const classes = useStyles();
    const theme = useTheme();




    return <Grid container className={classes.rootStyle} direction="column">
        <Grid item container style={{height: "100%"}}>
            <Grid item container sm={4} align="start" alignContent="space-between" style={{backgroundColor: theme.palette.primary.main}}>
                <Grid item sm={12}></Grid>
                <Grid item sm={12} className={classes.titleStyle}>
                    <Typography variant="h2" style={{color:"white"}}>Brain IoT</Typography>
                    <Typography variant="body2" style={{color:"white", fontSize: 20, marginTop: 10}}>This is a short description of the project</Typography>
                </Grid>
                <Grid item sm={12} className={classes.copyrightStyle}>
                    <Typography variant="subtitle1" style={{color:"white"}}>Copyright</Typography>
                </Grid>
            </Grid>


            <Grid item container sm={8} justify="center"  align="center" style={{width:"100%"}}>
                <Grid item sm={12}>
                    <img className={classes.logoStyle} src={LogoImage} alt="logo"/>
                </Grid>
                <Grid item sm={12} className={classes.formStyle}>
                    <Form/>
                </Grid>
                <Grid item sm={12} >
                    <Typography variant="subtitle2">Don't you have an account? <Link href="#" underline="none" style={{cursor:"pointer"}}>Register here!</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>


}

export default LoginPage;