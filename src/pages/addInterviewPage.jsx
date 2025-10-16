import React from "react";
import { Mic, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function AddInterviewPage() {
  const [profLevel, setProfLevel] = React.useState("");
  const [link, setLink] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const profLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleSubmit = async () => {
    if (!profLevel || !link || !difficulty) {
      setStatus("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    setStatus("Uploading interview...");

    try {
      const res = await api.post("/admin/addInterview", {
        prof_level: profLevel,
        link,
        difficulty,
      });

      if (res.status === 200) {
        setStatus("Interview added successfully!");
        setProfLevel("");
        setLink("");
        setDifficulty("");
      } else {
        setStatus("⚠️ Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      setStatus(" Failed to add interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Mic className="w-7 h-7 text-amber-500" />
            Add Interview
          </h1>
          <p className="text-slate-600 mb-8">
            Add or update an interview link for a given proficiency level and difficulty.
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

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition bg-white"
              >
                <option value="">Select difficulty</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Interview Link */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Interview Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter interview link (e.g. YouTube, Drive, etc.)"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>

            {/* Status Message */}
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
              <span>{loading ? "Submitting..." : "Add Interview"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}
