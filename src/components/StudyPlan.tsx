import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Search, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  User, 
  Brain, 
  Calculator, 
  Microscope, 
  Globe, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import { 
  STUDY_PLAN_DATA, 
  StudyPlanItem, 
  StudyPlanWeek, 
  getCurrentCalendarWeek, 
  getWeekDateRange, 
  formatDateStr, 
  parseIsoDate, 
  isItemToday 
} from '../data/studyPlanData';

export default function StudyPlan() {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [activeView, setActiveView] = useState<'timeline' | 'analytics'>('timeline');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterEducator, setFilterEducator] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const now = useMemo(() => new Date(), []);
  const currentCalWeek = useMemo(() => getCurrentCalendarWeek(now), [now]);

  // Extract all unique subjects & educators
  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    STUDY_PLAN_DATA.forEach(w => w.items.forEach(i => set.add(i.subject)));
    return Array.from(set);
  }, []);

  const allEducators = useMemo(() => {
    const set = new Set<string>();
    STUDY_PLAN_DATA.forEach(w => w.items.forEach(i => {
      if (i.resource) set.add(i.resource);
    }));
    return Array.from(set);
  }, []);

  // Helper for subject icons
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Maths': return '📐';
      case 'Science': return '🔬';
      case 'Social Science': return '🌍';
      case 'Mental Ability': return '🧠';
      case 'Unit Test': return '⚡';
      default: return '📘';
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    let items: (StudyPlanItem & { weekNum: number })[] = [];

    if (selectedWeek === 'all') {
      STUDY_PLAN_DATA.forEach(w => {
        w.items.forEach(i => items.push({ ...i, weekNum: w.week }));
      });
    } else {
      const w = STUDY_PLAN_DATA.find(x => x.week === selectedWeek);
      if (w) {
        w.items.forEach(i => items.push({ ...i, weekNum: w.week }));
      }
    }

    if (filterSubject !== 'all') {
      items = items.filter(x => x.subject === filterSubject);
    }

    if (filterEducator !== 'all') {
      items = items.filter(x => x.resource === filterEducator);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(x => 
        `${x.topic} ${x.resource} ${x.date} ${x.label} ${x.subject} w${x.weekNum}`.toLowerCase().includes(q)
      );
    }

    // Chronological Sort
    items.sort((a, b) => {
      const dA = parseIsoDate(a.iso) || new Date('9999-12-31');
      const dB = parseIsoDate(b.iso) || new Date('9999-12-31');
      return dA.getTime() - dB.getTime();
    });

    return items;
  }, [selectedWeek, filterSubject, filterEducator, searchQuery]);

  // Handle Live Week Click
  const handleLiveWeekClick = () => {
    setSelectedWeek(currentCalWeek.week);
    setActiveView('timeline');
    setFilterSubject('all');
    setFilterEducator('all');
  };

  // Dynamic Header Title
  const getTitle = () => {
    if (activeView === 'analytics') return 'Performance Analytics';
    if (filterSubject !== 'all') return `${filterSubject} Timeline`;
    if (filterEducator !== 'all') return `Roster: ${filterEducator.split(',')[0]}`;
    if (selectedWeek !== 'all') return `வாரம் ${selectedWeek} பாடத்திட்டம்`;
    return 'Chronological Timeline';
  };

  const getSubTitle = () => {
    if (selectedWeek === 'all') return 'Viewing Full Curriculum Scope (22 Weeks)';
    return `Viewing Week ${selectedWeek} Modules`;
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] text-slate-800 font-sans pb-16 animate-fadeIn">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white font-black text-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
              N
            </div>
            <div>
              <b className="text-base font-extrabold text-slate-900 leading-tight block">
                NMMS Study Plan
              </b>
              <small className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest block">
                Light Theme Workspace
              </small>
            </div>
          </div>

          {/* Top Nav Buttons & Selects */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-3xl">
            <button
              id="nav-timeline-btn"
              onClick={() => {
                setActiveView('timeline');
                setFilterSubject('all');
                setFilterEducator('all');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'timeline' && filterSubject === 'all' && filterEducator === 'all'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              Full Timeline
            </button>

            {/* Subject Dropdown */}
            <select
              id="nav-subject-select"
              value={filterSubject}
              onChange={(e) => {
                setFilterSubject(e.target.value);
                setFilterEducator('all');
                setActiveView('timeline');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer max-w-[180px] truncate ${
                filterSubject !== 'all'
                  ? 'bg-white text-indigo-600 border-indigo-300 shadow-xs'
                  : 'bg-transparent text-slate-600 border-transparent hover:bg-indigo-50/50'
              }`}
            >
              <option value="all">📚 By Subject...</option>
              {allSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            {/* Educator Dropdown */}
            <select
              id="nav-educator-select"
              value={filterEducator}
              onChange={(e) => {
                setFilterEducator(e.target.value);
                setFilterSubject('all');
                setActiveView('timeline');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer max-w-[200px] truncate ${
                filterEducator !== 'all'
                  ? 'bg-white text-indigo-600 border-indigo-300 shadow-xs'
                  : 'bg-transparent text-slate-600 border-transparent hover:bg-indigo-50/50'
              }`}
            >
              <option value="all">👨‍🏫 By Educator...</option>
              {allEducators.map(edu => (
                <option key={edu} value={edu}>{edu.split(',')[0]}</option>
              ))}
            </select>

            <button
              id="nav-analytics-btn"
              onClick={() => setActiveView('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'analytics'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              Analytics
            </button>

            {/* Blinking Live Week Button */}
            <button
              id="nav-live-week-btn"
              onClick={handleLiveWeekClick}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer flex items-center gap-1.5 animate-pulse shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              🔴 Live Week (Wk {currentCalWeek.week})
            </button>
          </nav>

          {/* Action Print */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-print-schedule"
              onClick={() => window.print()}
              title="Print Schedule"
              className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-300 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1700px] mx-auto px-4 sm:px-8 pt-8">

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all hover:-translate-y-0.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Active Scope
            </label>
            <strong className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {selectedWeek === 'all' ? 'All' : `Wk ${selectedWeek}`}
            </strong>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all hover:-translate-y-0.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Total Modules
            </label>
            <strong className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {filteredItems.length}
            </strong>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all hover:-translate-y-0.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Disciplines
            </label>
            <strong className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {new Set(filteredItems.map(i => i.subject)).size}
            </strong>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all hover:-translate-y-0.5">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Educators
            </label>
            <strong className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {new Set(filteredItems.map(i => i.resource).filter(Boolean)).size}
            </strong>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Timeline Selector */}
          <aside className="lg:col-span-3 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 shadow-xs sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto space-y-2">
            <div className="px-2 pb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Timeline Selector
            </div>

            <button
              id="sidebar-week-all"
              onClick={() => setSelectedWeek('all')}
              className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                selectedWeek === 'all'
                  ? 'bg-white border-slate-300 text-indigo-600 shadow-xs ring-2 ring-indigo-500/10'
                  : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div>
                <strong className="text-xs font-bold block text-slate-900">Full Timeline</strong>
                <small className="text-[10px] text-slate-400 block font-medium mt-0.5">Chronological 22-Week List</small>
              </div>
            </button>

            {STUDY_PLAN_DATA.map(w => {
              const range = getWeekDateRange(w);
              const isActive = selectedWeek === w.week;
              const isCurrent = currentCalWeek.week === w.week;

              return (
                <button
                  id={`sidebar-week-${w.week}`}
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    isActive
                      ? 'bg-white border-indigo-200 text-indigo-600 shadow-xs ring-2 ring-indigo-500/10'
                      : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <strong className="text-xs font-bold block text-slate-900">Week {w.week}</strong>
                    <small className="text-[10px] text-slate-400 block font-medium mt-0.5">
                      {range ? `${formatDateStr(range[0])} – ${formatDateStr(range[1])}` : ''}
                    </small>
                  </div>

                  {/* Indicator Dot */}
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isCurrent 
                      ? 'bg-emerald-600 shadow-md shadow-emerald-500/50 ring-2 ring-emerald-300 animate-pulse' 
                      : 'bg-slate-200'
                  }`} />
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-9 space-y-6">
            
            {/* Header & Search Controls */}
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {getTitle()}
                </h2>
                <p className="text-xs font-bold text-sky-600 mt-1">
                  {getSubTitle()}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search Box */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="input-search-timeline"
                    type="text"
                    placeholder="Search topic or educator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
                  />
                </div>

                {/* Dropdown Week Selector */}
                <select
                  id="dropdown-week-selector"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-3 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs cursor-pointer"
                >
                  <option value="all">All Weeks (Full Timeline)</option>
                  {STUDY_PLAN_DATA.map(w => (
                    <option key={w.week} value={w.week}>Week {w.week}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List or Analytics Rendering */}
            {filteredItems.length === 0 ? (
              <div className="bg-white/60 border border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-500 font-bold space-y-3">
                <p>No matching schedule parameters detected.</p>
                <button
                  onClick={() => {
                    setSelectedWeek('all');
                    setFilterSubject('all');
                    setFilterEducator('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-extrabold text-indigo-600 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : activeView === 'timeline' ? (
              /* List View */
              <div className="space-y-3">
                {filteredItems.map((item, idx) => {
                  const isToday = isItemToday(item, now);
                  const isTest = item.type === 'test';
                  const dateObj = parseIsoDate(item.iso);
                  const dayStr = dateObj ? dateObj.toLocaleDateString('en-IN', { weekday: 'short' }) : '';

                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/90 backdrop-blur-md border rounded-2xl p-4 sm:p-5 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                        isToday
                          ? 'border-l-4 border-l-emerald-600 bg-emerald-50/60 border-emerald-200'
                          : isTest
                          ? 'border-l-4 border-l-amber-500 bg-amber-50/60 border-amber-200'
                          : 'border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Date & Week Column (3 cols) */}
                      <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start items-center md:items-start border-b md:border-b-0 md:border-r border-slate-100 pb-2 md:pb-0 md:pr-4">
                        <b className="text-sm font-extrabold text-slate-900">{item.date}</b>
                        <span className="text-xs text-slate-500 font-semibold mt-0.5">
                          {dayStr} • Wk {item.weekNum}
                        </span>
                      </div>

                      {/* Subject Column (2 cols) */}
                      <div className="md:col-span-3 flex items-center gap-2.5 text-xs font-bold text-slate-700">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base shrink-0">
                          {getSubjectIcon(item.subject)}
                        </div>
                        <span className="truncate">
                          {item.subject === 'Unit Test' ? 'Assessment' : item.label}
                        </span>
                      </div>

                      {/* Topic Column (4 cols) */}
                      <div className="md:col-span-4 space-y-1">
                        <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                          {item.topic || 'TBA'}
                        </h4>
                        <small className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                          isTest ? 'text-amber-700' : 'text-indigo-600'
                        }`}>
                          {isTest ? 'Unit Performance Test' : 'Learning Module'}
                        </small>
                      </div>

                      {/* Resource Person Column (3 cols) */}
                      <div className="md:col-span-2 flex flex-col justify-center">
                        <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                          Educator
                        </label>
                        <div className="text-xs font-bold text-slate-600 mt-0.5 leading-tight">
                          {item.resource || 'Self-Paced / Digital'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Analytics View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Subject Distribution */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Subject Distribution (Current View)
                  </h3>

                  {(() => {
                    const counts: Record<string, number> = {};
                    filteredItems.forEach(i => {
                      counts[i.subject] = (counts[i.subject] || 0) + 1;
                    });
                    const max = Math.max(...Object.values(counts), 1);

                    return (
                      <div className="space-y-4">
                        {Object.entries(counts).map(([subj, count]) => {
                          const pct = (count / max) * 100;
                          return (
                            <div key={subj} className="flex items-center gap-3">
                              <div className="w-32 text-xs font-bold text-slate-600 truncate flex items-center gap-1.5">
                                <span>{getSubjectIcon(subj)}</span>
                                <span>{subj}</span>
                              </div>
                              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="w-8 text-right text-xs font-extrabold text-slate-900">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Schedule Summary */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Schedule Summary
                  </h3>
                  <div className="space-y-3 text-xs font-semibold text-slate-700">
                    <p className="flex justify-between p-3 bg-slate-50 rounded-2xl">
                      <span>Total Learning Sessions:</span>
                      <b className="text-slate-900">{filteredItems.filter(i => i.type === 'study').length}</b>
                    </p>
                    <p className="flex justify-between p-3 bg-slate-50 rounded-2xl">
                      <span>Total Assessments:</span>
                      <b className="text-slate-900">{filteredItems.filter(i => i.type === 'test').length}</b>
                    </p>
                    <p className="flex justify-between p-3 bg-slate-50 rounded-2xl">
                      <span>Unique Educators Active:</span>
                      <b className="text-slate-900">{new Set(filteredItems.map(i => i.resource).filter(Boolean)).size}</b>
                    </p>
                  </div>
                </div>

              </div>
            )}

          </section>

        </div>
      </main>

    </div>
  );
}
