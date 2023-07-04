import React, { useState } from "react";

/** This is a controlled Form Component.  Actual searching
    is handled by the passed function prop: searchFunc */
const SearchForm = ({searchFunc}) => {
    const [formData, setFormData] = useState({name: ""});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name } = formData;
        try {
            await searchFunc(name);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="SearchForm mb-4">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center justify-content-lg-start gx-0">
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            name="name"
                            placeholder="Enter search term..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-auto">
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary"
                        >Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;