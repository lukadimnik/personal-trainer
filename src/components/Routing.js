import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Traininglist from "./Traininglist";
import Customerlist from "./Customerlist";
import TrainingCalendar from "./TrainingCalendar";
import Home from "./Home";
import Statistics from "./Statistics";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import FitnessIcon from "@material-ui/icons/FitnessCenter";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
}));

const Routing = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/customerlist/"
        >
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Customer List" />
          </ListItem>
        </Link>

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/traininglist/"
        >
          <ListItem button>
            <ListItemIcon>
              <FitnessIcon />
            </ListItemIcon>
            <ListItemText primary="Training List" />
          </ListItem>
        </Link>

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/calendar/"
        >
          <ListItem button>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </Link>

        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/statistics/"
        >
          <ListItem button>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/customerlist/" component={Customerlist} />
        <Route path="/traininglist/" component={Traininglist} />
        <Route path="/calendar/" component={TrainingCalendar} />
        <Route path="/statistics/" component={Statistics} />
      </Switch>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
};

export default Routing;
