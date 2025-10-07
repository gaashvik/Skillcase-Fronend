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
import FlashcardStudyPage from './pages/FlashCard';
import LoginSignupPage from './pages/LoginSignupPage';
import api from "./api/axios"
import { setUser, logout } from './redux/auth/authSlice';

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
      <Route path='/practice/:prof_level' element={<ChapterSelect/>}/>
      <Route path='/practice/:prof_level/:set_id' element={<FlashcardStudyPage/>}/>
      <Route path='/Login' element={<LoginSignupPage/>}/>
    </Routes>

    <Footer />
    </BrowserRouter>
  );
}