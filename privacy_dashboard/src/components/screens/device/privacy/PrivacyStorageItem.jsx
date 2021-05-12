import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme=>({

    root: {},
    policyElement:{
        color: theme.palette.text.primary,
        fontSize: 16,
        fontWeight: 500
    }


}))




function PrivacyStorageItem(props){

    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(props.storage_policy);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date)
        props.handleSetDate(date)

    };

    return <ListItem>
        <ListItemText primary={<Typography variant={"body1"} className={classes.policyElement}>Privacy storage policy</Typography>}/>
        <ListItemSecondaryAction style={{width: "30%"}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disablePast
                    disableToolbar
                    autoOk={true}
                    style={{width:"100%"}}
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}

            /></MuiPickersUtilsProvider>
        </ListItemSecondaryAction>
    </ListItem>
}

export default PrivacyStorageItem;