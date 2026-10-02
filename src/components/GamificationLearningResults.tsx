import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, 
  Upload, 
  Calendar, 
  UserCheck, 
  School as SchoolIcon, 
  Search, 
  Plus, 
  X, 
  Maximize2, 
  Download, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  BarChart3, 
  Flame, 
  Users, 
  MessageSquareText,
  Trophy,
  Info
} from 'lucide-react';
import { SCHOOLS } from '../types';

export interface GamificationReport {
  id: string;
  topic: string;
  date: string;
  hostedBy: string;
  hostRole: string;
  platform: 'Kahoot' | 'Quizizz' | 'Google Forms' | 'Live Quiz' | 'Other';
  imageUrl: string;
  participatingSchoolsCount: number;
  totalParticipants: number;
  topSchoolWinner?: string;
  remarks: string;
  isCustom?: boolean;
}

export const INITIAL_GAMIFICATION_REPORTS: GamificationReport[] = [];

export function getStoredGamificationReports(): GamificationReport[] {
  try {
    const saved = localStorage.getItem('nmms_gamification_reports');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter((r: GamificationReport) => r.isCustom && !r.id.startsWith('game_'));
      }
    }
  } catch (e) {
    console.error('Failed to parse saved gamification reports', e);
  }
  return [];
}

