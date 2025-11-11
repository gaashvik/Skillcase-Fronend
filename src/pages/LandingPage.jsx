import React,{useEffect} from "react";
import { BookOpen, FileText, Video, ArrowRight, Mic } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';


export default function LandingPage() {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (!user){
      navigate('/Login');
    }
  })
  const services = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Practice via Flashcards",
      description: "Master concepts through interactive flashcards designed to reinforce your learning and improve retention.",
      color: "bg-blue-500",
      link: "#practice"
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Take Tests",
      description: "Assess your knowledge with comprehensive tests that track your progress and identify areas for improvement.",
      color: "bg-emerald-500",
      link: "#test"
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: "Mock Interviews(Coming soon)",
      description: "Prepare for real interviews with AI-powered mock sessions that provide instant feedback and guidance.",
      color: "bg-amber-500",
      link: "#interview"
    },
    {
      icon: <Mic className="w-12 h-12" />,
      title: "Pronounce",
      description: "Practice pronunciation with voice recording and get feedback on your speaking skills.",
      color: "bg-purple-500",
      link: "#pronounce"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
      <section id="home" className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <div className="space-y-6">
            {user ? (<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight ">
              Welcome, {user.username.slice(0,1).toUpperCase()+user.username.slice(1,user.username.length+1)}
            </h1>):(            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Master Your Skills with Expert Guidance
            </h1>
            )
            }
            <p className="text-lg text-slate-600 leading-relaxed">
              Learn, practice, and improve with our four tools — Flashcards, Take Test, Interview, and Pronounce — everything you need to study better and grow faster.
            </p>
            
            {!user?.user_id &&<Link
              to="/login"
              className="bg-[#F9C235] text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition flex items-center space-x-2 text-lg font-semibold group inline-flex"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>}
          </div>

          <div className="relative w-full">
            {user ? (
              // Logged-in user view: Show action cards in 2x2 grid
              <div className="grid grid-cols-2 gap-4 w-full">
                <Link
                  to={user?.user_prof_level ? (`/practice/${user?.user_prof_level}`):('practice/test')}
                  className="bg-[#FFD54F] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-center text-white">
                    <div className="text-lg sm:text-xl font-bold mb-1">Flashcards</div>
                    <div className="text-xs sm:text-sm opacity-90">Practice</div>
                  </div>
                </Link>

                <Link
                  to={user?.user_prof_level ? (`/test/${user?.user_prof_level}`):('test/test')}
                  className="bg-[#1976D2] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-center text-white">
                    <div className="text-lg sm:text-xl font-bold mb-1">Take Test</div>
                    <div className="text-xs sm:text-sm opacity-90">Assessments</div>
                  </div>
                </Link>

                <Link
                  to={user?.user_prof_level ? (`/interview/${user?.user_prof_level}`):('interview/test')}
                  className="bg-gray-500 to-amber-600 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group pointer-events-none cursor-not-allowed opacity-60"
                >
                  <Video className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-center text-white">
                    <div className="text-lg sm:text-xl font-bold mb-1">Mock Interview</div>
                    <div className="text-xs sm:text-sm opacity-90">Coming Soon</div>
                  </div>
                </Link>

                <Link
                  to={user?.user_prof_level ? (`/pronounce/${user?.user_prof_level}`):('pronounce/test')}
                  className="bg-[#81D4FA] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-center text-white">
                    <div className="text-lg sm:text-xl font-bold mb-1">Pronounce</div>
                    <div className="text-xs sm:text-sm opacity-90">Voice Practice</div>
                  </div>
                </Link>
              </div>
            ) : (
              // Non-logged-in user view: Show stats grid
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-4">
                  <div className="bg-[#FFD54F] rounded-2xl p-6 h-44 sm:h-48 flex items-center justify-center shadow-xl">
                    <div className="text-center text-white">
                      <div className="text-3xl sm:text-4xl font-bold">50K+</div>
                      <div className="text-xs sm:text-sm mt-2 opacity-90">Active Learners</div>
                    </div>
                  </div>
                  <div className="bg-[#1976D2] to-blue-600 rounded-2xl p-6 h-56 sm:h-64 flex items-center justify-center shadow-xl">
                    <div className="text-center text-white">
                      <div className="text-3xl sm:text-4xl font-bold">95%</div>
                      <div className="text-xs sm:text-sm mt-2 opacity-90">Success Rate</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-[#81D4FA] to-emerald-500 rounded-2xl p-6 h-56 sm:h-64 flex items-center justify-center shadow-xl">
                    <div className="text-center text-white">
                      <div className="text-3xl sm:text-4xl font-bold">1000+</div>
                      <div className="text-xs sm:text-sm mt-2 opacity-90">Practice Tests</div>
                    </div>
                  </div>
                  <div className="bg-[#37474F] rounded-2xl p-6 h-44 sm:h-48 flex items-center justify-center shadow-xl">
                    <div className="text-center text-white">
                      <div className="text-3xl sm:text-4xl font-bold">24/7</div>
                      <div className="text-xs sm:text-sm mt-2 opacity-90">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}