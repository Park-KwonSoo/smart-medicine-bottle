import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from '../components/error';
import Header from '../components/Header';
import { LoginContainer } from "./login";
import { RegisterContainer } from './register';
import { MainContainer } from "./main";
import { BottleInfoContainer } from "./bottleInfo";


const Router = () => {
    return (
        <BrowserRouter>
            <Error />
            <Header />
            <Switch>
                <Route exact path = '/' component = {MainContainer}/>
                <Route exact path = '/login' component = {LoginContainer}/>
                <Route exact path = '/register' component = {RegisterContainer}/>
                <Route exact path = '/bottle' component = {BottleInfoContainer}/>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;