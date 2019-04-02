import { graphql, Query, Mutation } from "react-apollo";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import gql from 'graphql-tag';
import DELETE_PRODUCT from '../../graphql/mutations/CardMutations/RemoveProduct';
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import products from '../../graphql/queries/AllProducts';
import AddCircle from '@material-ui/icons/AddCircle';


const handleDelete = removeProduct => {
  const confirmDelete = window.confirm("vous êtes sur le point de supprimer un produit ! ");
      if (confirmDelete) {
        removeProduct().then(({data}) => {
          console.log(data);
        }
        );
      }
    };

const addItem = gql `
mutation addItem($item: Product ){
  addToBasket(item: $item) @client
}




`;

const styles = theme => ({
  card: {
    maxWidth: 350,
    minWidth:350,
    padding: 20,
    border: "1px solid #000; border-width: 1px 0px 0px",
    marginBottom: 20,
    marginLeft: 20,
    width: 'calc(100% / 4)',
    display: 'inline-block',
    minHeight:700,



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
    display: "block",
    marginRight: 15,
    padding: 30,
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 30,
    color: 'grey',
  },
});


const muiTheme = createMuiTheme({
   palette:
    {
        secondary: red, }, })



class OneProduct extends Component {
  

  state = { color: 'default', expanded: false, quantity: 0 };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleClick(e){ this.setState({ color: 'secondary' }) }
  onAdd = () => {
    this.setState({quantity: this.state.quantity +1});
  }

  render() {
    const { classes, produit } = this.props;
    const {quantity} = this.state;
    return (
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar  className={classes.avatar}>
                     {produit.productName}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="Share">
                
                    </IconButton>
                  }
                  title={produit.productName}
                  subheader={produit.createdAt}
                />
                
                <CardMedia
                  className={classes.media}
                  image={produit.image}
                  title="Produit"
                />
                <CardContent>
                  <Typography component="p" className={classes.text}>
                    {produit.brand}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton aria-label="Add " color= {this.state.color} onClick={(e) => this.handleClick(e)}>
                  <Mutation mutation= {addItem} variables= { {item: {...produit, quantity: this.state.quantity}}}>
                  {(addItem)=> (
                  <FavoriteIcon onClick={addItem}/>
                  )}
                  </Mutation>
                    
                  </IconButton>
                  <IconButton aria-label="Delete">
                  <Mutation mutation={DELETE_PRODUCT} variables={{id: produit.id}} refetchQueries={[{query: products}]}> 
                      {removeProduct => (
                  <DeleteForeverTwoToneIcon  className={classes.icon} onClick={()=> handleDelete(removeProduct)} />
                      )}
                  </Mutation>
                  </IconButton>
                  <IconButton>
                  <AddCircle className={classes.icon}  onClick={this.onAdd}> 
                    </AddCircle>
                    </IconButton>
                    <p>{quantity}</p>
                  <IconButton 
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon/>
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography >{produit.brand} vous propose son produit :</Typography>
            <br></br>
            <Typography >
              {produit.description}
              {produit.quantity}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
          
       

   
    );
}
}
OneProduct.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(OneProduct);
