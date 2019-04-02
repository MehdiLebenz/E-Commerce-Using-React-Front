import { graphql, Query } from "react-apollo";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OneProduct from './Product';
import products from "../../graphql/queries/AllProducts";
import { blue } from "@material-ui/core/colors";
import HomeNavBar from '../NavBars/HomeNavBar';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth:350,
    padding: 20,
    border: "1px solid #000; border-width: 1px 0px 0px",
    minHeight:605,
    maxHeight: 600,
    position: 'fixed'
  },
  media: {
    margin: "0 auto",
    height: 300,
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: blue[500],
    fontSize: 3,
  },
  allitems: {
    textAlign: "left",
    display: "align-block",
    marginRight: 15,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid"
  }
});


class Produit extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
const {classes}= this.props;
    return (
      <div>
        <header>
        <HomeNavBar/>
        </header>
          <br></br>
        <h2> Welcome to AZERTY Online Store </h2> 
        <br></br>
      <Query query={products}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading</h4>;
          if (error) return <h4>Error</h4>;
          const productview = data.products.map(produit => (
          <OneProduct produit={produit}/>
          ));
          return (
            <div className= {classes.allitems}>
              {productview}
              {console.log("ok", data)}
            </div>
          );
        }}
      </Query>
      </div>
    );
  }
}
Produit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default graphql(products)(withStyles(styles)(Produit));
