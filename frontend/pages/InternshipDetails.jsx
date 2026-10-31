
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function InternshipDetails() {

    const { id } = useParams();

    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    // Fetch internship details
    useEffect(() => {

        const fetchInternship = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `http://localhost:5000/api/internships/${id}`
                );

                setInternship(response.data);

            } catch (error) {
                console.log("Error fetching internship:", error);
                toast.error("Failed to load internship details.");
                setInternship(null);

            } finally {
                setLoading(false);
            }
        };

        fetchInternship();

    }, [id]);


    // Apply for internship
    const handleApply = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to apply for this internship.");
            return;
        }

        try {

            setApplying(true);

            const response = await axios.post(
                `http://localhost:5000/api/applications/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Application submitted successfully!");

            console.log("Application response:", response.data);

        } catch (error) {

            console.log("Application error:", error.response?.data || error);

            toast.error(
                error.response?.data?.message ||
                "Failed to submit application."
            );

        } finally {
            setApplying(false);
        }
    };


    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Loading internship details...
                </p>
            </div>
        );
    }


    // Internship not found
    if (!internship) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Internship Not Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        This internship may have been removed.
                    </p>
                </div>
            </div>
        );
    }


    // Reusable section title
    const SectionTitle = ({ children }) => (
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b">
            {children}
        </h2>
    );


    // Reusable information item
    const InfoItem = ({ label, value }) => (
        <div>
            <p className="text-sm text-gray-500 mb-1">
                {label}
            </p>

            <p className="font-semibold text-gray-800 break-words">
                {value || "Not specified"}
            </p>
        </div>
    );


    // Display comma-separated skills as tags
    const skills = internship.requiredSkills
        ? internship.requiredSkills.split(",").map(skill => skill.trim()).filter(Boolean)
        : [];


    return (

        <div className="min-h-screen bg-gray-100 p-6 md:p-8">

            <div className="max-w-4xl mx-auto space-y-6">


                {/* Header */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <div className="flex flex-wrap items-center gap-3 mb-4">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {internship.category || "Internship"}
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {internship.internshipType || "Not specified"}
                        </span>

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {internship.title}
                    </h1>

                    <div className="flex flex-wrap gap-5 text-gray-600">

                        <p>
                            🏢 {internship.company}
                        </p>

                        <p>
                            📍 {internship.location}
                        </p>

                    </div>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Duration
                            </p>
                            <p className="font-semibold mt-1">
                                {internship.duration || "Not specified"}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Vacancies
                            </p>
                            <p className="font-semibold mt-1">
                                {internship.numberOfVacancies ?? "Not specified"}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Compensation
                            </p>
                            <p className="font-semibold mt-1">
                                {internship.isPaid
                                    ? "Paid"
                                    : "Unpaid"}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Monthly Allowance
                            </p>
                            <p className="font-semibold mt-1">
                                {internship.isPaid
                                    ? `LKR ${Number(internship.monthlyAllowance || 0).toLocaleString()}`
                                    : "N/A"}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Job Description */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Internship Description
                    </SectionTitle>

                    <p className="text-gray-700 leading-7 whitespace-pre-line">
                        {internship.description || "No description provided."}
                    </p>

                </div>


                {/* Responsibilities */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Roles & Responsibilities
                    </SectionTitle>

                    <p className="text-gray-700 leading-7 whitespace-pre-line">
                        {internship.responsibilities || "Not specified."}
                    </p>

                </div>


                {/* Requirements */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Requirements
                    </SectionTitle>

                    <div className="space-y-6">

                        <div>
                            <p className="font-semibold text-gray-700 mb-3">
                                Required Technical Skills
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {skills.length > 0 ? (
                                    skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No skills specified.
                                    </p>
                                )}

                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <InfoItem
                                label="Education Requirements"
                                value={internship.educationRequirements}
                            />

                            <InfoItem
                                label="Minimum GPA"
                                value={internship.minimumGPA != null
                                    ? internship.minimumGPA
                                    : "No minimum GPA"}
                            />

                        </div>

                    </div>

                </div>


                {/* Internship Information */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Internship Information
                    </SectionTitle>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <InfoItem
                            label="Internship Duration"
                            value={internship.duration}
                        />

                        <InfoItem
                            label="Number of Vacancies"
                            value={internship.numberOfVacancies}
                        />

                        <InfoItem
                            label="Expected Start Date"
                            value={internship.startDate
                                ? new Date(internship.startDate).toLocaleDateString()
                                : "Not specified"}
                        />

                        <InfoItem
                            label="Internship Type"
                            value={internship.internshipType}
                        />

                    </div>

                </div>


                {/* Benefits */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Compensation & Benefits
                    </SectionTitle>

                    <div className="space-y-5">

                        <InfoItem
                            label="Internship Type"
                            value={internship.isPaid ? "Paid Internship" : "Unpaid Internship"}
                        />

                        {internship.isPaid && (
                            <InfoItem
                                label="Monthly Allowance"
                                value={`LKR ${Number(internship.monthlyAllowance || 0).toLocaleString()}`}
                            />
                        )}

                        <div>
                            <p className="text-sm text-gray-500 mb-2">
                                Other Benefits
                            </p>

                            <p className="text-gray-800 leading-7 whitespace-pre-line">
                                {internship.benefits || "No additional benefits specified."}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Application Details */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <SectionTitle>
                        Application Information
                    </SectionTitle>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <InfoItem
                            label="Application Deadline"
                            value={internship.applicationDeadline
                                ? new Date(internship.applicationDeadline).toLocaleDateString()
                                : "Not specified"}
                        />

                        <InfoItem
                            label="Contact Email"
                            value={internship.contactEmail}
                        />

                    </div>

                    <div className="mt-6">

                        <p className="text-sm text-gray-500 mb-2">
                            Additional Instructions
                        </p>

                        <p className="text-gray-800 leading-7 whitespace-pre-line">
                            {internship.additionalInstructions || "No additional instructions."}
                        </p>

                    </div>

                </div>


                {/* Apply Button */}

                <div className="bg-white p-6 md:p-8 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-3">
                        Interested in this Internship?
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Submit your application and take the next step in your career.
                    </p>

                    <button
                        onClick={handleApply}
                        disabled={applying}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {applying
                            ? "Submitting Application..."
                            : "Apply for Internship"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default InternshipDetails;
