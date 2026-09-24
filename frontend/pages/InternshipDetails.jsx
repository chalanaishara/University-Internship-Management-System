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

            window.alert("Application submitted successfully!");

            console.log(
                "Application response:",
                response.data
            );

        } catch (error) {

            console.log(
                "Application error:",
                error
            );

            console.log(
                "Error response:",
                error.response?.data
            );
        }
    };


    if (!internship) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Loading...
                </p>
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    {internship.title}
                </h1>

                <div className="space-y-4">

                    <div>
                        <p className="text-gray-500">
                            Company
                        </p>

                        <p className="text-lg font-semibold">
                            {internship.company}
                        </p>
                    </div>


                    <div>
                        <p className="text-gray-500">
                            Location
                        </p>

                        <p className="text-lg font-semibold">
                            {internship.location}
                        </p>
                    </div>

                </div>


                <button
                    onClick={handleApply}
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Apply for Internship
                </button>

            </div>

        </div>
    );
}

export default InternshipDetails;