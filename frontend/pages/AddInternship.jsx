import { useState } from "react";
import axios from "axios";

function AddInternship() {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            const response = await axios.post(
                "http://localhost:5000/api/internships",
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

            console.log("Internship added:", response.data);

            // Clear form
            setTitle("");
            setCompany("");
            setLocation("");

        } catch (error) {

            console.log("Error adding internship:", error);
            console.log("Error response:", error.response?.data);

        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-2xl mx-auto">

                <div className="bg-white p-8 rounded-xl shadow">

                    <h1 className="text-3xl font-bold mb-2">
                        Add Internship
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Create a new internship opportunity.
                    </p>


                    <form onSubmit={handleSubmit}>

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
                                placeholder="e.g. MERN Developer Intern"
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
                                placeholder="e.g. WSO2"
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
                                placeholder="e.g. Colombo"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        >
                            Add Internship
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddInternship;