import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCw, Volume2, Mic } from 'lucide-react';
import api from '../api/axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VoiceRecorder from '../components/recordOverlay';

const Pronounce = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentCard, setCurrentCard] = useState(0);
  const [assesmentResult, setAssesmentResult] = useState(null);
  const [flashcardSet, setFlashcardSet] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [Progress, setProgress] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { prof_level, set_id } = useParams();
  const [searchParams] = useSearchParams();
  const set_name = searchParams.get("set_name");
  const navigate = useNavigate();

  // Overlay controls
  const openOverlay = (test) => {
    setSelectedTest(test);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setSelectedTest(null);
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? "hidden" : "auto";
  }, [isOverlayOpen]);

  const totalCards = flashcardSet.length;

  // Speech synthesis for German practice
  const speakText = (text, language = 'de-DE') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text‑to‑speech is not supported in your browser.');
    }
  };

  const handleSpeakFront = (e) => {
    e.stopPropagation();
    if (flashcardSet[currentCard]?.back_content) {
      speakText(flashcardSet[currentCard].back_content, 'de-DE');
    }
  };
  useEffect(()=>{
     if (flashcardSet[currentCard]?.back_content) {
      speakText(flashcardSet[currentCard].back_content, 'de-DE');
    }
  },[currentCard])

  // Load flashcards
  useEffect(() => {
    if (!user) navigate('/login');
    const getCards = async () => {
      try {
        const res = await api.get(`practice/getFlashCards/${set_id}`);
        setFlashcardSet(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCards();
  }, []);

  useEffect(() => {
    const progress = ((currentCard + 1) / totalCards) * 100;
    setProgress(progress);
  }, [currentCard, totalCards]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  // Swipe handling
  const handleDragStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setDragStart(clientX);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleDragMove = (e) => {
    if (!dragStart) return;
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const delta = clientX - dragStart;
    setDragOffset(delta);
  };

  const handleDragEnd = () => {
    if (!dragStart) return;
    const swipeThreshold = 100;
    if (Math.abs(dragOffset) > swipeThreshold) {
      if (dragOffset > 0) {
        setSwipeDirection('right');
        setTimeout(() => {
          handlePrevious();
          setSwipeDirection(null);
          setDragOffset(0);
          
        }, 300);
      } else {
        setSwipeDirection('left');
        setTimeout(() => {
          handleNext();
          setSwipeDirection(null);
          setDragOffset(0);
        }, 300);
      }
    } else {
      setDragOffset(0);
    }
    setDragStart(null);
    setIsDragging(false);
  };

  const getCardTransform = () => {
    if (swipeDirection === 'left') return 'translateX(-120%) rotate(-20deg)';
    if (swipeDirection === 'right') return 'translateX(120%) rotate(20deg)';
    if (isDragging && dragOffset !== 0) return `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`;
    return 'translateX(0) rotate(0deg)';
  };

  // Navigation
  const handleNext = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      setAssesmentResult(null);
    }

  };

  const handlePrevious = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setAssesmentResult(null);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...flashcardSet].sort(() => Math.random() - 0.5);
    setFlashcardSet(shuffled);
    setCurrentCard(0);
  };

  const handleReset = () => setCurrentCard(0);

  // Render UI
  return (
    <section>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate(`/pronounce/${prof_level}`)}
              className="text-slate-600 hover:text-slate-800 flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">{set_name}</h1>
              <p className="text-sm text-slate-500">🇩🇪 German • {prof_level?.toUpperCase()} Level</p>
            </div>
            <div className="w-10" />
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-slate-100 rounded-full mb-8">
            <div
              className="h-full bg-gradient-to-r from-slate-700 to-slate-800 rounded-full transition-all duration-300"
              style={{ width: `${Progress}%` }}
            />
          </div>

          {/* Flashcard */}
          <div
            className="relative w-full h-[400px] md:h-[500px] cursor-pointer"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{
              transform: getCardTransform(),
              opacity: swipeDirection ? 0 : 1,
              transition: isDragging ? 'none' : 'all 0.3s ease-out',
            }}
          >
            <div className="h-full bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center border-4 border-slate-500 relative overflow-hidden">
              {/* Speak button */}
              <button
                onClick={handleSpeakFront}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-all z-20 ${
                  isSpeaking ? 'bg-cyan-600 text-white animate-pulse' : 'bg-white text-cyan-600 hover:bg-cyan-50'
                }`}
                title="Play pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Card content */}
              <div className="text-2xl md:text-4xl font-bold text-slate-800 text-center mb-8">
                {flashcardSet[currentCard]?.back_content}
              </div>

              {/* Voice Recorder Button */}
              <button
                onClick={() => openOverlay(flashcardSet[currentCard])}
                className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-500 hover:from-cyan-slate hover:to-blue-slate text-white font-semibold rounded-full shadow-lg flex items-center gap-2 transition-all"
              >
                <Mic className="w-5 h-5" />
                Pronounce
              </button>

              {/* Pronunciation Result Card */}
 {assesmentResult && (
                <div className="mt-6 w-full bg-slate-100 rounded-xl p-4 text-sm text-slate-700 shadow-inner border border-slate-200">
                  <p className="font-semibold text-slate-800 mb-2">Your Pronunciation Assessment:</p>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <p className="text-xs text-slate-500">Overall Accuracy</p>
                      <p className="text-lg font-bold text-blue-700">{assesmentResult.result.accuracyScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Fluency</p>
                      <p className="text-lg font-bold text-blue-700">{assesmentResult.result.fluencyScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Completeness</p>
                      <p className="text-lg font-bold text-blue-700">{assesmentResult.result.completenessScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Pronunciation Score</p>
                      <p className="text-lg font-bold text-blue-700">{assesmentResult.result.pronunciationScore}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentCard === 0}
              className="p-3 rounded-xl bg-white text-slate-700 hover:bg-slate-50 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentCard === totalCards - 1}
              className="p-3 rounded-xl bg-white text-slate-700 hover:bg-slate-50 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isOverlayOpen && selectedTest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200">
          <VoiceRecorder
            card={selectedTest}
            closeOverlay={closeOverlay}
            setAssesmentResult={setAssesmentResult}
          />
        </div>
      )}
    </section>
  );
};

export default Pronounce;
