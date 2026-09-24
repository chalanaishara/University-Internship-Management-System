import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditInternship() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            `http://localhost:5000/api/internships/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {

            setTitle(response.data.title);
            setCompany(response.data.company);
            setLocation(response.data.location);

        })
        .catch(error => {
            console.log(error);
        });

    }, [id]);


    const handleUpdate = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            await axios.put(
                `http://localhost:5000/api/internships/${id}`,
                {
                    title,
                    company,
                    location
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Internship updated successfully");

            navigate("/company/internships");

        } catch (error) {

            console.log("Update error:", error);
            console.log("Error response:", error.response?.data);

        }
    };


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-2xl mx-auto">

                <div className="bg-white p-8 rounded-xl shadow">

                    <h1 className="text-3xl font-bold mb-2">
                        Edit Internship
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Update internship information.
                    </p>


                    <form onSubmit={handleUpdate}>

                        {/* Title */}

                        <div className="mb-4">

                            <label className="block mb-2 font-medium">
                                Internship Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Company */}

                        <div className="mb-4">

                            <label className="block mb-2 font-medium">
                                Company
                            </label>

                            <input
                                type="text"
                                value={company}
                                onChange={(e) =>
                                    setCompany(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Location */}

                        <div className="mb-6">

                            <label className="block mb-2 font-medium">
                                Location
                            </label>

                            <input
                                type="text"
                                value={location}
                                onChange={(e) =>
                                    setLocation(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        >
                            Update Internship
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditInternship;