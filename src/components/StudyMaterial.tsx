/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  Zap, 
  BookMarked,
  Landmark,
  Calculator,
  Factory,
  Sprout,
  Monitor,
  FileText,
  PlayCircle,
  HelpCircle,
  ArrowRight,
  Globe
} from 'lucide-react';
import { INTERACTIVE_STUDY_MATERIALS, InteractiveStudyMaterial, getStoredStudyMaterials } from '../data/htmlStudyMaterials';

export default function StudyMaterial() {
  const [materials, setMaterials] = useState<InteractiveStudyMaterial[]>(getStoredStudyMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<InteractiveStudyMaterial | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync listener with Admin Portal updates
  useEffect(() => {
    const handleSync = () => {
      setMaterials(getStoredStudyMaterials());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('nmms_materials_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('nmms_materials_updated', handleSync);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'அனைத்து பாடங்கள்' },
    { id: 'social', label: 'சமூக அறிவியல்' },
    { id: 'maths', label: 'கணிதம் (Maths)' },
    { id: 'science', label: 'அறிவியல் (Science)' }
  ];

  // Filter materials based on category and search query
  const filteredMaterials = materials.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch = !q ||
                          material.title.toLowerCase().includes(q) ||
                          (material.englishTitle && material.englishTitle.toLowerCase().includes(q)) ||
                          material.description.toLowerCase().includes(q) ||
                          material.subjectLabel.toLowerCase().includes(q) ||
                          material.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  // Handle ESC key to exit modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMaterial(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getMaterialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return Landmark;
      case 'Calculator': return Calculator;
      case 'Factory': return Factory;
      case 'Sprout': return Sprout;
      case 'Monitor': return Monitor;
      default: return BookOpen;
    }
  };

  const handleOpenMaterial = (material: InteractiveStudyMaterial) => {
    setSelectedMaterial(material);
    setIsFullscreen(false);
  };

  const handleOpenInNewTab = (material: InteractiveStudyMaterial) => {
    const blob = new Blob([material.htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="study-material-page">
      
      {/* Title & Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>NMMS டிஜிட்டல் ஊடாடும் பாட வழிகாட்டி</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            NMMS ஊடாடும் <span className="text-emerald-600">பாடக் கையேடுகள்</span> & பயிற்சி போர்ட்டல்
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            ஆசிரியர் பயிற்றுநர் கி. ஐய்யப்பன் (வட்டார வள மையம், காடையாம்பட்டி) அவர்களால் உருவாக்கப்பட்ட
            நேரடி சிமுலேட்டர்கள், வினாடி வினாக்கள், மின்னல் திருப்புதல்கள் மற்றும் 5 நிமிட சவால்கள் அடங்கிய டிஜிட்டல் கற்றல் தொகுதி.
          </p>
        </div>
        
        {/* Quick Info Stats */}
        <div className="flex gap-3">
          <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-center min-w-[100px]">
            <span className="block text-2xl font-black text-emerald-600 font-mono">{materials.length}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">முழு பாடங்கள்</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl text-center min-w-[100px]">
            <span className="block text-2xl font-black text-indigo-600 font-mono">100%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ஊடாடும் கற்றல்</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 rounded-3xl space-y-4 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-amber-300">
              ஊடாடும் பாடக் கற்றல் அம்சங்கள் (Interactive Learning Features)
            </h3>
          </div>
          <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-3 py-0.5 rounded-full font-bold border border-emerald-400/20">
            Smart Self-Study
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl space-y-1">
            <span className="text-emerald-400 font-extrabold block">🔬 மெய்நிகர் ஆய்வகம் (Virtual Labs)</span>
            <p className="text-slate-300 text-[11px]">வட்ட பரப்பளவு, ராஸ்டர்/வெக்டர் மற்றும் தாவர வகைப்பாட்டியல் சிமுலேட்டர்கள்.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl space-y-1">
            <span className="text-amber-300 font-extrabold block">⏱️ 5-நிமிட சவால்கள் (Exam Challenge)</span>
            <p className="text-slate-300 text-[11px]">உடனடி நேரக் கட்டுப்பாட்டு NMMS மாதிரித் தேர்வுகள் மற்றும் மதிப்பெண் அறிக்கைகள்.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl space-y-1">
            <span className="text-sky-300 font-extrabold block">📝 சுய மதிப்பீட்டு வினாடி வினா</span>
            <p className="text-slate-300 text-[11px]">ஒவ்வொரு வினாவிற்கும் உடனடி feedback மற்றும் விளக்கக் குறிப்புகள்.</p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl space-y-1">
            <span className="text-purple-300 font-extrabold block">⚡ 60-வினாடி மின்னல் திருப்புதல்</span>
            <p className="text-slate-300 text-[11px]">தேர்வுக்கு முந்தைய நிமிடம் நினைவில் கொள்ள வேண்டிய முக்கிய 10 குறிப்புகள்.</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="material-search"
              type="text"
              placeholder="பாடம், தலைப்பு அல்லது பாடக் குறியீட்டைத் தேடுக..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Quick Notice */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-semibold bg-emerald-50/60 border border-emerald-100 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> மாணவர்கள் சொடுக்கித் திறந்து கற்கத் தயாரான பாடங்கள்!
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Materials List View */}
      {filteredMaterials.length > 0 ? (
        <div className="space-y-4">
          {filteredMaterials.map((mat) => {
            const IconComponent = getMaterialIcon(mat.icon);
            return (
              <div 
                key={mat.id} 
                id={`material-card-${mat.id}`}
                className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-400 transition-all duration-200 overflow-hidden flex flex-col md:flex-row items-stretch"
              >
                {/* Left Visual / Subject Indicator Banner */}
                <div className={`md:w-56 shrink-0 p-6 flex flex-col justify-between items-start ${
                  mat.category === 'social' ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' :
                  mat.category === 'maths' ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white' :
                  'bg-gradient-to-br from-emerald-500 to-teal-700 text-white'
                }`}>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-black/20 text-[11px] font-black uppercase tracking-wider backdrop-blur-xs">
                      {mat.subjectLabel}
                    </span>
                  </div>

                  <div className="pt-4 space-y-1">
                    <span className="text-xs font-bold text-white/90 block">
                      {mat.classTerm}
                    </span>
                    {mat.isCustom && (
                      <span className="inline-block bg-white text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                        நிர்வாகப் பதிவு
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Content Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {mat.title}
                      </h3>
                      {mat.uploadedAt && (
                        <span className="text-[11px] font-bold text-slate-400 shrink-0">
                          பதிவேற்றம்: {mat.uploadedAt}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-500 italic">
                      {mat.englishTitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                      {mat.description}
                    </p>

                    {/* Tags & Trainer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {mat.tags.map((tag, idx) => (
                          <span key={idx} className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0">
                          ஐ
                        </div>
                        <span>{mat.trainer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenInNewTab(mat)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      title="புதிய தாவலில் திறக்கவும்"
                    >
                      <ExternalLink className="h-4 w-4 text-slate-600" />
                      <span className="hidden sm:inline">புதிய தாவல்</span>
                    </button>

                    <button
                      onClick={() => handleOpenMaterial(mat)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                    >
                      <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>பாடத்தைத் திறந்து படிக்க</span>
                      <ArrowRight className="h-4 w-4 ml-1 hidden sm:inline" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-black text-slate-900">தேடல் முடிவுகள் ஏதுமில்லை!</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              தங்கள் தேடலுக்குப் பொருந்தக்கூடிய பாடக் கையேடுகள் எதுவும் கண்டறியப்படவில்லை. தயவுசெய்து வேறு சில வார்த்தைகளைக் கொண்டு தேடவும்.
            </p>
          </div>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            அனைத்தையும் காட்டு
          </button>
        </div>
      )}

      {/* Interactive Modal Reader */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fadeIn">
          <div className={`bg-white rounded-3xl shadow-2xl flex flex-col w-full transition-all duration-300 overflow-hidden border border-slate-200 ${
            isFullscreen 
              ? 'fixed inset-0 rounded-none border-0' 
              : 'max-w-6xl h-[92vh] max-h-[920px]'
          }`}>
            
            {/* Reader Modal Navigation Bar */}
            <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
                  {selectedMaterial.subjectLabel}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-white truncate">
                    {selectedMaterial.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {selectedMaterial.classTerm} • {selectedMaterial.trainer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenInNewTab(selectedMaterial)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
                  title="புதிய தாவலில் திறக்க"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">புதிய தாவலில்</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all cursor-pointer"
                  title={isFullscreen ? 'திரையைக் குறைக்க' : 'முழுத் திரையாக்குக'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => { setSelectedMaterial(null); setIsFullscreen(false); }}
                  className="p-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl transition-all cursor-pointer ml-1"
                  title="மூடுக (Close)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Sandbox Frame */}
            <div className="flex-1 w-full bg-slate-100 relative">
              <iframe
                title={selectedMaterial.title}
                srcDoc={selectedMaterial.htmlContent}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
              />
            </div>

          </div>
        </div>
      )}

      {/* Guide Note Box */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-emerald-700" />
          <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
            மாணவர்கள் பயன்படுத்தும் முறை (Student Guidelines)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          1. மேலே பட்டியலிடப்பட்டுள்ள எந்தவொரு பாடத்தின் மீதும் சொடுக்கி <b>"பாடத்தைத் திறந்து படிக்க"</b> என்பதைத் தேர்ந்தெடுக்கவும்.<br />
          2. திரையிலேயே ஊடாடும் வரைபடங்கள், வினாடி வினாக்கள் மற்றும் மாதிரிக் கணக்குகளைச் செய்து பார்க்கலாம்.<br />
          3. 5-நிமிட சவாலைத் தொடங்கி உங்கள் NMMS நேர மேலாண்மையைச் சோதிக்கலாம்.
        </p>
      </div>

    </div>
  );
}
