import React, {useState} from "react";
import {Route} from "react-router";
import Home from "../Components/Home";
import Release from "../Components/Release";
import {Bestiary} from "../Components/Bestiary";

export function Routes() {

    return (

        <div>
            <Route path="/"
                   exact render={props => <Home {...props}  />}/>
            <Route path="/home"
                   exact render={props => <Home {...props} />}/>
            <Route path="/bestiary"
                   exact render={props => <Bestiary {...props} />}/>
            <Route path="/release"
                   exact render={props => <Release {...props} />}/>
        </div>
    )
}
