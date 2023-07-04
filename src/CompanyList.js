import React, { useState, useEffect } from "react";
import JoblyApi from "./api.js";
import { CardColumns } from "reactstrap";
import CompanyCard from "./CompanyCard.js";
import SearchForm from "./SearchForm.js";
import "./CompanyList.css";

const CompanyList = () => {

    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getCompanies() {
            const res = await JoblyApi.getAllCompanies();
            setCompanies(res);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    async function searchCompanies(searchTerm) {
        setIsLoading(true);
        let res;
        if (searchTerm === "") {
            res = await JoblyApi.getAllCompanies();
        } else {
            res = await JoblyApi.searchCompanies(searchTerm);
        }
        setCompanies(res);
        setIsLoading(false);
    }

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFunc={searchCompanies}/>
            <CardColumns>
                {companies.map(({ name, description, handle }) => (
                    <CompanyCard name={name} description={description} key={handle} handle={handle}/>
                ))}
            </CardColumns>
        </div>
    );
}

export default CompanyList;