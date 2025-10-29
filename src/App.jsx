import React,{useEffect} from 'react';
import { BookOpen, FileText, Video, ArrowRight, Menu, X } from 'lucide-react';
import { BrowserRouter, Routes, Route , useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddFlashSet from './pages/AddFlashSetPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Practice from './pages/Practice';
import { useDispatch, useSelector } from "react-redux";
import ChapterSelect from './pages/ChapterSelect';
import TestSelect from './pages/testSelect';
import FlashcardStudyPage from './pages/FlashCard';
import LoginSignupPage from './pages/LoginSignupPage';
import DeleteFlashSet from './pages/deleteFlashSetPage';
import AddInterviewPage from './pages/addInterviewPage';
import AddTestPage from './pages/addTestPage';
import api from "./api/axios"
import InterviewSelect from './pages/interviewSelect';
import { setUser, logout } from './redux/auth/authSlice';
import AdminDashboard from './pages/admin';
import VoiceRecorder from './pages/test';
import ProSelect from './pages/pronounceSelect';
// import CardOverlayExample from './components/testOverlay';
import Pronounce from './pages/pronounce';
import AddPronounceSet from './pages/AddPronounceSetPage';
import DeletePronounceSet from './pages/DeletePronounceSetPage';
if (typeof global === 'undefined') {
  window.global = window;
}

export default function App() {
  const dispatch = useDispatch();
  const {token,user} = useSelector((state)=>state.auth);
  useEffect(()=>{
    const fetchUser = async () => {
      if (token && !user){
        try{
          const res = await api.get("/user/me");
          dispatch(setUser(res.data));
        }
        catch(err){
          console.error("Token expired or invalid");
          dispatch(logout());
        }
      }
    };
    fetchUser();
  },[token,user,dispatch]);

  return (
    <BrowserRouter>
    <Navbar />

    <Routes>

      <Route path='/' element={<LandingPage />}/>
      <Route path='/admin/addFlashSet' element={<AddFlashSet />} />
      <Route path='/admin/addPronounceSet' element={<AddPronounceSet />} />
      <Route path='/admin/addTest' element={<AddTestPage />} />
      <Route path ='/admin/addInterview' element = {<AddInterviewPage/>}/>
      <Route path='/admin/deleteFlashSet' element={<DeleteFlashSet />} />
      <Route path='/admin/deletePronounceSet' element={<DeletePronounceSet />} />
      <Route path ='/test/:prof_level' element = {<TestSelect/>}/>
       <Route path ='/interview/:prof_level' element = {<InterviewSelect/>}/>
      <Route path='/practice/:prof_level' element={<ChapterSelect/>}/>
      <Route path='/pronounce/:prof_level' element={<ProSelect/>}/>
      <Route path='/practice/:prof_level/:set_id' element={<FlashcardStudyPage/>}/>
      <Route path='/admin' element ={<AdminDashboard/>}/>
      <Route path='/t' element ={<VoiceRecorder/>}/>
      <Route path='/pronounce/:prof_level/:pronounce_id' element ={<Pronounce/>}/>
      <Route path='/Login' element={<LoginSignupPage/>}/>
    </Routes>

    <Footer />
    </BrowserRouter>
  );
}