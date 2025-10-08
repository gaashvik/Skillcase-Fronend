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
      amber: {
        badge: 'bg-amber-400 text-amber-900',
        gradient: 'from-amber-500 to-orange-600',
        sectionBg: 'from-slate-800 to-slate-900',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600'
      }
    };
    return styles[color];
  };
  const navigate = useNavigate();
  const [openLevels, setOpenLevels] = useState({ easy: true, medium: false, hard: false });
  const scrollRefs = { easy: useRef(null), medium: useRef(null), hard: useRef(null) };


  return (
    <section className="w-screen min-h-screen flex flex-col md:flex-row p-5 bg-blue-50">
      {/* Left column */}
      
      <div className="w-full md:w-1/3 md:mb-20 bg-slate-900 text-white flex flex-col justify-center rounded-3xl md:m-2 p-10 space-y-6">
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
<div className="w-full md:w-2/3 mt-5 max-h-screen overflow-y-auto space-y-4 hide-scrollbar">
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
