import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );


            // Save JWT
            localStorage.setItem(
                "token",
                response.data.token
            );


            // Decode JWT
            const token = response.data.token;

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );


            // Get role
            const role = payload.role;

            console.log("Login successful");
            console.log("Role:", role);
            toast.success("Login successful");


            // Redirect according to role
            if (role === "company") {

                navigate("/company/dashboard");

            } else if (role === "student") {

                navigate("/");

            }


        } catch (error) {

            console.log("Login error:", error);
            console.log("Error response:",error.response?.data?.message);
            
            toast .error ("Invalid email or password");
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>


                <form onSubmit={handleLogin}>

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


                    <div className="mb-6">

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


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                      If you don't have an account, please{" "}
                      <button
                        type="button"
                        onClick={()=>navigate("/register")}
                        className="text-blue-600 font-medium hover:underline"
                        >
                            Register
                        </button>
                        {" "}first.

                    </p>

                </form>

            </div>


        </div>

    );
     
}

export default Login;