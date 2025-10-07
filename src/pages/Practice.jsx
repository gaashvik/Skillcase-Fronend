import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Practice() {
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent full page reload
    if (language) {
      navigate(`/next-page?language=${language}`); 
    }
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center lg:items-end justify-between">
        {/* Left Side */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-slate-300 text-lg max-w-md">
            Join thousands of successful learners who have transformed their careers with our platform
          </p>
        </div>

        {/* Right Side */}
        <form 
          onSubmit={handleSubmit}
          className="lg:w-1/2 flex flex-col sm:flex-row items-center gap-4 justify-end"
        >
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white text-slate-900 font-medium w-full sm:w-auto"
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>

          <button 
            type="submit" 
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition font-semibold w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
