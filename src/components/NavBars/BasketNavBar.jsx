import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../../image/NavBar/logo.png";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "grey"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  media: {
    width: "0 auto",
    height: 25,
    display: "block",
    float: "right"
  }
};

class BasketNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => {
    console.log("test");
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const Pointer = { cursor: "pointer" };

    return (
      <header>
        <div>
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <img
                alt="logo"
                src={logo}
                className={classes.media}
                style={Pointer}
              />
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
              />
              <NavLink to="/basket" />
              <KeyboardBackspace
                className="pa"
                fontSize="large"
                tooltip="Description here"
                style={Pointer}
                onClick={() => this.props.history.push("card")}
              >
                {" "}
                Retour{" "}
              </KeyboardBackspace>
            </Toolbar>
          </AppBar>
        </div>
        <div class="filler two" />
      </header>
    );
  }
}
BasketNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(withStyles(styles)(BasketNavBar));
