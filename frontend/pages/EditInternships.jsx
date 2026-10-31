
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditInternship() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        category: "",
        location: "",
        internshipType: "On-site",

        description: "",
        responsibilities: "",
        requiredSkills: "",
        educationRequirements: "",
        minimumGPA: "",

        numberOfVacancies: 1,
        duration: "",
        startDate: "",

        isPaid: "Paid",
        monthlyAllowance: "",
        benefits: "",

        applicationDeadline: "",
        contactEmail: "",
        additionalInstructions: ""
    });

    // Load existing internship details
    useEffect(() => {

        const fetchInternship = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(
                    `http://localhost:5000/api/internships/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = response.data;

                setFormData({
                    title: data.title || "",
                    company: data.company || "",
                    category: data.category || "",
                    location: data.location || "",
                    internshipType: data.internshipType || "On-site",

                    description: data.description || "",
                    responsibilities: data.responsibilities || "",
                    requiredSkills: data.requiredSkills || "",
                    educationRequirements: data.educationRequirements || "",
                    minimumGPA: data.minimumGPA ?? "",

                    numberOfVacancies: data.numberOfVacancies ?? 1,
                    duration: data.duration || "",
                    startDate: data.startDate
                        ? new Date(data.startDate).toISOString().split("T")[0]
                        : "",

                    isPaid: data.isPaid ? "Paid" : "Unpaid",
                    monthlyAllowance: data.monthlyAllowance ?? "",
                    benefits: data.benefits || "",

                    applicationDeadline: data.applicationDeadline
                        ? new Date(data.applicationDeadline).toISOString().split("T")[0]
                        : "",

                    contactEmail: data.contactEmail || "",
                    additionalInstructions: data.additionalInstructions || ""
                });

            } catch (error) {

                console.log("Fetch error:", error);
                toast.error("Failed to load internship details");

            } finally {
                setLoading(false);
            }
        };

        fetchInternship();

    }, [id]);


    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    // Update internship
    const handleUpdate = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login again");
            return;
        }

        if (!formData.applicationDeadline) {
            toast.error("Please select an application deadline");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadline = new Date(
            `${formData.applicationDeadline}T00:00:00`
        );

        if (deadline < today) {
            toast.error("Application deadline cannot be in the past");
            return;
        }

        const payload = {
            ...formData,

            minimumGPA:
                formData.minimumGPA === ""
                    ? null
                    : Number(formData.minimumGPA),

            numberOfVacancies: Number(formData.numberOfVacancies),

            monthlyAllowance:
                formData.monthlyAllowance === ""
                    ? 0
                    : Number(formData.monthlyAllowance),

            isPaid: formData.isPaid === "Paid",

            startDate: formData.startDate || null
        };

        try {

            setUpdating(true);

            await axios.put(
                `http://localhost:5000/api/internships/${id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Internship updated successfully");

            navigate("/company/internships");

        } catch (error) {

            console.log("Update error:", error);
            console.log("Error response:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to update internship"
            );

        } finally {
            setUpdating(false);
        }
    };


    const inputClass =
        "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

    const labelClass =
        "block mb-2 font-medium text-gray-700";


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading internship details...
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white p-8 rounded-xl shadow">

                    <h1 className="text-3xl font-bold mb-2">
                        Edit Internship
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Update all internship information.
                    </p>


                    <form onSubmit={handleUpdate}>

                        {/* BASIC INFORMATION */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Basic Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">

                            <div>
                                <label className={labelClass}>
                                    Internship Title *
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Company *
                                </label>
                                <input
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Category *
                                </label>
                                <input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Software Engineering"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Location *
                                </label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Internship Type
                                </label>
                                <select
                                    name="internshipType"
                                    value={formData.internshipType}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Internship Description
                        </h2>

                        <div className="space-y-4 mb-6">

                            <div>
                                <label className={labelClass}>
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Responsibilities *
                                </label>
                                <textarea
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows="4"
                                    required
                                />
                            </div>

                        </div>


                        {/* REQUIREMENTS */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Requirements
                        </h2>

                        <div className="space-y-4 mb-6">

                            <div>
                                <label className={labelClass}>
                                    Required Skills *
                                </label>
                                <textarea
                                    name="requiredSkills"
                                    value={formData.requiredSkills}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="React.js, Node.js, MongoDB, Git"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Education Requirements
                                </label>
                                <textarea
                                    name="educationRequirements"
                                    value={formData.educationRequirements}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows="2"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Minimum GPA
                                </label>
                                <input
                                    type="number"
                                    name="minimumGPA"
                                    value={formData.minimumGPA}
                                    onChange={handleChange}
                                    className={inputClass}
                                    min="0"
                                    max="4"
                                    step="0.01"
                                />
                            </div>

                        </div>


                        {/* INTERNSHIP DETAILS */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Internship Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">

                            <div>
                                <label className={labelClass}>
                                    Number of Vacancies *
                                </label>
                                <input
                                    type="number"
                                    name="numberOfVacancies"
                                    value={formData.numberOfVacancies}
                                    onChange={handleChange}
                                    className={inputClass}
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Duration *
                                </label>
                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="6 Months"
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Internship Start Date
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                        </div>


                        {/* COMPENSATION */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Compensation
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">

                            <div>
                                <label className={labelClass}>
                                    Payment Type
                                </label>
                                <select
                                    name="isPaid"
                                    value={formData.isPaid}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Monthly Allowance (LKR)
                                </label>
                                <input
                                    type="number"
                                    name="monthlyAllowance"
                                    value={formData.monthlyAllowance}
                                    onChange={handleChange}
                                    className={inputClass}
                                    min="0"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    Benefits
                                </label>
                                <textarea
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows="3"
                                    placeholder="Certificate, mentorship, transport allowance..."
                                />
                            </div>

                        </div>


                        {/* APPLICATION INFORMATION */}

                        <h2 className="text-xl font-semibold mb-4 text-green-700">
                            Application Information
                        </h2>

                        <div className="space-y-4 mb-8">

                            <div>
                                <label className={labelClass}>
                                    Application Deadline *
                                </label>
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Contact Email *
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Additional Instructions
                                </label>
                                <textarea
                                    name="additionalInstructions"
                                    value={formData.additionalInstructions}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows="3"
                                />
                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/company/internships")}
                                className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={updating}
                                className="w-1/2 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update Internship"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditInternship;
