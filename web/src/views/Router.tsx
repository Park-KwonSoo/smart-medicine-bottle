import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginContainer } from "./login";
import { MainContainer } from "./main";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component = {MainContainer}/>
                <Route exact path = '/login' component = {LoginContainer}/>
            </Switch>
        </BrowserRouter>
    )
};

export default Router;