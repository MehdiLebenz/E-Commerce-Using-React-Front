import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter, NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { updateNetworkStatus } from '../../graphql/mutations/UpdateNetworkStatusLogout';
import Ajouterproduit from '../Cards/AddCard';
import logo from '../../image/NavBar/logo.png';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Modal from 'react-awesome-modal';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import AddBox from '@material-ui/icons/AddBox';



const styles = {
  root: {
    width: '100%',
    display: 'block',
    color: 'black',
    background: '#c3bfbf33',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  media:{
    display:' inline-block',
    padding: 20,
    width: '5%',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
  },
  ul:{
    margin: 0,
    height: '100%',
    display: 'inline-block',
    padding: 8,
    fontSize: 15,
    verticalAlign: 'middle',
    width: 'calc(100% - 5%)',
    boxSizing: 'border-box',
    textAlign: 'right',
  },
  li:{
    display: 'inline-block',
    padding: '0 3em',
    fontFamily: 'Poppins,sans-serif',
    verticalAlign: 'middle',
  },
  logo:{
    height: 'auto',
    padding: 15,
  },
  modal:{
height: '50%',
backgroundColor: '#f5f5f5a1',
borderRadius: 5,
boxSizing: 'border-box',
zIndex: 10002,
},
};

class HomeNavBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClose = () => {
    console.log('test');
    const { open } = this.state;
    this.setState({
      open: !open
    })
  }

render(){
  const { classes } = this.props;
  const { open } = this.state;
  const Pointer = { cursor: "pointer" };

return(
  <header>
  <div >
  <AppBar position="static" className={classes.root} >
  <img alt="logo" src={logo} className={classes.media} onClick={() => this.props.history.push('/')}/>
    <ul className={classes.ul}>
      <li className={classes.li}>
      <NavLink to = '/basket'>
      <ShoppingBasket fontSize="large"/>
      </NavLink>
      </li>
      <li className={classes.li}>
      <AddBox className="pa" fontSize="large"  onClick= {this.handleClose}/> 
      </li>
      <li className={classes.li}>
      <Mutation mutation={updateNetworkStatus} variables={{isConnected: false}}>
       {
         (updateNetworkStatus) => (
      <Button color="inherit" onClick={()=> updateNetworkStatus()}>Logout</Button>
      )
      }
      </Mutation>
      </li>
    </ul>
  </AppBar>
</div>
<Modal visible={open} width="17%" className={classes.modal} effect="fadeInUp" onClickAway={this.handleClose}>
       <img className={classes.logo} alt="logo2" width="100" height="100" src ={logo}>
       </img>
      <h3 className="employe">Ajouter un Produit </h3>
        <Ajouterproduit close={this.handleClose} className={classes.produit}/>
 
       </Modal>
      <div class="filler two" />
      </header>
);}
}
HomeNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter (withStyles(styles)(HomeNavBar));