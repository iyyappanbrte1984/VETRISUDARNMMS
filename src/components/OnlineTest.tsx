import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Calculator, 
  Brain, 
  Microscope, 
  Landmark, 
  Award, 
  Search, 
  Check, 
  ChevronRight,
  Flame,
  Zap,
  BookOpen,
  Box,
  CircleDot,
  PieChart,
  Triangle,
  Shapes,
  FileCode,
  Code,
  Download,
  X,
  Maximize2,
  UserCheck,
  Play
} from 'lucide-react';

export interface QuestionItem {
  id?: number;
  q: string;
  icon?: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface TestSuite {
  id: string;
  title: string;
  tamilTitle: string;
  subject: 'maths' | 'mat' | 'science' | 'social' | 'full_omr';
  subjectLabel: string;
  durationMinutes: number;
  totalQuestions: number;
  description: string;
  badgeBg: string;
  badgeTextColor: string;
  iconName: string;
  questions: QuestionItem[];
}

export interface UploadedHtmlExam {
  id: string;
  title: string;
  tamilTitle?: string;
  subject: 'maths' | 'mat' | 'science' | 'social' | 'full_omr';
  subjectLabel: string;
  durationMinutes: number;
  totalQuestions?: number;
  description: string;
  htmlContent: string;
  fileName?: string;
  uploadedAt: string;
  author?: string;
  isCustomHtml: true;
}

export function getStoredHtmlExams(): UploadedHtmlExam[] {
  try {
    const saved = localStorage.getItem('nmms_uploaded_html_exams');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load custom HTML exams', e);
  }
  return [];
}

// Available Test Suites (dynamic)
export const ALL_TEST_SUITES: TestSuite[] = [];

export default function OnlineTest() {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploadedHtmlExams, setUploadedHtmlExams] = useState<UploadedHtmlExam[]>(getStoredHtmlExams);

