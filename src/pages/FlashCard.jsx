import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCw, Check, X, BookOpen } from 'lucide-react';

const FlashcardStudyPage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);

  // Sample flashcard data
  const flashcardSet = {
    chapter: "Clinical Procedures",
    difficulty: "Medium",
    language: "German",
    cards: [
      { 
        id: 1,
        front: "What is 'Blutdruckmessung'?", 
        back: "Blood pressure measurement" 
      },
      { 
        id: 2,
        front: "What is 'Injektion'?", 
        back: "Injection" 
      },
      { 
        id: 3,
        front: "What is 'Verbandswechsel'?", 
        back: "Dressing change" 
      },
      { 
        id: 4,
        front: "What is 'Untersuchung'?", 
        back: "Examination" 
      },
      { 
        id: 5,
        front: "What is 'Notfall'?", 
        back: "Emergency" 
      },
      { 
        id: 6,
        front: "What is 'Blutentnahme'?", 
        back: "Blood draw" 
      },
      { 
        id: 7,
        front: "What is 'Infusion'?", 
        back: "Infusion/IV" 
      },
      { 
        id: 8,
        front: "What is 'Wundversorgung'?", 
        back: "Wound care" 
      }
    ]
  };

  const totalCards = flashcardSet.cards.length;
  const progress = ((currentCard + 1) / totalCards) * 100;

  const handleNext = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    // In a real app, you would shuffle the cards array here
  };

  const handleReset = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  };

  const markAsKnown = () => {
    if (!knownCards.includes(flashcardSet.cards[currentCard].id)) {
      setKnownCards([...knownCards, flashcardSet.cards[currentCard].id]);
    }
    handleNext();
  };

  const markAsUnknown = () => {
    if (!unknownCards.includes(flashcardSet.cards[currentCard].id)) {
      setUnknownCards([...unknownCards, flashcardSet.cards[currentCard].id]);
    }
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Chapters</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-800">{flashcardSet.chapter}</h1>
              <p className="text-sm text-slate-500">
                🇩🇪 {flashcardSet.language} • {flashcardSet.difficulty} Level
              </p>
            </div>

            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Card {currentCard + 1} of {totalCards}
            </span>
            <span className="text-sm font-medium text-cyan-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Known</span>
            </div>
            <p className="text-3xl font-bold text-green-600">{knownCards.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Review</span>
            </div>
            <p className="text-3xl font-bold text-red-600">{unknownCards.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Remaining</span>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              {totalCards - knownCards.length - unknownCards.length}
            </p>
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full h-[500px] cursor-pointer perspective-1000"
          >
            {/* Front of Card */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isFlipped ? 'opacity-0 pointer-events-none rotate-y-180' : 'opacity-100'
              }`}
            >
              <div className="h-full bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center border-4 border-cyan-500 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full translate-y-20 -translate-x-20 opacity-50"></div>
                
                <div className="relative z-10 w-full">
                  <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
                    QUESTION
                  </div>
                  <div className="text-4xl font-bold text-slate-800 text-center mb-8">
                    {flashcardSet.cards[currentCard]?.front}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <RotateCw className="w-4 h-4" />
                    <span>Click to reveal answer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none -rotate-y-180'
              }`}
            >
              <div className="h-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 -translate-x-24"></div>
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-y-28 translate-x-28"></div>
                
                <div className="relative z-10 w-full">
                  <div className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                    ANSWER
                  </div>
                  <div className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
                    {flashcardSet.cards[currentCard]?.back}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-amber-100 text-sm">
                    <RotateCw className="w-4 h-4" />
                    <span>Click to see question</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Buttons */}
        {isFlipped && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={markAsUnknown}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Need to Review
            </button>
            <button
              onClick={markAsKnown}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              I Know This
            </button>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className={`p-4 rounded-xl transition-all ${
              currentCard === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="px-6 py-4 bg-white text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
            >
              <Shuffle className="w-5 h-5" />
              Shuffle
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-4 bg-white text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
            >
              <RotateCw className="w-5 h-5" />
              Reset
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={currentCard === totalCards - 1}
            className={`p-4 rounded-xl transition-all ${
              currentCard === totalCards - 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-slate-700 hover:bg-slate-50 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold border-2 border-slate-200">
            Study Again
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold">
            Take Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudyPage;