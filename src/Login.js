import React, { useContext, useState } from "react";
import { Form, Label, Input, Button, FormGroup, Card, CardBody } from "reactstrap";
import CurrentUserContext from "./CurrentUserContext";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [badLogin, setBadLogin] = useState(false);
    const {login} = useContext(CurrentUserContext);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = formData;
        try {
            await login(username, password);
            setBadLogin(false);
        } catch (error) {
            if (error[0] === 'Invalid username/password') {
                setBadLogin(true);
            }
        }
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Login</h2>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="paswword">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <p>
                                    <Button>Submit</Button>
                                    {badLogin
                                    ? <span style={{color: "red", paddingLeft: 20}}>Invalid Username/Password</span>
                                    : null}
                                </p>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login;