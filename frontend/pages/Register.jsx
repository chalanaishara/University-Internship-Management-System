import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [mobile,setMobile]=useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                    role,
                    mobile
                }
            );

            console.log("Registration successful");
            toast.success("Registration successful. Please login.");
            console.log(response.data);
            navigate("/login");

        } catch (error) {
            toast.error("Registration failed. Please try again.");

            console.log(error);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                <form onSubmit={handleRegister}>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="mb-6">

                        <label className="block mb-2 font-medium">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >

                            <option value="student">
                                Student
                            </option>

                            <option value="company">
                                Company
                            </option>

                        </select>

                    </div>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            mobile
                        </label>

                        <input
                            type="phone"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
                            }
                            placeholder="Enter your mobile Number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Register
                    </button>

                     <p className="text-center mt-4 text-gray-600">
                      If you already have an account, please{" "}
                      <button
                        type="button"
                        onClick={()=>navigate("/login")}
                        className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </button>
                        {" "}here.

                    </p>


                </form>

            </div>

        </div>
    );
}

export default Register;