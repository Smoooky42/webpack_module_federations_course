import React from 'react';
import {Link, Outlet} from "react-router-dom";


export const App = () => {

    return (
        <div data-testid = {'App.DataTestId'}>
            <h1> APP </h1>
            <Link to={"/about"}> ABOUT </Link>
            <br/>
            <Link to={'/shop/main'}> SHOP </Link>
            <Outlet/>
        </div>
    )
};
