import { useState, useRef } from "react";
import { 
  BookOpen, Clock, BarChart3, Layers, Award, 
  BarChart2, Play, Bookmark, ChevronDown, ChevronUp, ChevronLeft, ChevronRight 
} from "lucide-react";
import "../css/ChapterSelect.css"
import { useNavigate } from "react-router-dom";
export default function TwoColumnSection() {
  const chaptersByDifficulty = {
    easy: [
      { id: 1, title: "Basic Medical Terminology", difficulty: "Easy", cardCount: 8, estimatedTime: 4, level: "1/3", color: "green", progress: 0 },
      { id: 2, title: "Body Parts & Anatomy", difficulty: "Easy", cardCount: 10, estimatedTime: 5, level: "1/3", color: "green", progress: 0 },
      { id: 3, title: "Common Medical Supplies", difficulty: "Easy", cardCount: 6, estimatedTime: 3, level: "1/3", color: "green", progress: 0 },
      { id: 8, title: "Extra Easy Chapter", difficulty: "Easy", cardCount: 5, estimatedTime: 2, level: "1/3", color: "green", progress: 0 }
    ],
    medium: [
      { id: 4, title: "Clinical Procedures", difficulty: "Medium", cardCount: 12, estimatedTime: 6, level: "2/3", color: "amber", progress: 0 },
      { id: 5, title: "Patient Care & Documentation", difficulty: "Medium", cardCount: 9, estimatedTime: 5, level: "2/3", color: "amber", progress: 0 }
    ],
    hard: [
      { id: 6, title: "Medical Specializations", difficulty: "Hard", cardCount: 15, estimatedTime: 8, level: "3/3", color: "red", progress: 0 },
      { id: 7, title: "Advanced Clinical Terms", difficulty: "Hard", cardCount: 11, estimatedTime: 6, level: "3/3", color: "red", progress: 0 }
    ]
  };

  const getDifficultyStyles = (color) => {
    const styles = {
      green: {
        badge: 'bg-green-400 text-green-900',
        gradient: 'from-green-500 to-emerald-600',
        sectionBg: 'from-slate-800 to-slate-900',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      amber: {
        badge: 'bg-amber-400 text-amber-900',
        gradient: 'from-amber-500 to-orange-600',
        sectionBg: 'from-slate-800 to-slate-900',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600'
      },
      red: {
        badge: 'bg-red-400 text-red-900',
        gradient: 'from-red-500 to-rose-600',
        sectionBg: 'from-slate-800 to-slate-900',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600'
      }
    };
    return styles[color];
  };

  const renderChapterCard = (chapter) => {
    const styles = getDifficultyStyles(chapter.color);
    return (
      <div
        key={chapter.id}
        className="bg-white rounded-3xl shadow-lg transition-all duration-300 overflow-hidden  border-2 border-transparent hover:border-cyan-500 transform hover:-translate-y-2 min-w-[250px] flex-shrink-0"
      >
        <div className={`relative h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-6 flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${styles.badge}`}>
            {chapter.difficulty}
          </div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            {chapter.id}
          </div>
          <BookOpen className="w-20 h-20 text-cyan-400 relative z-10" />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-slate-800 mb-2">{chapter.title}</h3>
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Cards: {chapter.cardCount}</span>
            <span>{chapter.level}</span>
            <span>{chapter.estimatedTime} min</span>
          </div>
          <button  onClick={() => navigate(`/FlashSet/${chapter.id}`)} className={`w-full bg-gradient-to-r ${styles.gradient} text-white py-2 rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer`}>
            Start Learning <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };
  const navigate = useNavigate();
  const [openLevels, setOpenLevels] = useState({ easy: true, medium: false, hard: false });
  const toggleLevel = (level) => setOpenLevels(prev => ({ ...prev, [level]: !prev[level] }));
  const scrollRefs = { easy: useRef(null), medium: useRef(null), hard: useRef(null) };
  const scroll = (level, direction) => {
    const container = scrollRefs[level].current;
    if (!container) return;
    const scrollAmount = 260; // approx one card width
    container.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="w-screen min-h-screen flex flex-col md:flex-row p-5 bg-blue-50">
      {/* Left column */}
      <div className="w-full md:w-1/3 md:mb-20 bg-slate-900 text-white flex flex-col justify-center rounded-3xl m-2 p-10 space-y-6">
        <div className="text-3xl font-bold">Biology - Cells</div>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-green-400" />
          <span>12 Chapters</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <span>Progress</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-amber-500 h-3 rounded-full" style={{ width: "40%" }}></div>
          </div>
        </div>
        <div className="flex gap-3 pt-4 flex-wrap">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Play className="w-5 h-5" /> Practice
          </button>
          <button className="flex items-center gap-2 border border-slate-400 px-4 py-2 rounded-lg hover:bg-slate-800">
            <Bookmark className="w-5 h-5" /> Save
          </button>
        </div>
      </div>

      {/* Right column */}
      <div className="w-full md:w-2/3 p-2 m-2 max-h-screen overflow-y-auto space-y-6 hide-scrollbar">
        {['easy', 'medium', 'hard'].map((level) => {
          const color = level === 'easy' ? 'green' : level === 'medium' ? 'amber' : 'red';
          return (
            <div key={level}>
              {/* Dropdown header */}
              <div
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer bg-gradient-to-r ${getDifficultyStyles(color).sectionBg}`}
                onClick={() => toggleLevel(level)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${getDifficultyStyles(color).iconBg} rounded-xl flex items-center justify-center`}>
                    <Award className={`w-6 h-6 ${getDifficultyStyles(color).iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{level.charAt(0).toUpperCase() + level.slice(1)} Level</h3>
                    <p className="text-white">Click to view chapters</p>
                  </div>
                </div>
                {openLevels[level] ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
              </div>

              {/* Chapters horizontal scroll */}
              {openLevels[level] && (
               <div className="relative mt-4">
  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
    <button onClick={() => scroll(level, "left")} className="p-2 bg-white rounded-full shadow hover:bg-slate-100">
      <ChevronLeft className="w-5 h-5" />
    </button>
  </div>
  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
    <button onClick={() => scroll(level, "right")} className="p-2 bg-white rounded-full shadow hover:bg-slate-100">
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>

  {/* Updated horizontal scroll */}
  <div
    ref={scrollRefs[level]}
    className="flex gap-6 overflow-x-auto scroll-smooth px-12 py-6 hide-scrollbar"
    style={{ overflowY: 'visible' }} // ensures hover animation is not cut
  >
    {chaptersByDifficulty[level].map(chapter => renderChapterCard(chapter))}
  </div>
</div>

              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
