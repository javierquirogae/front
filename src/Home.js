import React, { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";

const Home = () => {
    const {currUser} = useContext(CurrentUserContext);

    return (
        <div className="pt-5">
            <div className="container text-center">
                <h1 className="mb-4 fw-bold">Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
                {currUser
                ? <h2>Welcome Back, {currUser.username}!</h2>
                : <p>
                    <a className="btn btn-primary fw-bold me-3" href="/login">Log In</a>
                    <a className="btn btn-primary fw-bold me-3" href="/signup">Sign Up</a>
                </p>}
            </div>
        </div>
    );
}

export default Home;