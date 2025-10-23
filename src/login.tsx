import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Type Definitions for API responses and data structures ---

// Describes a generic error response from the API
interface ApiErrorResponse {
    message: string;
}

// --- Component Definition ---

const Login: React.FC = () => {
  const navigate = useNavigate();

  // --- State Management with Types ---
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  // --- Event Handlers and API Logic ---

  /**
   * Handles the form submission to log the user in.
   * @param e - The form submission event.
   */
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    try {
      const response = await fetch("https://webattendbackend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        sessionStorage.setItem("id","1");
         navigate("/submitclass"); 
      } else {
        const errorData: ApiErrorResponse = await response.json();
        setMessage(errorData.message || "Invalid credentials.");
      }
    } catch (error) {
        console.error("Login submission error:", error);
        setMessage("An unexpected error occurred. Please try again.");
    }
  };


  /**
   * Handles the "Forgot password?" link click.
   */
  const forgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMessage("If you forgot your password, please contact an administrator.");
  };

  // --- JSX Rendering ---
  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-8 h-8 mr-2" src="https://placehold.co/32x32/000000/FFFFFF?text=W" alt="logo" />
            WEB ATTEND
          </a>
          <div className="w-full bg-white rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>
              {/* Display messages directly without the Alert component */}
              {message && (
                <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
                  {message}
                </p>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmission}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline" onClick={forgotPassword}>
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <a href="https://mats-edu.vercel.app/signup" className="font-medium text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