  // Sync listener with Admin Portal updates
  useEffect(() => {
    const handleSync = () => {
      setUploadedHtmlExams(getStoredHtmlExams());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('nmms_exams_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('nmms_exams_updated', handleSync);
    };
  }, []);

  // Player State for built-in Question Item Tests
  const [activeTestSuite, setActiveTestSuite] = useState<TestSuite | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // HTML Exam Runner State
  const [activeHtmlExam, setActiveHtmlExam] = useState<UploadedHtmlExam | null>(null);
  const [htmlExamTimeLeft, setHtmlExamTimeLeft] = useState<number>(0);

  // Start HTML Exam
  const handleStartHtmlExam = (exam: UploadedHtmlExam) => {
    setActiveHtmlExam(exam);
    setHtmlExamTimeLeft(exam.durationMinutes * 60);
  };

  // Timer Countdown for HTML Exam
  useEffect(() => {
    if (!activeHtmlExam || htmlExamTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setHtmlExamTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeHtmlExam, htmlExamTimeLeft]);

  // Filtered Test Suites
  const filteredSuites = useMemo(() => {
    return ALL_TEST_SUITES.filter(suite => {
      const matchesSubject = selectedSubjectFilter === 'all' || suite.subject === selectedSubjectFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        suite.title.toLowerCase().includes(q) ||
        suite.tamilTitle.toLowerCase().includes(q) ||
        suite.description.toLowerCase().includes(q);
      
      return matchesSubject && matchesSearch;
    });
  }, [selectedSubjectFilter, searchQuery]);

  // Filtered HTML Exams
  const filteredHtmlExams = useMemo(() => {
    return uploadedHtmlExams.filter(exam => {
      const matchesSubject = selectedSubjectFilter === 'all' || exam.subject === selectedSubjectFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        exam.title.toLowerCase().includes(q) ||
        (exam.tamilTitle && exam.tamilTitle.toLowerCase().includes(q)) ||
        exam.description.toLowerCase().includes(q);
      
      return matchesSubject && matchesSearch;
    });
  }, [uploadedHtmlExams, selectedSubjectFilter, searchQuery]);

  // Start Test Handler
  const handleStartTest = (suite: TestSuite) => {
    setActiveTestSuite(suite);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setTimeLeft(suite.durationMinutes * 60);
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!activeTestSuite || isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTestSuite, isSubmitted, timeLeft]);

  // Option Click Handler
  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    
    setSelectedOption(optIndex);
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  // Next Question
  const handleNext = () => {
    if (!activeTestSuite) return;
    if (currentIndex < activeTestSuite.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(userAnswers[nextIdx] !== undefined ? userAnswers[nextIdx] : null);
    }
  };

  // Previous Question
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedOption(userAnswers[prevIdx] !== undefined ? userAnswers[prevIdx] : null);
    }
  };

  // Submit Test Handler
  const handleSubmitTest = () => {
    if (!activeTestSuite) return;
    
    let calculatedScore = 0;
    activeTestSuite.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  // Format Timer mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Render Visual Shape Icon for Question
  const renderQuestionVisualIcon = (iconStr?: string) => {
    switch (iconStr) {
      case 'box':
        return <Box className="w-12 h-12 text-indigo-600" />;
      case 'circle-dot':
        return <CircleDot className="w-12 h-12 text-blue-600" />;
      case 'triangle':
        return <Triangle className="w-12 h-12 text-emerald-600" />;
      case 'pie-chart':
        return <PieChart className="w-12 h-12 text-amber-600" />;
      case 'calculator':
        return <Calculator className="w-12 h-12 text-purple-600" />;
      case 'brain':
        return <Brain className="w-12 h-12 text-purple-600" />;
      case 'microscope':
        return <Microscope className="w-12 h-12 text-emerald-600" />;
      case 'landmark':
        return <Landmark className="w-12 h-12 text-amber-600" />;
      default:
        return <Shapes className="w-12 h-12 text-indigo-600" />;
    }
  };

  // ------------------------------------------------------------------
  // VIEW 1: TEST PLAYER VIEW (ACTIVE QUIZ)
  // ------------------------------------------------------------------
  if (activeTestSuite) {
    const currentQuestion = activeTestSuite.questions[currentIndex];
    const isAnswered = userAnswers[currentIndex] !== undefined;
    const progressPct = Math.round(((currentIndex + 1) / activeTestSuite.questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Quiz Top Action Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTestSuite(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>பட்டியலுக்குத் திரும்பு</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-black">
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>மீதமுள்ள நேரம்: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm active:scale-95"
            >
              தேர்வை முடி (Submit)
            </button>
          </div>
        </div>

        {/* ACTIVE TEST CARD OR RESULT SCREEN */}
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Quiz Header Banner */}
            <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-6 text-white relative">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                  {activeTestSuite.subjectLabel}
                </span>
                <span className="text-xs font-extrabold text-indigo-100 bg-black/20 px-3 py-1 rounded-full">
                  வினா {currentIndex + 1} / {activeTestSuite.questions.length}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-black">
                {activeTestSuite.title}
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Quiz Content Body */}
            <div className="p-6 md:p-8 space-y-6">

              {/* Visual Shape Box */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl h-28 flex items-center justify-center shadow-inner">
                {renderQuestionVisualIcon(currentQuestion.icon)}
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <div className="text-xs font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  வினா எண் {currentIndex + 1}:
                </div>
                <h3 className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">
                  {currentQuestion.q}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                {currentQuestion.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(optIndex)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-md font-black'
                          : 'bg-slate-50/80 hover:bg-indigo-50/50 border-slate-200 text-slate-800 font-bold hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-indigo-200'
                        }`}>
                          {optionLetters[optIndex]}
                        </span>
                        <span className="text-xs md:text-sm">{opt}</span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>முந்தைய வினா</span>
                </button>

                <span className="text-xs font-bold text-slate-600">
                  {Object.keys(userAnswers).length} / {activeTestSuite.questions.length} விடையளிக்கப்பட்டது
                </span>

                {currentIndex < activeTestSuite.questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <span>அடுத்த வினா</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <span>தேர்வை முடி</span>
                    <Trophy className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* RESULT TROPHY SCREEN */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                வாழ்த்துகள்! பயிற்சி முடிந்தது
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                தேர்வு முடிவுகள் (Test Summary)
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {activeTestSuite.title}
              </p>
            </div>

            {/* Score Metric Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 max-w-sm mx-auto space-y-2">
              <span className="text-xs font-extrabold text-indigo-700 uppercase">மொத்த மதிப்பெண்</span>
              <div className="text-4xl md:text-5xl font-black text-indigo-600">
                {score} <span className="text-xl text-slate-600 font-bold">/ {activeTestSuite.questions.length}</span>
              </div>
              <div className="text-xs font-bold text-slate-600 pt-1">
                தேர்ச்சி விகிதம்: <strong className="text-emerald-600">{Math.round((score / activeTestSuite.questions.length) * 100)}%</strong>
              </div>
            </div>

            {/* Feedback Message */}
            <div className="max-w-md mx-auto text-xs font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {score / activeTestSuite.questions.length >= 0.9 ? (
                <span className="text-emerald-700 font-black">🌟 மிகச் சிறப்பு! பாடத்தில் நீங்கள் முழு தேர்ச்சி பெற்றுள்ளீர்கள்!</span>
              ) : score / activeTestSuite.questions.length >= 0.6 ? (
                <span className="text-amber-700 font-black">👍 நல்ல முயற்சி! மேலும் சில முறைகள் பயிற்சி செய்து 100% பெறுங்கள்!</span>
              ) : (
                <span className="text-orange-700 font-black">📚 பாடக் குறிப்புகளை மீண்டும் படித்து பயிற்சி செய்யுங்கள். வெற்றி நிச்சயம்!</span>
              )}
            </div>

            {/* Questions Detailed Review List */}
            <div className="text-left space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                விடைகள் பகுப்பாய்வு (Answer Review):
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {activeTestSuite.questions.map((q, idx) => {
                  const userAns = userAnswers[idx];
                  const isRight = userAns === q.correct;

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs space-y-2 ${
                        isRight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-extrabold text-slate-900">
                          {idx + 1}. {q.q}
                        </span>
                        {isRight ? (
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md text-[10px] shrink-0">
                            ✓ சரி
                          </span>
                        ) : (
                          <span className="bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-md text-[10px] shrink-0">
                            ✗ தவறு
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium pt-1">
                        <div>
                          உங்கள் விடை: <strong className={isRight ? 'text-emerald-700' : 'text-rose-700'}>
                            {userAns !== undefined ? q.options[userAns] : 'விடையளிக்கப்படவில்லை'}
                          </strong>
                        </div>
                        <div>
                          சரியான விடை: <strong className="text-emerald-700">{q.options[q.correct]}</strong>
                        </div>
                      </div>

                      {q.explanation && (
                        <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-200/60 mt-1">
                          💡 <strong>விளக்கம்:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => handleStartTest(activeTestSuite)}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>மீண்டும் முயற்சி செய்</span>
              </button>

              <button
                onClick={() => setActiveTestSuite(null)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>அனைத்துத் தேர்வுகள் பட்டியலுக்குச் செல்</span>
              </button>
            </div>

          </div>
        )}

      </div>
    );
  }

  // ------------------------------------------------------------------
  // VIEW 2: ONLINE TESTS CATALOG LIST
  // ------------------------------------------------------------------
  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Award className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-200" />
            காடையாம்பட்டி ஒன்றியம் - NMMS மாதிரித் தேர்வுகள் மையம்
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            NMMS ஆன்லைன் மாதிரித் தேர்வுகள் (Online Practice Tests)
          </h1>

          <p className="text-sm md:text-base text-indigo-100 font-medium leading-relaxed">
            மாணவர்கள் NMMS தேர்வில் அதிக மதிப்பெண்கள் பெற கணிதம், வடிவவியல், MAT மனத்திறன் மற்றும் SAT பாடப்பிரிவுகளுக்கான நேரடி ஊடாடும் ஆன்லைன் தேர்வுகள்.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>மொத்த தேர்வுகள்: {ALL_TEST_SUITES.length + uploadedHtmlExams.length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>மொத்த வினாக்கள்: {ALL_TEST_SUITES.reduce((sum, t) => sum + t.totalQuestions, 0) + uploadedHtmlExams.reduce((sum, e) => sum + (e.totalQuestions || 0), 0)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>உடனடி மதிப்பீடு & பகுப்பாய்வு</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Subject Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubjectFilter === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              அனைத்தும் ({ALL_TEST_SUITES.length + uploadedHtmlExams.length})
            </button>

            <button
              onClick={() => setSelectedSubjectFilter('maths')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubjectFilter === 'maths'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              கணிதம் & வடிவவியல்
            </button>

            <button
              onClick={() => setSelectedSubjectFilter('mat')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubjectFilter === 'mat'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              MAT மனத்திறன்
            </button>

            <button
              onClick={() => setSelectedSubjectFilter('science')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubjectFilter === 'science'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              SAT அறிவியல் & வரலாறு
            </button>
          </div>

          {/* Search Input */}
          <div className="relative md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="தேர்வைத் தேடுக..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

        </div>
      </div>

      {/* Tests Catalog List View */}
      <div className="space-y-4">
        {/* 1. Uploaded HTML Exams (if any) */}
        {filteredHtmlExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl border-2 border-amber-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-200 overflow-hidden flex flex-col md:flex-row items-stretch"
          >
            {/* Left Banner */}
            <div className="md:w-56 shrink-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <FileCode className="w-6 h-6 text-white" />
                </div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-black/20 text-[11px] font-black uppercase tracking-wider">
                  HTML ஊடாடும் தேர்வு
                </span>
              </div>

              <div className="pt-4 space-y-1">
                <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-200" />
                  {exam.durationMinutes} நிமிடங்கள்
                </span>
                <span className="inline-block bg-white text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  {exam.subjectLabel}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {exam.title}
                  </h3>
                  {exam.uploadedAt && (
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">
                      பதிவு: {exam.uploadedAt}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  {exam.description}
                </p>

                {exam.author && (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pt-2">
                    <UserCheck className="w-4 h-4 text-amber-600" />
                    <span>பதிவேற்றியவர்: <strong>{exam.author}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>தானியங்கி மதிப்பெண் மதிப்பீடு</span>
                </div>

                <button
                  onClick={() => handleStartHtmlExam(exam)}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  <span>தேர்வை எழுது</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 2. Standard Test Suites */}
        {filteredSuites.map((suite) => (
          <div
            key={suite.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-indigo-400 transition-all duration-200 overflow-hidden flex flex-col md:flex-row items-stretch"
          >
            {/* Left Banner */}
            <div className={`md:w-56 shrink-0 p-6 flex flex-col justify-between ${
              suite.subject === 'mat' ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white' :
              suite.subject === 'sat' ? 'bg-gradient-to-br from-blue-600 to-cyan-700 text-white' :
              suite.subject === 'maths' ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white' :
              'bg-gradient-to-br from-indigo-600 to-violet-700 text-white'
            }`}>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-black/20 text-[11px] font-black uppercase tracking-wider">
                  {suite.subjectLabel}
                </span>
              </div>

              <div className="pt-4 space-y-1">
                <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-200" />
                  {suite.durationMinutes} நிமிடங்கள்
                </span>
                <span className="inline-block bg-white text-indigo-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  {suite.totalQuestions} வினாக்கள்
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                      {suite.title}
                    </h3>
                    <span className="text-xs font-bold text-indigo-700 block mt-0.5">
                      {suite.tamilTitle}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl shrink-0">
                    மொத்த மதிப்பெண்கள்: {suite.totalQuestions}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  {suite.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    OMR தேர்வு முறை & உடனடி அறிக்கை
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    விளக்கக் குறிப்புகள் (Step-by-step explanations)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs font-extrabold text-slate-600 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>தேர்வு எழுத தயார்</span>
                </div>

                <button
                  onClick={() => handleStartTest(suite)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  <span>தேர்வைத் தொடங்கு</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuites.length === 0 && filteredHtmlExams.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {uploadedHtmlExams.length === 0 ? 'ஆன்லைன் தேர்வுகள் எதுவும் இதுவரை சேர்க்கப்படவில்லை' : 'தேர்வுகள் எதுவும் கிடைக்கவில்லை'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {uploadedHtmlExams.length === 0 
              ? 'புதிய மாதிரித் தேர்வுகள் அல்லது HTML ஊடாடும் வினாடி-வினாக்களை நிர்வாகி தளம் (Admin Portal) வழியாக ஆசிரியர்கள் பதிவேற்றம் செய்யலாம்.' 
              : 'நீங்கள் தேடிய சொல் அல்லது பாடப்பிரிவுக்கு உரிய ஆன்லைன் தேர்வுகள் இல்லை. தேடலை மாற்றியமைக்கவும்.'}
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HTML EXAM FULL INTERACTIVE RUNNER MODAL */}
      {/* ------------------------------------------------------------------ */}
      {activeHtmlExam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-3xl w-full h-[95vh] max-w-6xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            
            {/* Top Control Bar */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <FileCode className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-black text-white truncate">
                    {activeHtmlExam.title}
                  </h3>
                  <span className="text-[11px] text-amber-300 font-bold block truncate">
                    {activeHtmlExam.subjectLabel} • {activeHtmlExam.durationMinutes} நிமிடங்கள்
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-amber-400 border border-slate-700">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>{formatTime(htmlExamTimeLeft)}</span>
                </div>

                <a
                  href={`data:text/html;charset=utf-8,${encodeURIComponent(activeHtmlExam.htmlContent)}`}
                  download={`${activeHtmlExam.title.replace(/\s+/g, '_')}.html`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  title="HTML கோப்பைப் பதிவிறக்கு"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">பதிவிறக்கு</span>
                </a>

                <button
                  onClick={() => setActiveHtmlExam(null)}
                  className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold px-3"
                >
                  <X className="w-4 h-4" />
                  <span>வெளியேறு (Close)</span>
                </button>
              </div>
            </div>

            {/* Sandboxed iFrame Runner */}
            <div className="flex-1 bg-white relative w-full h-full">
              <iframe
                title={activeHtmlExam.title}
                srcDoc={activeHtmlExam.htmlContent}
                sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups"
                className="w-full h-full border-0"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
