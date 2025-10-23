import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function AddTestPage() {
  const [testName, setTestName] = React.useState("");
  const [type, setType] = React.useState("Chapter");
  const [profLevel, setProfLevel] = React.useState("");
  const [link, setLink] = React.useState("");
  const [mediumLink,setMediumLink] =  React.useState("");
  const [easyLink,setEasyLink] =  React.useState("");
  const [hardLink,setHardLink] =  React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const profLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Test"];
  const testTypes = ["Final", "Chapter"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleSubmit = async () => {
    if (!type || !profLevel || !testName) {
      setStatus("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setStatus("Uploading test...");
    if (type === 'Chapter'){

    try {
       if (!easyLink || !mediumLink || !hardLink) {
      setStatus("Please fill in all required fields");
      return;
    }
      const res = await api.post("/admin/addChTest", {
        prof_level: profLevel,
        easy_link:easyLink,
        medium_link:mediumLink,
        hard_link:hardLink,
        test_name: testName,
      });

      if (res.status === 200) {
        setStatus("Test added successfully!");
        setTestName("");
        setType("");
        setProfLevel("");
        setEasyLink("");
        setMediumLink("");
        setHardLink("");
        setDifficulty("");
      } else {
        setStatus("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to add test. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  else{
      if (!link) {
      setStatus("Please fill in all required fields");
      return;
    }
    try {
      const res = await api.post("/admin/addFinalTest", {
        prof_level: profLevel,
        link:link,
        test_name: testName,
      });

      if (res.status === 200) {
        setStatus("Test added successfully!");
        setTestName("");
        setType("");
        setProfLevel("");
        setLink("");
        setDifficulty("");
      } else {
        setStatus("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to add test. Please try again.");
    } finally {
      setLoading(false);
    }

  }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Add New Test
          </h1>
          <p className="text-slate-600 mb-8">
            Create or update a test for a specific proficiency level.
          </p>

          <div className="space-y-6">
           {/* Proficiency Level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Proficiency Level
              </label>
              <select
                value={profLevel}
                onChange={(e) => setProfLevel(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
              >
                <option value="">Select proficiency level</option>
                {profLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Test Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Test Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
              >
                <option value="">Select test type</option>
                {testTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Test Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Enter test name"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>

            {type === 'Final' ? (<>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Test Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter link to test (e.g. Google Form, PDF, etc.)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>
            </>):(<>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Easy Link
              </label>
              <input
                type="url"
                value={easyLink}
                onChange={(e) => setEasyLink(e.target.value)}
                placeholder="Enter link to test (e.g. Google Form, PDF, etc.)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Medium Link
              </label>
              <input
                type="url"
                value={mediumLink}
                onChange={(e) => setMediumLink(e.target.value)}
                placeholder="Enter link to test (e.g. Google Form, PDF, etc.)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hard Link
              </label>
              <input
                type="url"
                value={hardLink}
                onChange={(e) => setHardLink(e.target.value)}
                placeholder="Enter link to test (e.g. Google Form, PDF, etc.)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>
            
            </>)}

    
            {status && (
              <div
                className={`p-4 rounded-lg text-center ${
                  status.includes("✅")
                    ? "bg-emerald-100 text-emerald-700"
                    : status.includes("⚠️")
                    ? "bg-yellow-100 text-yellow-700"
                    : status.includes("❌")
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {status}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition font-semibold text-lg flex items-center justify-center space-x-2 group disabled:opacity-70"
            >
              <span>{loading ? "Submitting..." : "Add Test"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}
