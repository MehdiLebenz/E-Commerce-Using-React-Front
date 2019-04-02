import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { UPDATE_USER, ADD_USER} from '../../graphql/mutations/UserMutations';
import users from '../../graphql/queries/Users';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from '../../image/NavBar/logo.png'


const styles = theme => ({
  container:{
textAlign: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: 20,
    color: '#3b97d3'
    
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 450,
 
  },
  logo:{
    margin: 10,
    width: '15%',
  },
});
      



class Register extends React.Component {
  constructor(props){
    super(props); 
    if(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      createdAt: '',
    }
  }
  componentWillReceiveProps(props){
    if (props.user){
      const {me} = props;
      this.setState({...me});
    }
  }
  handleChange = (event) =>{
    const {target: { name, value} } = event;
    this.setState({[name]: value});
  } 

  add= async (ajout) => {
    try {
      const result = await ajout();
      window.alert('User Added ');
      this.props.history.push('/card');
    }catch (error){
window.alert(error);
    }
  }
  

  render() {
    const {id, firstName, lastName, password, email, createdAt} = this.state;
    const variables = id ? { id, firstName, lastName, email, password, createdAt } : {  firstName, lastName, email, password, createdAt };
    const action = id ? ADD_USER : UPDATE_USER;
    const {classes}= this.props;
    
    return (
      
<Mutation mutation={action} variables={{UserInput: {...variables}}} refetchQueries={[{query: users}]}>

{(Adduser)=> (

  <form className={classes.container}>
  <img src={logo} alt="logo" className={classes.logo}/>
    <h3 className={classes.button}>Register</h3>
    <div> 
    
    <div >

        <TextField
          name="firstName"
          label="firstName"
          value={firstName}
          onChange={this.handleChange}
          margin="normal"
          variant= "outlined"
          className={classes.textField}
          
          />
          
         </div>
          </div>
          <div>
          <TextField
           name="lastName"
          label="lastName"
          value={lastName}
          onChange={this.handleChange}
          margin="normal"
          variant= "outlined"
          className={classes.textField}
          />
          </div>
          <div>
          <TextField
          name="email"
          label="email"
          value={email}
          onChange={this.handleChange}
          margin="normal"
          type = "email"
          variant= "outlined"
          className={classes.textField}

          />
          </div>
          <TextField
          name="password"
          label="password"
          value={password}
          onChange={this.handleChange}
          margin="normal"
          type = "password"
          variant= "outlined"
          className={classes.textField}

          />
           <div>
          <TextField
          id="date"
          onChange={this.handleChange}
          margin="normal"
          type = "date"
          variant= "outlined"
          defaultValue="2019-02-19"
          value={createdAt}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          </div>
       <Button className={classes.button} type="submit" onClick={()=>{this.add(Adduser)}}> S'enregistrer </Button>
 
  </form>
)}


</Mutation>

    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);