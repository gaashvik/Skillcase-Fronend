import React from "react";
import { Trash2, RefreshCw, AlertCircle, CheckCircle, Loader, Mic, ExternalLink } from "lucide-react";
import api from "../../../api/axios";

export default function DeleteInterview() {
  const [proficiency, setProficiency] = React.useState("");
  const [interviews, setInterviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [deletingInterview, setDeletingInterview] = React.useState(null);

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  // Fetch interviews for selected proficiency
  const fetchInterviews = async () => {
    if (!proficiency) {
      setStatus("error:Please select a proficiency level");
      return;
    }

    setLoading(true);
    setStatus("loading:Fetching interviews...");

    try {
      const res = await api.get(`/admin/getInterview/${proficiency}`);

      // Normalize response: assume array of objects
      const data = Array.isArray(res.data) ? res.data : res.data.chapters;

      if (data && data.length > 0) {
        setInterviews(data);
        setStatus(`success:Found ${data.length} interviews`);
      } else {
        setInterviews([]);
        setStatus("info:No interviews found for this level");
      }
    } catch (err) {
      console.error(err);
      setInterviews([]);
      setStatus("error:Error fetching interviews");
    } finally {
      setLoading(false);
    }
  };

  // Delete an interview
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete the "${item.difficulty}" interview?`)) return;

    setDeletingInterview(item.interview_id);
    setStatus(`deleting:Deleting "${item.difficulty}" interview...`);

    try {
      await api.post("/admin/deleteInterview", {
        interview_id: item.interview_id
      });

      setStatus(`success:"${item.difficulty}" interview deleted successfully!`);
      setInterviews((prev) => prev.filter((ch) => ch.interview_id !== item.interview_id));
      
      setTimeout(() => {
        if (interviews.length === 1) {
          setStatus("");
        }
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus(`error:Failed to delete "${item.difficulty}" interview`);
    } finally {
      setDeletingInterview(null);
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
      info: {
        bg: 'bg-blue-50 ',
        border: 'border-blue-200 ',
        text: 'text-blue-700 ',
        icon: AlertCircle
      },
      loading: {
        bg: 'bg-blue-50 ',
        border: 'border-blue-200 ',
        text: 'text-blue-700 ',
        icon: Loader
      },
      deleting: {
        bg: 'bg-amber-50 ',
        border: 'border-amber-200 ',
        text: 'text-amber-700 ',
        icon: Loader
      }
    };

    return { type, message, config: statusConfig[type] };
  };

  const getDifficultyBadge = (difficulty) => {
    const config = {
      Easy: 'bg-green-100  text-green-700 ',
      Medium: 'bg-yellow-100  text-yellow-700 ',
      Hard: 'bg-red-100  text-red-700 '
    };
    return config[difficulty] || 'bg-gray-100  text-gray-700 ';
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-100  flex items-center justify-center">
            <Mic className="w-5 h-5 text-blue-600 " />
          </div>
          <h1 className="text-2xl md:text-3xl text-gray-800  font-bold">
            Delete Interviews
          </h1>
        </div>
        <p className="text-sm text-gray-600  ml-13">
          Remove specific interview recordings from the database
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white  shadow-xs rounded-xl">
        <div className="p-6 space-y-6">
          
          {/* Select Proficiency Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-800  mb-3">
              Proficiency Level
            </label>
            <select
              value={proficiency}
              onChange={(e) => {
                setProficiency(e.target.value);
                setInterviews([]);
                setStatus("");
              }}
              className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white  text-gray-800 "
            >
              <option value="">Select proficiency level</option>
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Interviews Button */}
          <button
            onClick={fetchInterviews}
            disabled={!proficiency || loading}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Loading..." : "Fetch Interviews"}</span>
          </button>

          {/* Status Message */}
          {statusInfo && (
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${statusInfo.config.bg} ${statusInfo.config.border}`}>
              <statusInfo.config.icon 
                className={`w-5 h-5 flex-shrink-0 ${statusInfo.config.text} ${
                  (statusInfo.type === 'loading' || statusInfo.type === 'deleting') ? 'animate-spin' : ''
                }`}
              />
              <span className={`text-sm font-medium ${statusInfo.config.text}`}>
                {statusInfo.message}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interviews List */}
      {interviews.length > 0 && (
        <div className="mt-6 bg-white  shadow-xs rounded-xl">
          <div className="px-5 py-4 border-b border-gray-100 ">
            <h2 className="font-semibold text-gray-800 ">
              Interviews in {proficiency} ({interviews.length})
            </h2>
          </div>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-500  bg-gray-50  border-t border-b border-gray-200 ">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                      <div className="font-semibold">Difficulty</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                      <div className="font-semibold">Link</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                      <div className="font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-200 ">
                  {interviews.map((interview) => (
                    <tr 
                      key={interview.interview_id}
                      className="hover:bg-gray-50 "
                    >
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyBadge(interview.difficulty)}`}>
                          {interview.difficulty}
                        </div>
                      </td>
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <a 
                          href={interview.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1 text-blue-600  hover:text-blue-700 "
                        >
                          <span className="text-sm">View Interview</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDelete(interview)}
                          disabled={deletingInterview === interview.interview_id}
                          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingInterview === interview.interview_id ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Warning Info Card */}
      <div className="mt-6 bg-red-50  border border-red-200  rounded-xl p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600  flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700 ">
            <p className="font-semibold mb-1">Warning:</p>
            <p className="text-red-600 ">
              Deleting an interview will permanently remove it from the system. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
