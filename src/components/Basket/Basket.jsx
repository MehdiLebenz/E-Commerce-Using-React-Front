import React, { Component } from 'react'; 
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import BasketNavBar from '../NavBars/BasketNavBar';
import { Typography  } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';



const basketItems = gql `
query basketItems{
  basket @client {
    id
    productName
    productPrice
    image
    description
    createdAt
    brand
    quantity
  }
}
`;

const styles = {
 form:{
  backgroundColor: grey,
  width: '50%',
  justifyContent: 'center',
  marginTop: '9%',
  marginLeft:'25%',
  textAlign:'center',
  height: 'auto',
  fontSize: 22,
  textTransform: 'capitalize',
  boxShadow: '0px 0px 6px 2px #0006',
 },
 p:{
  fontSize: 15,
  padding: 10,
  margin: 'auto',
  marginLeft: 20,
 },
 paragraphe:{
  fontSize: 15,
  padding: 10,
  margin: 'auto',
  marginLeft: 20,
 },
 prix:{
  margin: 'auto',
  padding: 15,
  marginRight: 15,
 }
};


class Basket extends Component{
render(){
  const {classes} = this.props;
  return(
    <div>
      <header>
        <BasketNavBar/>
      </header>
    <Query query={basketItems}>
{({error, loading,data})=> {
  if (error) return <h3> Error </h3>;
  if (loading) return <h3>Loading</h3>;
  // console.log(data);
  // return <h3>OK</h3>
  let somme = 0;
const Produit = data.basket.map(product => { 
  somme += parseInt(product.productPrice,10)*parseInt(product.quantity,10);
  return(
<div>
<p align="left" className={classes.p}> Marque : {product.brand}</p>
<p align="left" className={classes.paragraphe}> Article : {product.productName}</p>
<p align="right" className={classes.prix}>Quantité : {product.quantity}</p>
<p align="right" className={classes.prix}>Prix :{product.productPrice}</p>
{/* <p>{product.quantity * product.productPrice}</p>
<p> Total des achats : {somme}</p> */}
</div>
 )});

 const TotalPrice = somme;
 return(
//    <div>
// <h3 align="center">Vos Achats</h3>
// <p> Online Store vous remercie de votre confiance , nous vous prions de bien vouloir trouver ci dessous les détails de vos achats : </p>
// <div align="center">
<div>
<form className={classes.form}> Les détails de vos achats 
  {Produit} <br></br>
  Total de vos achats :{TotalPrice}
  </form>
</div>
//   </div>
// </div>
 );
 }}
    </Query>
    </div>
    
  );
}}

Basket.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Basket);