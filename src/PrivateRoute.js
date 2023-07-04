import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";

const PrivateRoute = ({exact, path, children}) => {
    const { currUser } = useContext(CurrentUserContext);
    
    if (!currUser) {
        return <Redirect to="/login" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;