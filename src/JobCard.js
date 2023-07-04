import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import "./JobCard.css";
import CurrentUserContext from "./CurrentUserContext";

/** Single card that displays title, company (if provided),
    salary, and equity */
const JobCard = ({ title, company, salary, equity, id }) => {
    const { applied, apply } = useContext(CurrentUserContext);
    const [hasApplied, setHasApplied] = useState(false);

    const handleApply = (e) => {
        if (applied(id)) return;
        apply(id);
        setHasApplied(true)
    }

    /** Check if already applied and set state of hasApplied */
    useEffect(() => {
        setHasApplied(applied(id));
    }, []);

    return (
        <Card className="JobCard">
            <CardBody>
                <CardTitle style={{fontWeight: "bold"}}>{title}</CardTitle>
                {company ? <CardText>{company}</CardText> : null}
                {salary && <CardText>Salary: {salary}</CardText>}
                {equity && <CardText>Equity: {equity}</CardText>}
                <Button
                    className="btn btn-danger font-weight-bold text-uppercase float-right"                
                    onClick={handleApply}
                    disabled={hasApplied}
                >
                    {hasApplied ? "Applied" : "Apply"}
                </Button>
            </CardBody>
        </Card>
    );
}

export default JobCard;