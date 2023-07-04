import React, { useContext, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";
import { Form, Label, Input, Button, FormGroup, Card, CardBody } from "reactstrap";

const EditProfileForm = () => {
    const {currUser, userUpdate} = useContext(CurrentUserContext);
    const [formData, setFormData] = useState({
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email
    });
    const [submitStatus, setSubmitStatus] = useState("init");
    
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
            const res = await userUpdate(currUser.username, formData);
            if (res) {
                setSubmitStatus("success");
            }
        } catch (error) {
            setSubmitStatus("fail");
        }
    }

    return (
        <div className="pt-5">
            <div className="ProfileEditForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Profile</h2>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        disabled
                                        id="username"
                                        name="username"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={currUser.username} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={formData.firstName} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={formData.lastName} 
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        placeholder={formData.email} 
                                    />
                                </FormGroup>
                                <p>
                                    <Button>Save Changes</Button>
                                    {submitStatus === "success"
                                    ? <span style={{color: "green", paddingLeft: 20}} >Updated Successfully</span>
                                    : submitStatus === "fail"
                                    ? <span style={{color: "red", paddingLeft: 20}} >Something went wrong.</span>
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

export default EditProfileForm;