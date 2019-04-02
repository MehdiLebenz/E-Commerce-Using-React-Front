import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    fontSize: 20,
    color: '#3b97d3'
    
  },
});
function TextButtons(props) {
  console.log('ko', props);
  const { classes } = props;
  return (
    <div>
    <div align= "center">
      <Button width="1000px" color="primary" className={classes.button}   type="submit" onClick={()=> props.history.push('/')}>
       S'authentifier
      </Button>
      </div>
      <div align="center">
      <a  style={{ textDecoration: 'none', color: 'red' }}href="/register"> Register </a>
      </div>
      </div>
  );
}
TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter( withStyles(styles)(TextButtons));
