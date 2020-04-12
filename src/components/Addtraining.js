import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Addtraining = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    activity: "",
    duration: "",
    customer: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setTraining({
      ...training,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = date => {
    setTraining({
      ...training,
      date: date
    });
  };

  const addTraining = () => {
    props.saveTraining(training);
    console.log(training);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add new training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              autoFocus
              name="date"
              value={training.date}
              label="Date"
              onChange={date => handleDateChange(moment(date).toISOString())}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Customer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="customer"
              value={training.customer}
              onChange={e => handleInputChange(e)}
            >
              {props.customers.map((customer, index) => (
                <MenuItem
                  key={index}
                  value={customer.links[0].href}
                >{`${customer.firstname} ${customer.lastname}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addtraining;
