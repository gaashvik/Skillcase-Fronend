import React from "react";
import { Mic, Upload, CheckCircle, AlertCircle, Loader, Link2 } from "lucide-react";
import api from "../../../api/axios";

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
      setStatus("error:Please fill in all fields before submitting");
      return;
    }

    setLoading(true);
    setStatus("uploading:Uploading interview...");

    try {
      const res = await api.post("/admin/addInterview", {
        prof_level: profLevel,
        link,
        difficulty,
      });

      if (res.status === 200) {
        setStatus("success:Interview added successfully!");
        setTimeout(() => {
          setProfLevel("");
          setLink("");
          setDifficulty("");
          setStatus("");
        }, 2000);
      } else {
        setStatus("error:Unexpected server response");
      }
    } catch (err) {
      console.error(err);
      setStatus("error:Failed to add interview. Please try again.");
    } finally {
      setLoading(false);
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

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-100  flex items-center justify-center">
            <Mic className="w-5 h-5 text-blue-600 " />
          </div>
          <h1 className="text-2xl md:text-3xl text-gray-800  font-bold">
            Add Interview
          </h1>
        </div>
        <p className="text-sm text-gray-600  ml-13">
          Add or update an interview link for a specific proficiency level and difficulty
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

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800 "
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
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Interview Link
            </label>
            <div className="relative">
              <Link2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${difficulty ? getDifficultyColor(difficulty) : 'text-gray-400'}`} />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://youtube.com/... or https://drive.google.com/..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800  placeholder-gray-400 "
              />
            </div>
          </div>

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
            disabled={loading || !profLevel || !link || !difficulty}
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
                <span>Add Interview</span>
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
            <p className="font-semibold mb-1">Interview Link Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600 ">
              <li>Supported platforms: YouTube, Google Drive, Vimeo, or direct video links</li>
              <li>Ensure the link is publicly accessible or properly shared</li>
              <li>Test the link before submitting to verify it works correctly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Difficulty Legend */}
      <div className="mt-6 bg-white  shadow-xs rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-800  mb-3">
          Difficulty Levels
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 ">Easy - Basic questions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600 ">Medium - Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600 ">Hard - Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
