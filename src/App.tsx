/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  BookMarked, 
  Flame, 
  Home, 
  Menu, 
  X, 
  FileSpreadsheet,
  Globe,
  School,
  Gamepad2,
  Camera,
  Trophy
} from 'lucide-react';
import { INITIAL_RECORDS, SchoolRecord } from './types';
import Dashboard from './components/Dashboard';
import SchoolsList from './components/SchoolsList';
import Leaderboard from './components/Leaderboard';
import StudyPlan from './components/StudyPlan';
import StudyMaterial from './components/StudyMaterial';
import ClassroomGallery from './components/ClassroomGallery';
import OnlineTest from './components/OnlineTest';
import GamificationLearningResults from './components/GamificationLearningResults';
import AdminPortal from './components/AdminPortal';
import { apiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [records, setRecords] = useState<SchoolRecord[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServerSynced, setIsServerSynced] = useState<boolean>(false);

  // Load records from backend API server or fallback to local storage / INITIAL_RECORDS
  useEffect(() => {
    async function loadBackendRecords() {
      try {
        const serverRecords = await apiService.getRecords();
        if (serverRecords && serverRecords.length > 0) {
          setRecords(serverRecords);
          setIsServerSynced(true);
          return;
        }
      } catch (err) {
        console.warn('Backend fetch error, falling back to local storage:', err);
      }

      // Fallback to local storage or initial defaults
      const saved = localStorage.getItem('vetrisudar_records');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingIds = new Set(parsed.map((r: SchoolRecord) => r.id));
            let merged = [...parsed];
            INITIAL_RECORDS.forEach(rec => {
              if (!existingIds.has(rec.id)) {
                merged.push(rec);
              }
            });
            setRecords(merged);
            localStorage.setItem('vetrisudar_records', JSON.stringify(merged));
            return;
          }
        } catch (err) {
          setRecords(INITIAL_RECORDS);
        }
      } else {
        setRecords(INITIAL_RECORDS);
      }
    }

    loadBackendRecords();
  }, []);

  // Save records to state, localStorage, and Express backend API
  const saveRecords = async (newRecords: SchoolRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('vetrisudar_records', JSON.stringify(newRecords));
  };

  // Callback to update or add a single school record (Top 3 marks for a test)
  const handleSaveRecord = async (updatedRecord: SchoolRecord) => {
    const exists = records.some(r => r.id === updatedRecord.id);
    let newRecords: SchoolRecord[];
    
    if (exists) {
      newRecords = records.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    } else {
      newRecords = [...records, updatedRecord];
    }
    
    saveRecords(newRecords);

    // Sync to backend API
    try {
      const result = await apiService.saveRecord(updatedRecord);
      if (result.success) {
        setIsServerSynced(true);
      }
    } catch (err) {
      console.warn('Could not save to backend API server:', err);
    }
  };

  // Callback to import an entire new list of records (restoring backup)
  const handleImportRecords = async (newRecords: SchoolRecord[]) => {
    saveRecords(newRecords);
    await apiService.batchImport(newRecords);
  };

  // Safe navigation helper that closes mobile drawer
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-orange-500/20 selection:text-orange-600">
      
      {/* Top Header Section */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Row 1: Brand Title & Mobile Menu / Sub-info */}
          <div className="flex justify-between items-center py-3 border-b border-slate-100">
            
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => navigateTo('dashboard')}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-60 blur-sm group-hover:opacity-90 transition duration-300"></div>
                <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md transform group-hover:scale-105 transition duration-300">
                  <Flame className="h-6 w-6 text-white animate-pulse" fill="currentColor" />
                </div>
              </div>
              <div>
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight block text-slate-900 group-hover:text-orange-600 transition-colors">
                  வெற்றிச் சுடர் <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">NMMS</span>
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-extrabold block uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  காடையாம்பட்டி ஒன்றியம் • 2026
                </span>
              </div>
            </div>

            {/* Quick Badge / Info on Desktop */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 bg-orange-50/90 border border-orange-200/70 px-4 py-1.5 rounded-full shadow-2xs">
              <Award className="w-4 h-4 text-orange-600" />
              <span>NMMS தேர்வு பயிற்சி & மாதிரி தேர்வுகள் 2026</span>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                id="btn-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>

          {/* Row 2: Two-Row Desktop Navigation Bar */}
          <div className="hidden md:flex flex-col items-center gap-2 py-3">
            
            {/* Top Navigation Row: Core Learning & School Records */}
            <nav className="flex items-center justify-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <button
                id="nav-tab-dashboard"
                onClick={() => navigateTo('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <Home className="h-3.5 w-3.5" /> முகப்பு
              </button>
              
              <button
                id="nav-tab-schools"
                onClick={() => navigateTo('schools')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'schools' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <School className="h-3.5 w-3.5" /> பள்ளிகள் பட்டியல்
              </button>

              <button
                id="nav-tab-leaderboard"
                onClick={() => navigateTo('leaderboard')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'leaderboard' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <Award className="h-3.5 w-3.5" /> தரவரிசை
              </button>

              <button
                id="nav-tab-study-plan"
                onClick={() => navigateTo('study_plan')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'study_plan' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" /> பாடத்திட்டம்
              </button>

              <button
                id="nav-tab-study-material"
                onClick={() => navigateTo('study_material')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'study_material' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <BookMarked className="h-3.5 w-3.5" /> பாடக் குறிப்புகள்
              </button>
            </nav>

            {/* Bottom Navigation Row: Interactive, Activities & Admin Portal */}
            <nav className="flex items-center justify-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
              <button
                id="nav-tab-gallery"
                onClick={() => navigateTo('gallery')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'gallery' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <Camera className="h-3.5 w-3.5 text-orange-600" /> வகுப்பறை கேலரி
              </button>

              <button
                id="nav-tab-online-test"
                onClick={() => navigateTo('online_test')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'online_test' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <Gamepad2 className="h-3.5 w-3.5 text-indigo-600" /> ஆன்லைன் தேர்வுகள்
              </button>

              <button
                id="nav-tab-gamification"
                onClick={() => navigateTo('gamification_results')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'gamification_results' 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                <Trophy className="h-3.5 w-3.5 text-purple-600" /> விளையாட்டு முடிவுகள்
              </button>

              <button
                id="nav-tab-admin-portal"
                onClick={() => navigateTo('admin_portal')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === 'admin_portal' 
                    ? 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-sm' 
                    : 'text-indigo-700 bg-indigo-50/90 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200/80'
                }`}
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-600" /> நிர்வாக முகப்பு (Admin Portal)
              </button>
            </nav>

          </div>

        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-3 px-4 space-y-1 shadow-lg animate-slideDown print:hidden">
          <button
            id="mobile-nav-dashboard"
            onClick={() => navigateTo('dashboard')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'dashboard' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Home className="h-4 w-4" /> முகப்பு (Dashboard)
          </button>
          
          <button
            id="mobile-nav-schools"
            onClick={() => navigateTo('schools')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'schools' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <School className="h-4 w-4" /> பள்ளிகள் பட்டியல்
          </button>

          <button
            id="mobile-nav-leaderboard"
            onClick={() => navigateTo('leaderboard')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'leaderboard' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Award className="h-4 w-4" /> வட்டார தரவரிசை
          </button>

          <button
            id="mobile-nav-study-plan"
            onClick={() => navigateTo('study_plan')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'study_plan' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="h-4 w-4" /> பாடத்திட்டம் (Study Plan)
          </button>

          <button
            id="mobile-nav-study-material"
            onClick={() => navigateTo('study_material')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'study_material' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BookMarked className="h-4 w-4" /> பாடக் குறிப்புகள் (Study Materials)
          </button>

          <button
            id="mobile-nav-gallery"
            onClick={() => navigateTo('gallery')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'gallery' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Camera className="h-4 w-4 text-orange-600" /> வகுப்பறை கேலரி (Photo Gallery)
          </button>

          <button
            id="mobile-nav-online-test"
            onClick={() => navigateTo('online_test')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'online_test' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Gamepad2 className="h-4 w-4 text-indigo-600" /> ஆன்லைன் தேர்வுகள் (Online Tests)
          </button>

          <button
            id="mobile-nav-gamification"
            onClick={() => navigateTo('gamification_results')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'gamification_results' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Trophy className="h-4 w-4 text-purple-600" /> விளையாட்டு கற்றல் முடிவுகள் (Gamification)
          </button>

          <button
            id="mobile-nav-admin-portal"
            onClick={() => navigateTo('admin_portal')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'admin_portal' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-black' : 'text-indigo-700 bg-indigo-50/40 hover:bg-indigo-50'
            }`}
          >
            <FileSpreadsheet className="h-4 w-4 text-indigo-600" /> நிர்வாக முகப்பு (Admin Portal)
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
        activeTab === 'admin_portal' || activeTab === 'study_plan' ? 'max-w-[1700px]' : 'max-w-7xl'
      }`}>
        
        {activeTab === 'dashboard' && (
          <Dashboard records={records} onNavigate={navigateTo} />
        )}

        {activeTab === 'schools' && (
          <SchoolsList 
            records={records} 
            onSaveRecord={handleSaveRecord} 
            onImportData={handleImportRecords} 
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard records={records} />
        )}

        {activeTab === 'study_plan' && (
          <StudyPlan />
        )}

        {activeTab === 'study_material' && (
          <StudyMaterial />
        )}

        {activeTab === 'gallery' && (
          <ClassroomGallery />
        )}

        {activeTab === 'online_test' && (
          <OnlineTest />
        )}

        {activeTab === 'gamification_results' && (
          <GamificationLearningResults />
        )}

        {activeTab === 'admin_portal' && (
          <AdminPortal 
            records={records}
            onSaveRecord={handleSaveRecord}
            onImportData={handleImportRecords}
          />
        )}

      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-orange-700 font-extrabold uppercase tracking-widest flex items-center gap-1.5 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200/80">
              <Globe className="h-3.5 w-3.5 text-orange-600" /> NMMS "வெற்றிச் சுடர்" இணையவழிப் பயிற்சி இயக்கம் — 2026
            </span>
          </div>
          
          <p className="text-xs text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            தொழில்நுட்ப ஆதரவு: <strong className="text-slate-900 font-bold">ஆசிரியர் பயிற்றுநர் ஐய்யப்பன்</strong>.
          </p>

          <p className="text-[11px] text-slate-400 font-mono">
            &copy; 2026 Vetri Sudar Kadayampatti. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
