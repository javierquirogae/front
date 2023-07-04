import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";
import { CardColumns } from "reactstrap";
import JobCard from "./JobCard.js";

/** Displays name and description of a company and lists
    all jobs of that company */
const CompanyDetails = () => {
    const { handle } = useParams();

    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompany() {
            try {
            const res = await JoblyApi.getCompany(handle);
            setCompany(res.company);
            setJobs(res.company.jobs);
            setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany();
    }, []);

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <CardColumns>
                {jobs.map(({title, salary, equity, id}) => (
                    <JobCard title={title} salary={salary} equity={equity} id={id}/>
                ))}
            </CardColumns>
        </div>
    );
}

export default CompanyDetails;