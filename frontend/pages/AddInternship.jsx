
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddInternship() {

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

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Get today's date
    const today = new Date().toLocaleDateString("en-CA");

    // Submit internship
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first.");
            return;
        }

        if (formData.applicationDeadline < today) {
            toast.error("Application deadline cannot be in the past.");
            return;
        }

        if (
            formData.isPaid === "Paid" &&
            formData.monthlyAllowance &&
            Number(formData.monthlyAllowance) < 0
        ) {
            toast.error("Allowance cannot be negative.");
            return;
        }

        const internshipData = {
            ...formData,
            numberOfVacancies: Number(formData.numberOfVacancies),
            minimumGPA: formData.minimumGPA
                ? Number(formData.minimumGPA)
                : null,
            monthlyAllowance: formData.monthlyAllowance
                ? Number(formData.monthlyAllowance)
                : 0,
            isPaid: formData.isPaid === "Paid"
        };

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/internships",
                internshipData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Internship added:", response.data);

            toast.success("Internship added successfully!");

            setFormData({
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

        } catch (error) {
            console.log("Error:", error.response?.data || error);

            toast.error(
                error.response?.data?.message ||
                "Failed to add internship."
            );

        } finally {
            setLoading(false);
        }
    };

    // Reusable input styling
    const inputStyle =
        "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

    const labelStyle = "block mb-2 font-medium text-gray-700";

    const sectionStyle =
        "text-xl font-semibold text-gray-800 mb-5 pb-2 border-b";

    const requiredMark = <span className="text-red-500">*</span>;

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-8">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white p-6 md:p-10 rounded-xl shadow">

                    <h1 className="text-3xl font-bold mb-2">
                        Add Internship
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Create a new internship opportunity for university students.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* 01. Basic Information */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                01. Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className={labelStyle}>
                                        Internship Title {requiredMark}
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. MERN Stack Developer Intern"
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Company Name {requiredMark}
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. WSO2"
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Internship Category {requiredMark}
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={inputStyle}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Software Engineering">
                                            Software Engineering
                                        </option>
                                        <option value="Web Development">
                                            Web Development
                                        </option>
                                        <option value="Mobile Development">
                                            Mobile Development
                                        </option>
                                        <option value="QA Engineering">
                                            QA Engineering
                                        </option>
                                        <option value="UI/UX Design">
                                            UI/UX Design
                                        </option>
                                        <option value="Network Engineering">
                                            Network Engineering
                                        </option>
                                        <option value="Data Science">
                                            Data Science
                                        </option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Work Location {requiredMark}
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Colombo"
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                            </div>

                            <div className="mt-5">

                                <label className={labelStyle}>
                                    Internship Type {requiredMark}
                                </label>

                                <select
                                    name="internshipType"
                                    value={formData.internshipType}
                                    onChange={handleChange}
                                    className={inputStyle}
                                >
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>

                            </div>

                        </section>


                        {/* 02. Job Description */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                02. Job Description
                            </h2>

                            <div className="mb-5">

                                <label className={labelStyle}>
                                    Internship Description {requiredMark}
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe the internship opportunity..."
                                    className={inputStyle}
                                    required
                                />

                            </div>

                            <div>

                                <label className={labelStyle}>
                                    Roles and Responsibilities {requiredMark}
                                </label>

                                <textarea
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe the responsibilities and daily tasks..."
                                    className={inputStyle}
                                    required
                                />

                            </div>

                        </section>


                        {/* 03. Requirements */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                03. Requirements
                            </h2>

                            <div className="mb-5">

                                <label className={labelStyle}>
                                    Required Technical Skills {requiredMark}
                                </label>

                                <textarea
                                    name="requiredSkills"
                                    value={formData.requiredSkills}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="e.g. React, Node.js, MongoDB, Git..."
                                    className={inputStyle}
                                    required
                                />

                                <p className="text-sm text-gray-500 mt-1">
                                    Separate skills using commas.
                                </p>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className={labelStyle}>
                                        Education Requirements
                                    </label>

                                    <input
                                        type="text"
                                        name="educationRequirements"
                                        value={formData.educationRequirements}
                                        onChange={handleChange}
                                        placeholder="e.g. Undergraduate in IT"
                                        className={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Minimum GPA
                                    </label>

                                    <input
                                        type="number"
                                        name="minimumGPA"
                                        value={formData.minimumGPA}
                                        onChange={handleChange}
                                        placeholder="e.g. 2.5"
                                        min="0"
                                        max="4"
                                        step="0.01"
                                        className={inputStyle}
                                    />
                                </div>

                            </div>

                        </section>


                        {/* 04. Internship Details */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                04. Internship Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className={labelStyle}>
                                        Number of Vacancies {requiredMark}
                                    </label>

                                    <input
                                        type="number"
                                        name="numberOfVacancies"
                                        value={formData.numberOfVacancies}
                                        onChange={handleChange}
                                        min="1"
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Internship Duration {requiredMark}
                                    </label>

                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className={inputStyle}
                                        required
                                    >
                                        <option value="">Select Duration</option>
                                        <option value="3 Months">3 Months</option>
                                        <option value="6 Months">6 Months</option>
                                        <option value="12 Months">12 Months</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelStyle}>
                                        Expected Start Date
                                    </label>

                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        min={today}
                                        className={inputStyle}
                                    />
                                </div>

                            </div>

                        </section>


                        {/* 05. Compensation and Benefits */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                05. Compensation & Benefits
                            </h2>

                            <div className="mb-5">

                                <label className={labelStyle}>
                                    Internship Compensation
                                </label>

                                <div className="flex gap-6">

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="isPaid"
                                            value="Paid"
                                            checked={formData.isPaid === "Paid"}
                                            onChange={handleChange}
                                        />
                                        Paid Internship
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="isPaid"
                                            value="Unpaid"
                                            checked={formData.isPaid === "Unpaid"}
                                            onChange={handleChange}
                                        />
                                        Unpaid Internship
                                    </label>

                                </div>

                            </div>

                            {formData.isPaid === "Paid" && (
                                <div className="mb-5">

                                    <label className={labelStyle}>
                                        Monthly Allowance (LKR)
                                    </label>

                                    <input
                                        type="number"
                                        name="monthlyAllowance"
                                        value={formData.monthlyAllowance}
                                        onChange={handleChange}
                                        placeholder="e.g. 25000"
                                        min="0"
                                        className={inputStyle}
                                    />

                                </div>
                            )}

                            <div>

                                <label className={labelStyle}>
                                    Other Benefits
                                </label>

                                <textarea
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="e.g. Certificate, mentorship, transportation allowance..."
                                    className={inputStyle}
                                />

                            </div>

                        </section>


                        {/* 06. Application Details */}

                        <section className="mb-10">

                            <h2 className={sectionStyle}>
                                06. Application Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className={labelStyle}>
                                        Application Deadline {requiredMark}
                                    </label>

                                    <input
                                        type="date"
                                        name="applicationDeadline"
                                        value={formData.applicationDeadline}
                                        onChange={handleChange}
                                        min={today}
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelStyle}>
                                        Contact Email {requiredMark}
                                    </label>

                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        placeholder="hr@company.com"
                                        className={inputStyle}
                                        required
                                    />
                                </div>

                            </div>

                            <div className="mt-5">

                                <label className={labelStyle}>
                                    Additional Instructions
                                </label>

                                <textarea
                                    name="additionalInstructions"
                                    value={formData.additionalInstructions}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Any additional information for applicants..."
                                    className={inputStyle}
                                />

                            </div>

                        </section>


                        {/* Submit Button */}

                        <div className="flex flex-col sm:flex-row gap-4">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                {loading ? "Publishing..." : "Publish Internship"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
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
                                }}
                                className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Clear Form
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddInternship;
