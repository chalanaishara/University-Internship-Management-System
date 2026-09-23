import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InternshipDetails() {

    const { id } = useParams();

    const [internship, setInternship] = useState(null);

    useEffect(() => {

        axios.get(
            `http://localhost:5000/api/internships/${id}`
        )
        .then(response => {
            setInternship(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, [id]);


const handleApply = async () => {

    console.log("Apply button clicked");

    const token = localStorage.getItem("token");

    console.log("Token:", token);

    try {

        const response = await axios.post(
            `http://localhost:5000/api/applications/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

       console.log(response.data)

    } catch (error) {

        console.log("Application error:", error);
        console.log("Error response:", error.response?.data);

    }
};


    if (!internship) {
        return <p>Loading...</p>;
    }


    return (

        <div>

            <h1>{internship.title}</h1>

            <p>
                Company: {internship.company}
            </p>

            <p>
                Location: {internship.location}
            </p>

            <button onClick={handleApply}>
                Apply
            </button>

        </div>

    );
}

export default InternshipDetails;