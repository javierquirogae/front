import React, { useState, useContext } from "react";
import "./NewUserForm.css";
import { Form, Label, Input, Button, FormGroup, Card, CardBody } from "reactstrap";
import CurrentUserContext from "./CurrentUserContext";

const NewUserForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const {register} = useContext(CurrentUserContext);
    const [dupName, setDupName] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
        } catch (error) {
            if (error[0].includes("Duplicate username")) {
                debugger;
                setDupName(true);
            }
        }
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Sign Up</h2>
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
                                <FormGroup>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <p>
                                    <Button>Submit</Button>
                                    {dupName
                                    ? <span style={{color: "red", paddingLeft: 20}}>Username {formData.username} already in use</span>
                                    : null}
                                </p>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default NewUserForm;