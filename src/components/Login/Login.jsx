import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Mutation, compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import TextField from '@material-ui/core/TextField';
import TextButtons from '../Icons/button';
import logo from '../../image/NavBar/logo.png';

const loginMutation = gql`
  mutation Login($input: UserInput) {
    login(input: $input) {
      token
      email
    }
  }
`;
const updateNetworkStatus = gql`
mutation updateNetworkStatus($isConnected: bool){
  updateNetworkStatus(isConnected: $isConnected) @client{
    isConnected
  }
}
`
const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
 
  },
});
class Login extends React.Component {
  
  state = { login: "", password: "" };
  handleChange = e => {
    // console.log("e.target.name", e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = fn => async (e) => {

    e.preventDefault(); // enlever le comportement par defaut du navigateur
    console.log("this.state", this.state);
    const config = {variables:{"input": {"email": this.state.login,"password": this.state.password}}}
    const data = await fn(config);
    console.log("****",data);
    const jwToken = data.data.login.token ;
    if(jwToken){
      // window.alert("User Logged");
      await this.props.updateNetworkStatus(true);
      this.props.history.push('/card')
      localStorage.setItem("jwToken", jwToken);
    }
  };
  render() {
    const {classes} = this.props;
    const { login, password } = this.state;
    return (
      <div>
      
       
  
      <Mutation mutation={loginMutation}>
        {(loginfunction, { error, loading }) =>
         ( <form onSubmit={this.handleSubmit(loginfunction)} className={classes.container}>
         <img src={logo} alt="logo" className={classes.textField}/>
              <TextField 
                name="login"
                type="text"
                value={login}
                onChange={this.handleChange}
                variant="outlined"
                label="Email"
                className={classes.textField}
              />
              <br></br>

              <TextField 
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                variant="outlined"
                label="Mot de passe"
                width="500"
                className={classes.textField}
                
              />
       <TextButtons/>
         
         </form>
         )
        }
        
      </Mutation>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose (graphql(updateNetworkStatus, {
  props: ({ mutate }) => ({
   updateNetworkStatus: (input) => mutate({
    variables: {
     isConnected: input,
    },
   }),
  }),
 }),withStyles(styles), withRouter)(Login);