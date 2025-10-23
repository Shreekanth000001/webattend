import React, { useState } from "react";

// Helper component for a Chevron Down Icon to style select dropdowns
const ChevronDownIcon = () => (
    <svg className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
);


// The form for selecting individual classes and the date
const ClassSelectionForm = ({ cnum }) => {
  const [inputs, setInputs] = useState(Array(cnum).fill(""));
  const [dt, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError("");

    // Simple validation to ensure all fields are filled
    if (!dt || inputs.some(input => input === "")) {
        setError("Please select a date and fill all class fields.");
        setTimeout(() => setError(""), 3000); // Clear error message after 3 seconds
        return;
    }
    
    const submission =await fetch("https://webattendbackend.onrender.com/api/classDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classes: inputs, date: dt }),
      });
      if (submission.ok) {
    console.log("Submitted Data:", { classes: inputs, date: dt });
      }
      else {
        setError("Submission failed. Please try again.");
        setTimeout(() => setError(""), 3000); 
        return;
      }
    
    // Show a success message
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Clear success message after 3 seconds
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-fade-in">
        {Array.from({ length: cnum }, (_, i) => (
            <div key={i}>
                <label htmlFor={`classname-${i}`} className="block text-sm font-semibold text-gray-700">
                    Class {i + 1}
                </label>
                <div className="relative mt-1">
                    <select
                        id={`classname-${i}`}
                        value={inputs[i]}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="appearance-none w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="" disabled>-- Select a subject --</option>
                        <option value="LANG">Language Arts</option>
                        <option value="AI">Artificial Intelligence</option>
                        <option value="AI Lab">AI Lab</option>
                        <option value="DBMS">Database Management</option>
                        <option value="DBMS Lab">Database Lab</option>
                        <option value="ENG">Engineering</option>
                        <option value="PS">Problem Solving</option>
                    </select>
                    <ChevronDownIcon />
                </div>
            </div>
        ))}

        <div className="pt-2">
            <label htmlFor="date-picker" className="block text-sm font-semibold text-gray-700">
                Select Date
            </label>
            <input
                id="date-picker"
                type="date"
                value={dt}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
        </div>

        <div>
            <button
                type="submit"
                className="w-full font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-3 px-4 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit Schedule
            </button>
        </div>

        {/* Display Error or Success messages */}
        {error && (
            <div className="p-3 bg-red-100 text-red-800 border-l-4 border-red-500 rounded-r-lg text-sm transition-opacity duration-300">
                {error}
            </div>
        )}
        {isSubmitted && (
            <div className="p-3 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-r-lg text-sm transition-opacity duration-300">
                Schedule submitted successfully!
            </div>
        )}
    </form>
  );
};

// Main App component that renders the scheduler
export default function App() {
  const [selectedClassCount, setSelectedClassCount] = useState(null);

  function handleClassChange(event) {
    const value = event.target.value;
    // Set to null if the placeholder is selected, otherwise convert to number
    setSelectedClassCount(value ? Number(value) : null);
  }

    if (sessionStorage.getItem("id") != "1") {
    console.log("No ID found in sessionStorage, redirecting to login.");
    window.location.href = "/login";
  }
  
  // A simple CSS animation for components fading in
  const animationStyle = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-indigo-600 tracking-wider mb-2">WEB ATTEND</h2>
            <h1 className="text-3xl font-bold text-gray-800">
              Daily Class Scheduler
            </h1>
            <p className="mt-2 text-gray-500">
              Plan your academic day with ease.
            </p>
          </div>

          <div className="mt-8">
              <label htmlFor="class-count" className="block text-sm font-semibold text-gray-700">
                How many classes today?
              </label>
              <div className="relative mt-1">
                <select
                  id="class-count"
                  onChange={handleClassChange}
                  defaultValue=""
                  className="appearance-none w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="" disabled>-- Select a count --</option>
                  {[...Array(7).keys()].map(n => (
                      <option key={n+1} value={n + 1}>{n + 1} Class{n > 0 ? 'es' : ''}</option>
                  ))}
                </select>
                <ChevronDownIcon />
              </div>
          </div>

          {/* Conditionally render the form once a class count is selected */}
          {selectedClassCount !== null && <ClassSelectionForm cnum={selectedClassCount} />}
        </div>
         <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Created with React & Tailwind CSS</p>
        </footer>
      </div>
    </>
  );
}

