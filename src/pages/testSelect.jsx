import { useState, useEffect } from "react";
import {
  BookOpen, Clock, BarChart3, Layers, Award,
  BarChart2, Play, FileText, Target, ChevronRight, Trophy,RefreshCw
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function TestSelect() {
  const { prof_level } = useParams();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [finalTest, setFinalTest] = useState(null);
  const [chapterTests, setChapterTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status,setStatus] = useState('')
  const navigate = useNavigate();

  // Open/close overlay
  const openOverlay = (test) => {
    setSelectedTest(test);
    setIsOverlayOpen(true);
  };
  const closeOverlay = () => {
    setSelectedTest(null);
    setIsOverlayOpen(false);
  };

  // Disable background scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "auto";
  }, [isOverlayOpen]);

  // Fetch tests
  useEffect(() => {
    const getTests = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/test/get/${prof_level}`);
        setFinalTest(res.data.results.final[0]);
        setChapterTests(res.data.results.chapter);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setStatus('could not fetch test');
        setLoading(false);
      }
    };
    getTests();
  }, [prof_level]);

  const getDifficultyStyles = (difficulty) => {
    const styles = {
      Easy: {
        gradient: "from-green-500 to-emerald-600",
        sectionBg: "from-slate-800 to-slate-900",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        badge: "bg-green-400 text-green-900",
        buttonBg: "bg-green-500 hover:bg-green-600",
      },
      Medium: {
        gradient: "from-amber-500 to-orange-600",
        sectionBg: "from-slate-800 to-slate-900",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        badge: "bg-amber-400 text-amber-900",
        buttonBg: "bg-amber-500 hover:bg-amber-600",
      },
      Hard: {
        gradient: "from-red-500 to-rose-600",
        sectionBg: "from-slate-800 to-slate-900",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        badge: "bg-red-400 text-red-900",
        buttonBg: "bg-red-500 hover:bg-red-600",
      },
    };
    return styles[difficulty] || styles.Easy;
  };


  const difficulty = finalTest?.difficulty || "Easy";
  const styles = getDifficultyStyles(difficulty);

  return (
    <section className="w-screen bg-gray-100 min-h-screen flex flex-col md:flex-row p-5">
      {/* Left column - Desktop only */}
      <div className="hidden md:flex md:w-1/3 flex-col gap-4 md:m-2 md:h-screen md:sticky md:top-0">
        {/* Test Info Block */}
        <div className="bg-slate-900 text-white rounded-3xl p-10 space-y-6 md:flex-1 md:flex md:flex-col md:justify-center">
          <div className="text-5xl md:text-3xl font-bold">
            {prof_level.toUpperCase()} Tests
          </div>

          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="whitespace-nowrap">
              Chapter Tests: {chapterTests.length}
            </span>
          </div>
        </div>

        {/* Final Test Block */}
        {finalTest && (
          <div
            className={`bg-gradient-to-br ${styles.sectionBg} text-white rounded-3xl p-10 space-y-6 border border-gray-700/50 md:flex-1 md:flex md:flex-col md:justify-center`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <Trophy className={`w-6 h-6 ${styles.iconColor}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{finalTest.test_name}</h3>
              </div>
            </div>

            <div className="space-y-2 text-white/80 text-sm">
              <p>Complete all chapter tests to unlock the final assessment</p>
              <p>Test your overall knowledge of {prof_level} level</p>
            </div>

            <button
              onClick={() => window.open(finalTest.test_link, "_blank")}
              className={`w-full ${styles.buttonBg} text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg`}
            >
              <Play className="w-5 h-5" />
              Start Final Test
            </button>
          </div>
        )}
      </div>

      {/* Mobile header - Test Info Block */}
      <div className="md:hidden bg-slate-900 text-white rounded-3xl p-8 space-y-4 mb-5">
        <div className="text-4xl font-bold">
          {prof_level.toUpperCase()} Tests
        </div>

        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="whitespace-nowrap">
            Chapter Tests: {chapterTests.length}
          </span>
        </div>
      </div>

      {/* Right column - Chapter Tests */}
      <div className="w-full md:w-2/3 md:mt-2 max-h-screen overflow-y-auto hide-scrollbar">
       {loading && (<div className="min-h-[400px] flex justify-center items-center">
      <RefreshCw className={`w-7 h-7 ${loading ? "animate-spin" : ""}`} />
      </div>)}
        {/* Desktop List View */}
        <div className="hidden md:block space-y-4">
          {chapterTests.map((test) => {
            const testStyles = getDifficultyStyles("Medium");
            return (
              <div
                key={test.test_id}
                onClick={() => openOverlay(test)}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gradient-to-r ${testStyles.sectionBg} hover:opacity-90 transition-all border border-gray-700/50`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 ${testStyles.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <FileText className={`w-5 h-5 ${testStyles.iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white truncate">
                      {test.test_name.charAt(0).toUpperCase() +
                        test.test_name.slice(1)}
                    </h3>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0 ml-2" />
              </div>
            );
          })}
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden grid grid-cols-3 gap-3">
          {chapterTests.map((test) => {
            const testStyles = getDifficultyStyles("Medium");
            return (
              <div
                key={test.test_id}
                onClick={() => openOverlay(test)}
                className={`bg-gradient-to-br ${testStyles.sectionBg} rounded-xl p-4 cursor-pointer transition-all active:scale-95 shadow-md border border-gray-700/50 flex flex-col justify-between min-h-[120px] hover:opacity-90`}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`w-8 h-8 ${testStyles.iconBg} rounded-lg flex items-center justify-center mb-2`}
                  >
                    <FileText className={`w-5 h-5 ${testStyles.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-tight mb-2 flex-grow line-clamp-2">
                    {test.test_name.charAt(0).toUpperCase() +
                      test.test_name.slice(1)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Final Test Block - Appears at bottom */}
      {finalTest && (
        <div
          className={`md:hidden bg-gradient-to-br ${styles.sectionBg} text-white rounded-3xl p-8 space-y-6 border border-gray-700/50 mt-5`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <Trophy className={`w-6 h-6 ${styles.iconColor}`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{finalTest.test_name}</h3>
            </div>
          </div>

          <div className="space-y-2 text-white/80 text-sm">
            <p>Complete all chapter tests to unlock the final assessment</p>
            <p>Test your overall knowledge of {prof_level} level</p>
          </div>

          <button
            onClick={() => window.open(finalTest.test_link, "_blank")}
            className={`w-full ${styles.buttonBg} text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg`}
          >
            <Play className="w-5 h-5" />
            Start Final Test
          </button>
        </div>
      )}

      {/* Overlay */}
      {isOverlayOpen && selectedTest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative transform transition-all duration-300 scale-100">
            <button
              onClick={closeOverlay}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedTest.test_name}
            </h2>
            <p className="text-gray-600 mb-4">
              Ready to test your knowledge for this chapter? Click below to start.
            </p>
            <div className="space-y-6">
            <button
              onClick={() => window.open(selectedTest.easy_test_link, "_blank")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 w-full font-semibold"
            >
              Easy Test
            </button>
            <button
              onClick={() => window.open(selectedTest.medium_test_link, "_blank")}
              className="bg-amber-600 text-white px-4 py-2 rounded-xl hover:bg-amber-700 w-full font-semibold"
            >
              Medium Test
            </button>
            <button
              onClick={() => window.open(selectedTest.hard_test_link, "_blank")}
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 w-full font-semibold"
            >
              Hard Test
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}