export default function GamificationLearningResults() {
  const [reports, setReports] = useState<GamificationReport[]>(getStoredGamificationReports);
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReport, setActiveReport] = useState<GamificationReport | null>(null);

  // Sync listener with Admin Portal updates
  React.useEffect(() => {
    const handleUpdate = () => {
      setReports(getStoredGamificationReports());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('nmms_gamification_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('nmms_gamification_updated', handleUpdate);
    };
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(item => {
      const matchesPlatform = selectedPlatformFilter === 'all' || item.platform === selectedPlatformFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.topic.toLowerCase().includes(q) ||
        item.hostedBy.toLowerCase().includes(q) ||
        item.remarks.toLowerCase().includes(q) ||
        (item.topSchoolWinner && item.topSchoolWinner.toLowerCase().includes(q));
      
      return matchesPlatform && matchesSearch;
    });
  }, [reports, selectedPlatformFilter, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Gamepad2 className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300" />
            காடையாம்பட்டி ஒன்றியம் - Gamification Learning Hub
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight">
            விளையாட்டு வழிக் கற்றல் முடிவுகள் (Gamification Results)
          </h1>

          <p className="text-sm md:text-base text-purple-100 font-medium leading-relaxed">
            கஹூட் (Kahoot), குவிஸிஸ் (Quizizz) மற்றும் ஆன்லைன் வினாடி-வினா விளையாட்டுகள் மூலம் பெறப்பட்ட மாணவர்களின் பங்கேற்பு முடிவுகள், வெற்றி பெற்ற பள்ளிகள் மற்றும் புகைப்பட அறிக்கைப் பதிவேற்றம்.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>மொத்த அறிக்கைகள்: {reports.length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Users className="w-4 h-4 text-amber-300" />
              <span>மொத்த மாணவர்கள்: {reports.reduce((acc, r) => acc + r.totalParticipants, 0)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <SchoolIcon className="w-4 h-4 text-amber-300" />
              <span>பங்கேற்ற பள்ளிகள்: {new Set(reports.map(r => r.topSchoolWinner).filter(Boolean)).size}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Add Button */}
      <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Platform Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedPlatformFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatformFilter === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              அனைத்தும் ({reports.length})
            </button>
            <button
              onClick={() => setSelectedPlatformFilter('Kahoot')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatformFilter === 'Kahoot'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Kahoot
            </button>
            <button
              onClick={() => setSelectedPlatformFilter('Quizizz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatformFilter === 'Quizizz'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              Quizizz
            </button>
            <button
              onClick={() => setSelectedPlatformFilter('Google Forms')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatformFilter === 'Google Forms'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Google Forms
            </button>
            <button
              onClick={() => setSelectedPlatformFilter('Live Quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlatformFilter === 'Live Quiz'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              Live Quiz
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="பாடம் அல்லது நடத்துனர் தேடுக..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Reports List View */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {reports.length === 0 ? 'விளையாட்டு முடிவுகள் எதுவும் இதுவரை பதிவு செய்யப்படவில்லை' : 'அறிக்கைகள் எதுவும் கிடைக்கவில்லை'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {reports.length === 0 
              ? 'கஹூட் (Kahoot), Quizizz மற்றும் கூகுள் ஃபார்ம்ஸ் போட்டிகளின் உண்மை முடிவுகள் மற்றும் மாணவர் சாதனைகளை நிர்வாகி தளம் (Admin Portal) வழியாகப் பதிவு செய்யலாம்.' 
              : 'நீங்கள் தேடிய சொல் அல்லது பிரிவுக்கு உரிய முடிவுகள் இல்லை. தேடலை மாற்றியமைக்கவும்.'}
          </p>
          {reports.length > 0 && (
            <button
              onClick={() => { setSelectedPlatformFilter('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              அனைத்து முடிவுகளையும் காட்டு
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-purple-400 transition-all duration-200 overflow-hidden flex flex-col md:flex-row items-stretch group"
            >
              {/* Left Photo & Stats Preview */}
              <div 
                className="md:w-80 shrink-0 relative bg-slate-900 min-h-[220px] cursor-pointer overflow-hidden flex items-center justify-center"
                onClick={() => setActiveReport(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.topic}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-lg border border-purple-400/30 uppercase tracking-wider">
                    {item.platform}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/20">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    {item.date}
                  </span>
                </div>

                {/* Bottom Image Stats */}
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-emerald-500/90 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      {item.participatingSchoolsCount} பள்ளிகள்
                    </span>
                    <span className="bg-blue-500/90 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      {item.totalParticipants} மாணவர்கள்
                    </span>
                  </div>

                  <div className="bg-white/90 hover:bg-white text-slate-900 px-2 py-1 rounded-lg shadow text-[10px] font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>பெரிதாக்கு</span>
                  </div>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider block mb-0.5">
                        விளையாட்டு வழிக் கற்றல் அறிக்கை
                      </span>
                      <h3 
                        onClick={() => setActiveReport(item)}
                        className="text-base sm:text-lg font-black text-slate-900 group-hover:text-purple-600 transition-colors cursor-pointer leading-snug"
                      >
                        {item.topic}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-bold">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                      <UserCheck className="w-4 h-4 text-purple-600" />
                      <span>நிகழ்த்தியவர்: <strong>{item.hostedBy}</strong> ({item.hostRole})</span>
                    </div>
                  </div>

                  {item.topSchoolWinner && (
                    <div className="bg-amber-50 border border-amber-200/90 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-amber-950 font-extrabold shadow-2xs">
                      <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>முதலிடம் / வெற்றி பெற்ற பள்ளி: <strong className="text-amber-900 text-sm font-black underline decoration-amber-300">{item.topSchoolWinner}</strong></span>
                    </div>
                  )}

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-xs text-slate-700 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      பள்ளிகள் பங்கேற்பு விவரம் & ஆசிரியரின் கருத்துரை:
                    </span>
                    <p className="leading-relaxed font-medium">
                      {item.remarks}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      தேதி: <strong>{item.date}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveReport(item)}
                      className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>முழு முடிவுகள் & புகைப்படம்</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Detail Lightbox Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 relative my-8">
            <button
              onClick={() => setActiveReport(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative bg-black max-h-[380px] flex items-center justify-center overflow-hidden">
              <img
                src={activeReport.imageUrl}
                alt={activeReport.topic}
                className="max-h-[380px] w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider rounded-lg">
                    {activeReport.platform} Gamification Report
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-2">
                    {activeReport.topic}
                  </h2>
                </div>

                <a
                  href={activeReport.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={`Gamification_Report_${activeReport.date}.jpg`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>படத்தைப் பதிவிறக்கு</span>
                </a>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">நிகழ்ந்த நாள்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {activeReport.date}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">பங்கேற்ற பள்ளிகள்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <SchoolIcon className="w-3.5 h-3.5 text-emerald-600" />
                    {activeReport.participatingSchoolsCount} பள்ளிகள்
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">மாணவர்கள் எண்ணிக்கை</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    {activeReport.totalParticipants} மாணவர்கள்
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] font-bold uppercase">நடத்துனர்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                    {activeReport.hostedBy}
                  </strong>
                </div>
              </div>

              {/* Full Remarks & School Details */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MessageSquareText className="w-4 h-4 text-purple-600" />
                  பள்ளிகள் பங்கேற்பு அறிக்கை & குறிப்புகள் (Remarks):
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                  {activeReport.remarks}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
