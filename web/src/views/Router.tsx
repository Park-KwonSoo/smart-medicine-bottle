import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Error from '../components/error';
import { LoginContainer } from "./login";
import { RegisterContainer } from './register';
import { MainContainer } from "./main";
import { BottleInfoContainer } from "./bottleInfo";


const Router = () => {
    return (
        <BrowserRouter>
            <Error />
            <Switch>
                <Route exact path = '/' component = {MainContainer}/>
                <Route exact path = '/login' component = {LoginContainer}/>
                <Route exact path = '/register' component = {RegisterContainer}/>
                <Route exact path = '/bottle/:bottleId' component = {BottleInfoContainer}/>
                <Redirect path = '*' to = '/'/>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;