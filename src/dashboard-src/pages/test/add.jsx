import React from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader, Link2 } from "lucide-react";
import api from "../../../api/axios";

export default function AddTestPage() {
  const [testName, setTestName] = React.useState("");
  const [type, setType] = React.useState("Chapter");
  const [profLevel, setProfLevel] = React.useState("");
  const [link, setLink] = React.useState("");
  const [mediumLink, setMediumLink] = React.useState("");
  const [easyLink, setEasyLink] = React.useState("");
  const [hardLink, setHardLink] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const profLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Test"];
  const testTypes = ["Final", "Chapter"];

  const handleSubmit = async () => {
    if (!type || !profLevel || !testName) {
      setStatus("error:Please fill in all required fields");
      return;
    }

    setLoading(true);
    setStatus("uploading:Uploading test...");

    if (type === 'Chapter') {
      try {
        if (!easyLink || !mediumLink || !hardLink) {
          setStatus("error:Please provide all three difficulty links");
          setLoading(false);
          return;
        }

        const res = await api.post("/admin/addChTest", {
          prof_level: profLevel,
          easy_link: easyLink,
          medium_link: mediumLink,
          hard_link: hardLink,
          test_name: testName,
        });

        if (res.status === 200) {
          setStatus("success:Test added successfully!");
          setTimeout(() => {
            setTestName("");
            setType("");
            setProfLevel("");
            setEasyLink("");
            setMediumLink("");
            setHardLink("");
            setDifficulty("");
            setStatus("");
          }, 2000);
        } else {
          setStatus("error:Unexpected response from server");
        }
      } catch (err) {
        console.error(err);
        setStatus("error:Failed to add test. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        if (!link) {
          setStatus("error:Please provide test link");
          setLoading(false);
          return;
        }

        const res = await api.post("/admin/addFinalTest", {
          prof_level: profLevel,
          link: link,
          test_name: testName,
        });

        if (res.status === 200) {
          setStatus("success:Test added successfully!");
          setTimeout(() => {
            setTestName("");
            setType("");
            setProfLevel("");
            setLink("");
            setDifficulty("");
            setStatus("");
          }, 2000);
        } else {
          setStatus("error:Unexpected response from server");
        }
      } catch (err) {
        console.error(err);
        setStatus("error:Failed to add test. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusInfo = () => {
    if (!status) return null;
    
    const [type, message] = status.split(':');
    
    const statusConfig = {
      success: {
        bg: 'bg-green-50 ',
        border: 'border-green-200 ',
        text: 'text-green-700 ',
        icon: CheckCircle
      },
      error: {
        bg: 'bg-red-50 ',
        border: 'border-red-200 ',
        text: 'text-red-700 ',
        icon: AlertCircle
      },
      uploading: {
        bg: 'bg-blue-50 ',
        border: 'border-blue-200 ',
        text: 'text-blue-700 ',
        icon: Loader
      }
    };

    return { type, message, config: statusConfig[type] };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800  font-bold">
          Add New Test
        </h1>
        <p className="text-sm text-gray-600  mt-1">
          Create a new test for a specific proficiency level
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white  shadow-xs rounded-xl">
        <div className="p-6 space-y-6">
          
          {/* Proficiency Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Proficiency Level
            </label>
            <select
              value={profLevel}
              onChange={(e) => setProfLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800 "
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
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Test Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800 "
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
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Test Name
            </label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter test name"
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
            />
          </div>

          {/* Conditional Link Fields */}
          {type === 'Final' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-800  mb-3">
                Test Link
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://forms.google.com/..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800  mb-3">
                  Easy Test Link
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="url"
                    value={easyLink}
                    onChange={(e) => setEasyLink(e.target.value)}
                    placeholder="https://forms.google.com/..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800  mb-3">
                  Medium Test Link
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
                  <input
                    type="url"
                    value={mediumLink}
                    onChange={(e) => setMediumLink(e.target.value)}
                    placeholder="https://forms.google.com/..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800  mb-3">
                  Hard Test Link
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="url"
                    value={hardLink}
                    onChange={(e) => setHardLink(e.target.value)}
                    placeholder="https://forms.google.com/..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
                  />
                </div>
              </div>
            </>
          )}

          {/* Status Message */}
          {statusInfo && (
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${statusInfo.config.bg} ${statusInfo.config.border}`}>
              <statusInfo.config.icon 
                className={`w-5 h-5 flex-shrink-0 ${statusInfo.config.text} ${
                  statusInfo.type === 'uploading' ? 'animate-spin' : ''
                }`}
              />
              <span className={`text-sm font-medium ${statusInfo.config.text}`}>
                {statusInfo.message}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !type || !profLevel || !testName}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Add Test</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50  border border-blue-200  rounded-xl p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600  flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 ">
            <p className="font-semibold mb-1">Test Link Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600 ">
              <li>Final tests require one link (e.g., Google Form, external assessment)</li>
              <li>Chapter tests require three links for Easy, Medium, and Hard difficulties</li>
              <li>Ensure all links are publicly accessible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
