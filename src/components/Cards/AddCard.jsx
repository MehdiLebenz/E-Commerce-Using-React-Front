import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_CARD} from '../../graphql/mutations/CardMutations/CardAdd';
import PropTypes from 'prop-types';
import allProducts from '../../graphql/queries/AllProducts';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
button : {
  display: 'flex',
  padding: 0,
  margin: 'auto',
  marginTop: 50,
  marginBottom: 50,
  button: theme.spacing.unit,
},
all: {
  display: 'block',
  textAlign: 'center',
},

});

    
class Ajouterproduit extends Component {
constructor(props){
  super(props);
  if(props)
  this.state = {
    productName : '',
    productPrice: '', 
    brand: '',
    description: '',
    createdAt: '',
    image:'',
    quantity:'',
  }}
  // handleSubmit = async (event) => {
  // const {files} = event.target.files[0];
  // console.log(event.target.files[0])
  //     let image;
     
  //       const data = new FormData();
  
  //       data.append('file', files);
  //       data.append('upload_preset', 'dvp6lksu9');
  
  //       const res = await fetch('https://cloudinary.com/console/media_library/folders/all/Image', {
  //         method: 'POST',
  //         headers :{
  //           "access-control-allow-origin": "localhost",
  //           "access-control-allow-credentials": "true"
  //       },
  //         body: data,
  //       }); 
  
  //       const file = await res.json();
  //       if (!file.error) {
  //         image = file.secure_url;
  //         console.log('k',image)
  //       } else {
  //        console.log(file.error)
  //         return null;
      
  //       }
      
  //   }
componentWillReceiveProps(props){
  if (props.allProducts){
    const {me} = props;
    this.setState({...me});
  }
}
handleChange = ( event ) => {
  const { target: {  name, value} } = event;
  this.setState({[name]: value});
}

add = async (ajout) => {
  try {
    const result = await ajout();
    window.alert('okey');
    this.props.close();
  }catch(error){
    window.alert(error);
  }
}
render(){
  const {classes}= this.props;
  const {id, productName, productPrice, brand, description, createdAt, image, quantity} = this.state;
  const variables = { productName, productPrice, brand, description, createdAt, image, quantity};
  const action = ADD_CARD ; 
  return(
<Mutation mutation= {action} variables={{ProductInput: {...variables}}} refetchQueries={[{query: allProducts}]}>
{(AddCard) => (
<div className={classes.all}>

<TextField
  label="productName"
  value={productName}
  onChange={this.handleChange}
  margin="normal"
  name ="productName"
  />  
  <TextField
  label="productPrice"
  value={productPrice}
  onChange={this.handleChange}
  margin="normal"
  name ="productPrice"
  />  
    <TextField
  label="image"
  value={image}
  // type="file"
  onChange={this.handleSubmit}
  name ="image"
  
  />  
    <TextField
  label="createdAt"
  value={createdAt}
  onChange={this.handleChange}
  margin="normal"
  name ="createdAt"
  />  
   <TextField
  label="brand"
  value={brand}
  onChange={this.handleChange}
  margin="normal"
  name ="brand"
  /> 
   <TextField
  label="description"
  value={description}
  onChange={this.handleChange}
  margin="normal"
  name ="description"
  />
  <TextField
  label="quantity"
  value={quantity}
  onChange={this.handleChange}
  margin="normal"
  name ="quantity"
  />
   <Fab size="small" color="black" aria-label="Add" className={classes.button} onClick={()=>{this.add(AddCard)}}>
     <AddIcon  />
   </Fab>
</div>

)}

</Mutation>
  );
}}
Ajouterproduit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles) (Ajouterproduit);






