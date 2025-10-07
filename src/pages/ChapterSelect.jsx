import { useState, useRef, use, useEffect } from "react";
import { 
  BookOpen, Clock, BarChart3, Layers, Award, 
  BarChart2, Play, Bookmark, ChevronDown, ChevronUp, ChevronLeft, ChevronRight 
} from "lucide-react";
import "../css/ChapterSelect.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../api/axios";
export default function TwoColumnSection() {
  const {prof_level} = useParams();
  const [chapters, setChapters] = useState([]);
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

  useEffect(() => {
    const getCards = async () => {
        try{
          const res = await api.get(`/practice/allFlashSet/${prof_level}`);
          setChapters(res.data);
          console.log(chapters);
        }
        catch(err){
          console.error(err);
      }
    };
    getCards();
  },[]);

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
        <div className="text-3xl font-bold">{prof_level.toUpperCase()}</div>
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-green-400" />
          <span>{chapters.length} Chapter(s)</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <span>Progress</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-amber-500 h-3 rounded-full" style={{ width: "0%" }}></div>
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
<div className="w-full md:w-2/3 p-2 m-2 max-h-screen overflow-y-auto space-y-4 hide-scrollbar">
  {chapters.map((chapter) => {
    const color = 'amber';
    return (
      <div 
        key={chapter.set_id}
        onClick={() => {
          navigate(`/practice/${prof_level}/${chapter.set_id}?set_name=${encodeURIComponent(chapter.set_name)}`);
        }}
        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gradient-to-r ${getDifficultyStyles(color).sectionBg} hover:opacity-90 transition-all border border-gray-700/50`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 ${getDifficultyStyles(color).iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Award className={`w-5 h-5 ${getDifficultyStyles(color).iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-white truncate">
              {chapter.set_name.charAt(0).toUpperCase() + chapter.set_name.slice(1)}
            </h3>
            <p className="text-sm text-white/60 mt-0.5">
              {chapter.number_of_cards || 0} cards
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0 ml-2" />
      </div>
    );
  })}
</div>
    </section>
  );
}
