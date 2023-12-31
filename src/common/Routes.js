import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "../company/CompanyList";
import JobList from "../job/JobList";
import CompanyDetails from "../company/CompanyDetails";
import Login from "../user/forms/Login";
import NewUserForm from "../user/forms/NewUserForm";
import EditProfileForm from "../user/forms/EditProfileForm";
import PrivateRoute from "./PrivateRoute";


const RouteList = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <NewUserForm />
            </Route>
            <PrivateRoute exact path="/companies/:handle">
                <CompanyDetails />
            </PrivateRoute>
            <PrivateRoute exact path="/companies">
                <CompanyList />
            </PrivateRoute>
            <PrivateRoute exact path="/jobs">
                <JobList />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
                <EditProfileForm />
            </PrivateRoute>
            <Redirect to="/"/>
        </Switch>
        </>
    );
}

export default RouteList;