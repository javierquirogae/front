import React, { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import { CardColumns } from "reactstrap";
import JobCard from "./JobCard.js";
import SearchForm from "./SearchForm.js";
import { v4 as uuid } from 'uuid';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getJobs() {
            const res = await JoblyApi.getAllJobs();
            setJobs(res);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    async function searchJobs(searchTerm) {
        setIsLoading(true);
        let res;
        if (searchTerm === "") {
            res = await JoblyApi.getAllJobs();
        } else {
            res = await JoblyApi.searchJobs(searchTerm);
        }
        setJobs(res);
        setIsLoading(false);
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFunc={searchJobs}/>
            <CardColumns>
                {jobs.map(({ title, companyName, salary, equity, id }) => (
                    <JobCard
                        title={title}
                        company={companyName}
                        salary={salary}
                        equity={equity}
                        key={uuid()}
                        id={id}
                    />
                ))}
            </CardColumns>
        </div>
    );
}

export default JobList;