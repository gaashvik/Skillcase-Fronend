import React from "react";
import { BookOpen, FileText, Video, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const {user} = useSelector((state) => state.auth);
  
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
      title: "Mock Interviews",
      description: "Prepare for real interviews with AI-powered mock sessions that provide instant feedback and guidance.",
      color: "bg-amber-500",
      link: "#interview"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white w-screen">
{/* Mobile Quick Access Widgets - Only shown when user is logged in */}
{user && (
  <div className="md:hidden bg-slate-100 px-4 py-6 flex flex-row items-center">
    <div className="flex w-full gap-4 justify-between">
      <Link
        to={user?.user_prof_level ? (`/practice/${user?.user_prof_level}`):('practice/test')}
        className="flex-1 bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
      >
        <BookOpen className="w-10 h-10 text-blue-500 mx-auto mb-3" />
        <span className="text-sm font-semibold text-slate-900 block">Practice</span>
        <span className="text-xs text-slate-600 block mt-1">Flashcards</span>
      </Link>

      <Link
        to="/test"
        className="flex-1 bg-slate-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
      >
        <FileText className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <span className="text-sm font-semibold text-white block">Take</span>
        <span className="text-xs text-slate-300 block mt-1">Tests</span>
      </Link>

      <Link
        to="/interview"
        className="flex-1 bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
      >
        <Video className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <span className="text-sm font-semibold text-slate-900 block">Mock</span>
        <span className="text-xs text-slate-600 block mt-1">Interview</span>
      </Link>
    </div>
  </div>
)}

      
      <section id="home" className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Master Your Skills with Expert Guidance
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Discover personalized learning paths and get the expert support you need 
              to excel in your career, from preparation to professional success.
            </p>
            
            <Link
              to="/login"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition flex items-center space-x-2 text-lg font-semibold group inline-flex"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="relative w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-6 h-44 sm:h-48 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">50K+</div>
                    <div className="text-xs sm:text-sm mt-2 opacity-90">Active Learners</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 h-56 sm:h-64 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">95%</div>
                    <div className="text-xs sm:text-sm mt-2 opacity-90">Success Rate</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl p-6 h-56 sm:h-64 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">1000+</div>
                    <div className="text-xs sm:text-sm mt-2 opacity-90">Practice Tests</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 h-44 sm:h-48 flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <div className="text-3xl sm:text-4xl font-bold">24/7</div>
                    <div className="text-xs sm:text-sm mt-2 opacity-90">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Learning Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our comprehensive suite of learning tools designed to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <a
                key={index}
                href={service.link}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group block"
              >
                <div className={`${service.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-slate-900 font-semibold flex items-center space-x-2 group-hover:text-amber-500 transition">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 lg:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition font-semibold">
              Get Started Free
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg hover:bg-slate-100 transition font-semibold">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}