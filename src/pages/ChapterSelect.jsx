import { useState, useRef, use, useEffect } from "react";
import { 
  BookOpen, Clock, BarChart3, Layers, Award, 
  BarChart2, Play, Bookmark, ChevronDown, ChevronUp, ChevronLeft, ChevronRight ,Check
} from "lucide-react";

import "../css/ChapterSelect.css"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function TwoColumnSection() {
  const {prof_level} = useParams();
  const [chapters, setChapters] = useState([]);
  const [progress,setProgress] = useState(0);

  useEffect(() => {
    const getCards = async () => {
        try{
          const res = await api.get(`/practice/allFlashSet/${prof_level}`);
          setChapters(res.data);
          const chapter_num = res.data.length;
          const completed_chap_num = res.data.filter(ch => ch.test_status).length;
          console.log(chapter_num);
          console.log(completed_chap_num);
          const prog = (completed_chap_num/chapter_num)*100;
          console.log(prog);
          setProgress(prog);
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
        iconColor: 'text-amber-600',
        mobileBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        mobileHover: 'hover:from-amber-600 hover:to-orange-700'
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
<div className="w-full md:w-1/3 md:mb-20 bg-slate-900 text-white flex flex-col md:flex-col justify-between md:justify-center rounded-3xl md:m-2 p-10 space-y-3">
  <div className='flex flex-col md:flex-col space-y-4 md:space-y-6'>
    <div className="text-5xl md:text-3xl font-bold">{prof_level.toUpperCase()}</div>
    <div className="flex items-center gap-2">
      <Layers className="w-5 h-5 text-green-400 flex-shrink-0" />
      <span className="whitespace-nowrap">{chapters.length} Chapter(s)</span>
    </div>
    <div>
      <div className="flex gap-2 mb-2 items-center">
        <BarChart2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <span>Progress</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
  <div className="flex gap-3 pt-4">
    <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg">
      <Play className="w-5 h-5" /> Practice
    </button>
    <button className="flex items-center gap-2 border border-slate-400 px-4 py-2 rounded-lg hover:bg-slate-800">
      <Bookmark className="w-5 h-5" />
    </button>
  </div>
</div>

      {/* Right column - Desktop: List view, Mobile: Grid view */}
      <div className="w-full md:w-2/3 mt-5 max-h-screen overflow-y-auto hide-scrollbar">
        {/* Desktop View - List */}
        <div className="hidden md:block space-y-4">
          {chapters.map((chapter) => {
            const color = 'amber';
            return (
              <div 
                key={chapter.set_id}
                onClick={() => {
                  navigate(`/practice/${prof_level}/${chapter.set_id}?set_name=${encodeURIComponent(chapter.set_name)}&test_status=${chapter.test_status}`);
                }}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gradient-to-r ${getDifficultyStyles(color).sectionBg} hover:opacity-90 transition-all border border-gray-700/50`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 ${getDifficultyStyles(color).iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {!chapter.test_status ? (<Award className={`w-5 h-5 ${getDifficultyStyles(color).iconColor}`} />):(<Check className="text-green-500 w-5 h-5" />)}
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

        {/* Mobile View - Grid/Heatmap */}
        <div className="md:hidden grid grid-cols-3 gap-2">
          {chapters.map((chapter) => {
            const color = 'amber';
            return (
              <div 
                key={chapter.set_id}
                onClick={() => {
                  navigate(`/practice/${prof_level}/${chapter.set_id}?set_name=${encodeURIComponent(chapter.set_name)}&test_status=${chapter.test_status}`);
                }}
                className={`bg-gradient-to-br ${getDifficultyStyles(color).sectionBg} rounded-xl p-3 cursor-pointer transition-all active:scale-95 shadow-md border border-gray-700/50 flex flex-col justify-between min-h-[100px] hover:opacity-90`}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-7 h-7 ${getDifficultyStyles(color).iconBg} rounded-lg flex items-center justify-center mb-2`}>
                    {!chapter.test_status ? (<Award className={`w-5 h-5 ${getDifficultyStyles(color).iconColor}`} />):(<Check className="text-green-500 w-5 h-5" />)}
                  </div>
                  <h3 className="text-xs font-semibold text-white leading-tight mb-1 flex-grow line-clamp-2">
                    {chapter.set_name.charAt(0).toUpperCase() + chapter.set_name.slice(1)}
                  </h3>
                  <div className="mt-auto pt-1">
                    <span className="text-[10px] text-white/60 font-medium">
                      {chapter.number_of_cards || 0} cards
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}