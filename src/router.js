import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/Routing/PrivateRoute';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Login from './components/Login/Login';
import CardPage from './components/Cards/CardPage';
import Register from './components/Login/Register';
import Basket from './components/Basket/Basket';



const connectedQuery = gql`
query connectQuery{
isConnected @client
}
`;

function Routers() {
return (
    <Query query={connectedQuery} >
{
    ({loading,error,data}) => {
        if(loading) return (<h4>loading...</h4>);
        if(error) return (`${error}`);
        const {isConnected} = data;
        return(
            <Router>
 <div>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route  exact path="/card" component={CardPage} isConnected={isConnected}/>
    <Route path="/basket" component={Basket} isConnected={isConnected}/>
    
    </div>
</Router>
        )
    }
}
</Query>
);
}
export default Routers;
