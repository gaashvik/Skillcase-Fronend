import React from "react";
import { Trash2, RefreshCw } from "lucide-react";
import api from "../api/axios";

export default function DeleteTest() {
  const [proficiency, setProficiency] = React.useState("");
  const [chapterTests, setChapterTests] = React.useState([]);
  const [finalTests, setFinalTests] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const fetchChaptersAndFinal = async () => {
    if (!proficiency) {
      setStatus("Please select a proficiency level");
      return;
    }

    setLoading(true);
    setStatus("Fetching data...");

    try {
      const res = await api.get(`/admin/getTest/${proficiency}`);
      console.log("Response:", res.data);

      const results = res.data.results || {};

      setChapterTests(results.chapter || []);
      setFinalTests(results.final || []);

      setStatus("Data fetched successfully.");
    } catch (err) {
      console.error(err);
      setChapterTests([]);
      setFinalTests([]);
      setStatus("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

 const deleteChapterTest = async (test) => {
  setLoading(true);
  setStatus(`Deleting chapter test "${test.test_name}"...`);

  try {
    await api.post("/admin/deleteChTest", {
      test_id: test.test_id
    });

    setChapterTests((prev) =>
      prev.filter((item) => item.test_id !== test.test_id)
    );

    setStatus(`Chapter test "${test.test_name}" deleted.`);
  } catch (err) {
    console.error(err);
    setStatus("Failed to delete chapter test.");
  } finally {
    setLoading(false);
  }
};

const deleteFinalTest = async (test) => {
  setLoading(true);
  setStatus(`Deleting final test "${test.test_name}"...`);

  try {
    await api.post("/admin/deleteFinalTest", {
      test_id: test.test_id
    });

    setFinalTests((prev) =>
      prev.filter((item) => item.test_id !== test.test_id)
    );

    setStatus(`Final test "${test.test_name}" deleted.`);
  } catch (err) {
    console.error(err);
    setStatus("Failed to delete final test.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Manage Tests
        </h1>

        <div className="space-y-6">

          <select
            value={proficiency}
            onChange={(e) => {
              setProficiency(e.target.value);
              setStatus("");
              setChapterTests([]);
              setFinalTests([]);
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          >
            <option value="">Select Proficiency Level</option>
            {proficiencyLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <button
            onClick={fetchChaptersAndFinal}
            disabled={!proficiency || loading}
            className={`w-full text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-2 ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <RefreshCw className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Loading..." : "Fetch Tests"}</span>
          </button>

          {status && (
            <div className="p-3 bg-blue-100 text-blue-700 rounded text-center">
              {status}
            </div>
          )}

          {finalTests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-green-700 mt-6 mb-2">Final Tests</h2>
              {finalTests.map((test) => (
                <div key={test.test_id} className="flex justify-between p-4 bg-slate-50 rounded-lg shadow-sm mb-2">
                  <div>
                    <p className="font-medium">{test.test_name}</p>
                    <a href={test.test_link} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
                      Open Test
                    </a>
                  </div>
                  <button
                    className="bg-red-500 px-3 py-2 text-white rounded hover:bg-red-600"
                    onClick={() => deleteFinalTest(test)}
                  >
                    <Trash2 className="w-4 h-4 inline" /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {chapterTests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-yellow-700 mt-8 mb-2">Chapter Tests</h2>
              {chapterTests.map((test) => (
                <div key={test.test_id} className="flex justify-between p-4 bg-slate-50 rounded-lg shadow-sm mb-2">
                  <div>
                    <p className="font-medium">{test.test_name}</p>
                    <a href={test.easy_test_link} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
                      Open Test
                    </a>
                  </div>
                  <button
                    className="bg-red-500 px-3 py-2 text-white rounded hover:bg-red-600"
                    onClick={() => deleteChapterTest(test)}
                  >
                    <Trash2 className="w-4 h-4 inline" /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
