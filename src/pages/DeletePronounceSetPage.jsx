import React from "react";
import { Trash2, RefreshCw } from "lucide-react";
import api from "../api/axios";

export default function DeletePronounceSet() {
  const [proficiency, setProficiency] = React.useState("");
  const [chapters, setChapters] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Test"];

  // Fetch chapters for selected proficiency
  const fetchChapters = async () => {
    if (!proficiency) {
      setStatus("Please select a proficiency level");
      return;
    }

    setLoading(true);
    setStatus("Fetching chapters...");

    try {
      const res = await api.get(`/admin/getPronounceChapters/${proficiency}`);

      // Normalize response: assume array of objects with pronounce_name
      const data = Array.isArray(res.data) ? res.data : res.data.chapters;

      if (data && data.length > 0) {
        setChapters(data);
        setStatus(`Found ${data.length} chapters`);
      } else {
        setChapters([]);
        setStatus("No chapters found for this level.");
      }
    } catch (err) {
      console.error(err);
      setChapters([]);
      setStatus("Error fetching chapters.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a chapter
  const handleDelete = async (chapterName) => {
    if (!window.confirm(`Are you sure you want to delete "${chapterName}"?`)) return;

    setLoading(true);
    setStatus(`Deleting "${chapterName}"...`);

    try {
      await api.post("/admin/deletePronounceSet", {
        pronounce_name: chapterName,
        proficiency_level: proficiency,
      });

      setStatus(`"${chapterName}" deleted successfully!`);
      setChapters((prev) => prev.filter((ch) => ch.pronounce_name !== chapterName));
    } catch (err) {
      console.error(err);
      setStatus(`Failed to delete "${chapterName}".`);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Delete Flashcard Sets
            </h1>
            <p className="text-slate-600">
              Remove specific flashcard chapters from the database
            </p>
          </div>

          <div className="space-y-6">
            {/* Select proficiency */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Proficiency Level
              </label>
              <select
                value={proficiency}
                onChange={(e) => {
                  setProficiency(e.target.value);
                  setChapters([]);
                  setStatus("");
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">Select a proficiency level</option>
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Fetch chapters button */}
            <button
              onClick={fetchChapters}
              disabled={!proficiency || loading}
              className={`w-full text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin text-white/70" : ""}`}
              />
              <span>{loading ? "Loading..." : "Fetch Chapters"}</span>
            </button>

            {/* Status message */}
            {status && (
              <div
                className={`p-4 rounded-lg text-center ${
                  status.toLowerCase().includes("error") ||
                  status.toLowerCase().includes("fail")
                    ? "bg-red-100 text-red-700"
                    : status.toLowerCase().includes("delete")
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {status}
              </div>
            )}

            {/* Chapters list */}
            {chapters.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Chapters in {proficiency}
                </h2>
                <div className="space-y-3">
                  {chapters.map((chapter) => (
                    <div
                      key={chapter.set_id || chapter.pronounce_name}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg shadow-sm"
                    >
                      <p className="font-medium text-slate-800">{chapter.pronounce_name}</p>
                      <button
                        onClick={() => handleDelete(chapter.pronounce_name)}
                        disabled={loading}
                        className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    // </div>
  );
}
