import React from "react";
import { Route, Switch } from "react-router-dom";
import add from "./pages/add";
import index from "./pages/index";
import login from "./pages/login";
import register from "./pages/register";
import profile from "./pages/profile";
import guitars from "./pages/guitars";
import guitar from "./pages/guitar";
import userOffers from "./pages/userOffers"
import userAddOffer from "./pages/userAddOffer";
import userEditOffer from "./pages/userEditOffer";
import userDetailsOffer from "./pages/userDetailsOffer";

class Routes extends React.Component{
   render(){
       return(
           <Switch>
                <Route exact path="/" component={index}/>
                <Route exact path="/add" component={add}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/guitars" component={guitars}/>
                <Route path="/guitars/:id" component={guitar}/>
                <Route exact path="/register" component={register}/>
                <Route exact path="/profile" component={profile}/>
                <Route exact path="/profile/offers" component={userOffers}/>
                <Route exact path="/profile/offers/new" component={userAddOffer}/>
                <Route path="/profile/offers/edit/:id" component={userEditOffer}/>
                <Route path="/profile/offers/:id" component={userDetailsOffer}/>
                <Route render={ function() {return <h1>Not found</h1>;}}/>
            </Switch>
       );
   }
}

export default Routes;
