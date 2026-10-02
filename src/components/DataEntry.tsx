/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  School as SchoolIcon, 
  Search, 
  Download, 
  Upload, 
  Edit, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Plus,
  Lock,
  Unlock,
  Key,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { SCHOOLS, SchoolRecord, StudentMark, School, TEST_SCHEDULE, isTestLocked } from '../types';

interface DataEntryProps {
  records: SchoolRecord[];
  onSaveRecord: (updatedRecord: SchoolRecord) => void;
  onImportData: (newRecords: SchoolRecord[]) => void;
  initialSchoolId?: string;
}

export default function DataEntry({ records, onSaveRecord, onImportData, initialSchoolId }: DataEntryProps) {
  // Select state
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(initialSchoolId || SCHOOLS[0].id);
  const [selectedTestId, setSelectedTestId] = useState<string>('test_6');

  // Admin Override Lock state
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [passkeyError, setPasskeyError] = useState<string>('');
  
  useEffect(() => {
    if (initialSchoolId) {
      setSelectedSchoolId(initialSchoolId);
    }
  }, [initialSchoolId]);

  // When test changes, reset admin unlock override
  useEffect(() => {
    setAdminUnlocked(false);
  }, [selectedTestId]);

  // Calendar lock checking
  const currentTestObj = TEST_SCHEDULE.find(t => t.id === selectedTestId) || {
    id: selectedTestId,
    label: selectedTestId,
    date: '2026-07-30',
    formattedDate: '30.07.2026'
  };
  const testIsLocked = isTestLocked(selectedTestId);
  const isReadOnly = testIsLocked && !adminUnlocked;

  // Search state for table
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Form states for Rank 1, 2, 3
  const [rank1Name, setRank1Name] = useState('');
  const [rank1Mat, setRank1Mat] = useState(0);
  const [rank1Math, setRank1Math] = useState(0);
  const [rank1Sci, setRank1Sci] = useState(0);
  const [rank1Soc, setRank1Soc] = useState(0);

  const [rank2Name, setRank2Name] = useState('');
  const [rank2Mat, setRank2Mat] = useState(0);
  const [rank2Math, setRank2Math] = useState(0);
  const [rank2Sci, setRank2Sci] = useState(0);
  const [rank2Soc, setRank2Soc] = useState(0);

  const [rank3Name, setRank3Name] = useState('');
  const [rank3Mat, setRank3Mat] = useState(0);
  const [rank3Math, setRank3Math] = useState(0);
  const [rank3Sci, setRank3Sci] = useState(0);
  const [rank3Soc, setRank3Soc] = useState(0);

  // Status/Alert states
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // File import state ref or handler
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Load active record details when school or test changes
  useEffect(() => {
    const activeRecord = records.find(
      r => r.schoolId === selectedSchoolId && r.testId === selectedTestId
    );

    if (activeRecord) {
      setRank1Name(activeRecord.rank_1.studentName);
      setRank1Mat(activeRecord.rank_1.mat);
      setRank1Math(activeRecord.rank_1.satMath);
      setRank1Sci(activeRecord.rank_1.satScience);
      setRank1Soc(activeRecord.rank_1.satSocial);

      setRank2Name(activeRecord.rank_2.studentName);
      setRank2Mat(activeRecord.rank_2.mat);
      setRank2Math(activeRecord.rank_2.satMath);
      setRank2Sci(activeRecord.rank_2.satScience);
      setRank2Soc(activeRecord.rank_2.satSocial);

      setRank3Name(activeRecord.rank_3.studentName);
      setRank3Mat(activeRecord.rank_3.mat);
      setRank3Math(activeRecord.rank_3.satMath);
      setRank3Sci(activeRecord.rank_3.satScience);
      setRank3Soc(activeRecord.rank_3.satSocial);
    } else {
      // Clear form for new record
      setRank1Name(''); setRank1Mat(0); setRank1Math(0); setRank1Sci(0); setRank1Soc(0);
      setRank2Name(''); setRank2Mat(0); setRank2Math(0); setRank2Sci(0); setRank2Soc(0);
      setRank3Name(''); setRank3Mat(0); setRank3Math(0); setRank3Sci(0); setRank3Soc(0);
    }
    setSaveSuccess(false);
    setErrorMsg('');
  }, [selectedSchoolId, selectedTestId, records]);

  // Admin Passkey Unlock Handler
  const handleAdminUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim().toLowerCase() === 'admin' || passkeyInput.trim() === '2026' || passkeyInput.trim() === '1234') {
      setAdminUnlocked(true);
      setShowAdminModal(false);
      setPasskeyInput('');
      setPasskeyError('');
    } else {
      setPasskeyError('தவறான கடவுச்சொல்! (Invalid Passkey — "admin" அல்லது "2026" ஐ உள்ளிடவும்)');
    }
  };

  // Handle Form Submission & Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isReadOnly) {
      setErrorMsg('முடிவடைந்த தேர்வின் மதிப்பெண்களைத் திருத்த முடியாது! (Completed test is locked by calendar)');
      return;
    }

    // Input Validation
    const validateMark = (mat: number, math: number, sci: number, soc: number) => {
      if (mat < 0 || mat > 50) return 'MAT மதிப்பெண் 0 முதல் 50 வரை மட்டுமே இருக்க வேண்டும்!';
      if (math < 0 || math > 10) return 'SAT கணித மதிப்பெண் 0 முதல் 10 வரை மட்டுமே இருக்க வேண்டும்!';
      if (sci < 0 || sci > 20) return 'SAT அறிவியல் மதிப்பெண் 0 முதல் 20 வரை மட்டுமே இருக்க வேண்டும்!';
      if (soc < 0 || soc > 20) return 'SAT சமூக அறிவியல் மதிப்பெண் 0 முதல் 20 வரை மட்டுமே இருக்க வேண்டும்!';
      return null;
    };

    const err1 = validateMark(rank1Mat, rank1Math, rank1Sci, rank1Soc);
    if (err1) { setErrorMsg(`முதலிடம் (Rank 1): ${err1}`); return; }
    
    const err2 = validateMark(rank2Mat, rank2Math, rank2Sci, rank2Soc);
    if (err2) { setErrorMsg(`இரண்டாமிடம் (Rank 2): ${err2}`); return; }

    const err3 = validateMark(rank3Mat, rank3Math, rank3Sci, rank3Soc);
    if (err3) { setErrorMsg(`மூன்றாமிடம் (Rank 3): ${err3}`); return; }

    if (!rank1Name.trim() || !rank2Name.trim() || !rank3Name.trim()) {
      setErrorMsg('அனைத்து 3 மாணவர்களின் பெயர்களையும் உள்ளிடவும்!');
      return;
    }

    // Build StudentMark objects
    const rank_1: StudentMark = {
      studentName: rank1Name.trim(),
      mat: Number(rank1Mat),
      satMath: Number(rank1Math),
      satScience: Number(rank1Sci),
      satSocial: Number(rank1Soc),
      total: Number(rank1Mat) + Number(rank1Math) + Number(rank1Sci) + Number(rank1Soc)
    };

    const rank_2: StudentMark = {
      studentName: rank2Name.trim(),
      mat: Number(rank2Mat),
      satMath: Number(rank2Math),
      satScience: Number(rank2Sci),
      satSocial: Number(rank2Soc),
      total: Number(rank2Mat) + Number(rank2Math) + Number(rank2Sci) + Number(rank2Soc)
    };

    const rank_3: StudentMark = {
      studentName: rank3Name.trim(),
      mat: Number(rank3Mat),
      satMath: Number(rank3Math),
      satScience: Number(rank3Sci),
      satSocial: Number(rank3Soc),
      total: Number(rank3Mat) + Number(rank3Math) + Number(rank3Sci) + Number(rank3Soc)
    };

    // Make sure rankings are mathematically correct
    if (rank_2.total > rank_1.total) {
      setErrorMsg('இரண்டாமிடம் பெற்றவரின் மொத்த மதிப்பெண் முதலிடம் பெற்றவரை விட அதிகமாக இருக்கக் கூடாது!');
      return;
    }
    if (rank_3.total > rank_2.total) {
      setErrorMsg('மூன்றாமிடம் பெற்றவரின் மொத்த மதிப்பெண் இரண்டாமிடம் பெற்றவரை விட அதிகமாக இருக்கக் கூடாது!');
      return;
    }

    const updatedRecord: SchoolRecord = {
      id: `${selectedSchoolId}_${selectedTestId}`,
      schoolId: selectedSchoolId,
      testId: selectedTestId,
      rank_1,
      rank_2,
      rank_3,
      lastUpdated: new Date().toISOString()
    };

    onSaveRecord(updatedRecord);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Export database to JSON file
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NMMS_VetriSudar_Data_Backup_${new Date().toLocaleDateString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import database from JSON file
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData) && importedData.length > 0 && importedData[0].schoolId) {
          onImportData(importedData);
          setImportStatus('தரவுகள் வெற்றிகரமாக இறக்குமதி செய்யப்பட்டன!');
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          setImportStatus('பிழையான கோப்பு வடிவம்!');
        }
      } catch (err) {
        setImportStatus('கோப்பை வாசிப்பதில் பிழை ஏற்பட்டது!');
      }
    };
    fileReader.readAsText(files[0]);
  };

  // Get current active test schools list for display
  const activeTestRecords = records.filter(r => r.testId === selectedTestId);
  const activeSchoolData = activeTestRecords.map(rec => {
    const sch = SCHOOLS.find(s => s.id === rec.schoolId);
    return {
      record: rec,
      schoolName: sch?.name || 'Unknown School',
      udise: sch?.udise || 'N/A',
      rank1Name: rec.rank_1.studentName,
      rank1Total: rec.rank_1.total,
      rank2Name: rec.rank_2.studentName,
      rank2Total: rec.rank_2.total,
      rank3Name: rec.rank_3.studentName,
      rank3Total: rec.rank_3.total,
      lastUpdated: new Date(rec.lastUpdated).toLocaleDateString()
    };
  });

  // Filter records based on search
  const filteredSchoolData = activeSchoolData.filter(d => 
    d.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.udise.includes(searchTerm) ||
    d.rank1Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with Title and Import/Export Utilities */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <SchoolIcon className="h-5 w-5 text-orange-600" />
            பள்ளி வாரியான முதன்மை மாணவர்கள் தரவு (School-wise Entry Portal)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            ஒவ்வொரு வெள்ளிக்கிழமை OMR தேர்வில் உங்கள் பள்ளியில் முதல் 3 மதிப்பெண்கள் பெற்ற மாணவர்களின் விவரங்களை பதிவுசெய்யவும்.
          </p>
        </div>

        {/* Backups buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-export-data"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
            title="Export database to JSON file"
          >
            <Download className="h-3.5 w-3.5" /> காப்புப்பிரதி (Export JSON)
          </button>
          
          <label 
            htmlFor="import-file" 
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl cursor-pointer transition-all"
            title="Import database from JSON file"
          >
            <Upload className="h-3.5 w-3.5" /> கோப்பு பதிவேற்று (Import JSON)
            <input 
              type="file" 
              id="import-file" 
              accept=".json" 
              onChange={handleImport} 
              className="hidden" 
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-pulse">
          <CheckCircle2 className="h-4 w-4" /> {importStatus}
        </div>
      )}

      {/* Main Grid: Entry Form Left (8 cols) and Selector Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Data Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-6">
          
          {/* Quick Selection Indicators & Calendar Lock Banner */}
          <div className="space-y-3">
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold font-display text-sm">
                  A
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">தேர்ந்தெடுக்கப்பட்ட பள்ளி & தேர்வு</span>
                  <span className="text-xs font-bold text-slate-800">
                    {SCHOOLS.find(s => s.id === selectedSchoolId)?.name} — {currentTestObj.label} ({currentTestObj.formattedDate})
                  </span>
                </div>
              </div>

              <div>
                {testIsLocked ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                    <Lock className="h-3.5 w-3.5 text-amber-700" /> முடிவடைந்த தேர்வு (Locked)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                    <Unlock className="h-3.5 w-3.5 text-emerald-700" /> வரவிருக்கும் தேர்வு (Open)
                  </span>
                )}
              </div>
            </div>

            {/* Lock Warning Banner */}
            {testIsLocked && (
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                isReadOnly 
                  ? 'bg-amber-50/90 border-amber-200 text-amber-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${isReadOnly ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {isReadOnly ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider">
                      {isReadOnly ? '🔒 நாட்காட்டிப் பூட்டு (Automated Calendar Lock)' : '🔓 நிர்வாகி சிறப்பு அனுமதி பெறப்பட்டது (Admin Unlocked)'}
                    </h4>
                    <p className="text-xs mt-0.5 text-slate-600 leading-relaxed">
                      {isReadOnly 
                        ? `இத்தேர்வு நாள் (${currentTestObj.formattedDate}) முடிவடைந்துவிட்டதால், ஆசிரியர் பதிவேற்றம் நாட்காட்டிப்படி தானாகப் பூட்டப்பட்டுள்ளது. ஆசிரியர்கள் வரவிருக்கும் தேர்வுகளுக்கு மட்டுமே மதிப்பெண் பதிவு செய்ய முடியும்.`
                        : 'நிர்வாகி அனுமதியுடன் முடிவடைந்த தேர்வின் மதிப்பெண்களைத் திருத்தலாம்.'}
                    </p>
                  </div>
                </div>

                {isReadOnly ? (
                  <button
                    type="button"
                    onClick={() => { setShowAdminModal(true); setPasskeyError(''); }}
                    className="px-3.5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                  >
                    <Key className="h-3.5 w-3.5 text-amber-300" /> நிர்வாகி பூட்டு நீக்கம் (Admin Unlock)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAdminUnlocked(false)}
                    className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5" /> மீண்டும் பூட்டு (Relock)
                  </button>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Rank 1 Student Section */}
            <div className="border border-amber-100 bg-amber-50/10 rounded-2xl p-5 space-y-4 relative">
              <div className="absolute top-4 right-4 bg-amber-500 text-amber-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                1st Rank (முதல் மதிப்பெண்)
              </div>
              <h3 className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center text-xs font-bold font-mono">1</span>
                முதலிடம் பெற்ற மாணவர் விவரம்
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">மாணவர் பெயர் (Student Name)</label>
                  <input 
                    type="text" 
                    value={rank1Name}
                    disabled={isReadOnly}
                    onChange={e => setRank1Name(e.target.value)}
                    placeholder="எ.கா: கவின் நிலா. ம"
                    className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-orange-500 transition-all font-semibold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="Mental Ability Test - Max 50">MAT (/50)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={rank1Mat}
                      disabled={isReadOnly}
                      onChange={e => setRank1Mat(Math.min(50, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Mathematics - Max 10">Math (/10)</label>
                    <input 
                      type="number" 
                      min="0" max="10"
                      value={rank1Math}
                      disabled={isReadOnly}
                      onChange={e => setRank1Math(Math.min(10, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Science - Max 20">Sci (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank1Sci}
                      disabled={isReadOnly}
                      onChange={e => setRank1Sci(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Social Science - Max 20">Soc (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank1Soc}
                      disabled={isReadOnly}
                      onChange={e => setRank1Soc(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right text-xs font-bold text-slate-600">
                மொத்த மதிப்பெண்: <span className="text-sm font-mono text-orange-600 bg-white px-2 py-0.5 rounded border border-slate-100">{rank1Mat + rank1Math + rank1Sci + rank1Soc}</span> / 100
              </div>
            </div>

            {/* Rank 2 Student Section */}
            <div className="border border-slate-200 bg-slate-50/10 rounded-2xl p-5 space-y-4 relative">
              <div className="absolute top-4 right-4 bg-slate-300 text-slate-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                2nd Rank (இரண்டாம் இடம்)
              </div>
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center text-xs font-bold font-mono">2</span>
                இரண்டாமிடம் பெற்ற மாணவர் விவரம்
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">மாணவர் பெயர் (Student Name)</label>
                  <input 
                    type="text" 
                    value={rank2Name}
                    disabled={isReadOnly}
                    onChange={e => setRank2Name(e.target.value)}
                    placeholder="எ.கா: எழிலரசன். ச"
                    className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-orange-500 transition-all font-semibold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="Mental Ability Test - Max 50">MAT (/50)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={rank2Mat}
                      disabled={isReadOnly}
                      onChange={e => setRank2Mat(Math.min(50, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Mathematics - Max 10">Math (/10)</label>
                    <input 
                      type="number" 
                      min="0" max="10"
                      value={rank2Math}
                      disabled={isReadOnly}
                      onChange={e => setRank2Math(Math.min(10, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Science - Max 20">Sci (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank2Sci}
                      disabled={isReadOnly}
                      onChange={e => setRank2Sci(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Social Science - Max 20">Soc (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank2Soc}
                      disabled={isReadOnly}
                      onChange={e => setRank2Soc(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right text-xs font-bold text-slate-600">
                மொத்த மதிப்பெண்: <span className="text-sm font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100">{rank2Mat + rank2Math + rank2Sci + rank2Soc}</span> / 100
              </div>
            </div>

            {/* Rank 3 Student Section */}
            <div className="border border-slate-200 bg-slate-50/10 rounded-2xl p-5 space-y-4 relative">
              <div className="absolute top-4 right-4 bg-orange-200 text-orange-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                3rd Rank (மூன்றாம் இடம்)
              </div>
              <h3 className="text-sm font-bold text-orange-800 flex items-center gap-1.5">
                <span className="h-6 w-6 rounded-full bg-orange-200 text-orange-950 flex items-center justify-center text-xs font-bold font-mono">3</span>
                மூன்றாமிடம் பெற்ற மாணவர் விவரம்
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">மாணவர் பெயர் (Student Name)</label>
                  <input 
                    type="text" 
                    value={rank3Name}
                    disabled={isReadOnly}
                    onChange={e => setRank3Name(e.target.value)}
                    placeholder="எ.கா: தனுஷ்கோடி. க"
                    className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-orange-500 transition-all font-semibold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="Mental Ability Test - Max 50">MAT (/50)</label>
                    <input 
                      type="number" 
                      min="0" max="50"
                      value={rank3Mat}
                      disabled={isReadOnly}
                      onChange={e => setRank3Mat(Math.min(50, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Mathematics - Max 10">Math (/10)</label>
                    <input 
                      type="number" 
                      min="0" max="10"
                      value={rank3Math}
                      disabled={isReadOnly}
                      onChange={e => setRank3Math(Math.min(10, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Science - Max 20">Sci (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank3Sci}
                      disabled={isReadOnly}
                      onChange={e => setRank3Sci(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1 text-center" title="SAT Social Science - Max 20">Soc (/20)</label>
                    <input 
                      type="number" 
                      min="0" max="20"
                      value={rank3Soc}
                      disabled={isReadOnly}
                      onChange={e => setRank3Soc(Math.min(20, Number(e.target.value)))}
                      className="w-full text-center text-xs bg-white border border-slate-200 rounded-lg py-2 focus:outline-hidden focus:border-orange-500 transition-all font-mono font-bold disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right text-xs font-bold text-slate-600">
                மொத்த மதிப்பெண்: <span className="text-sm font-mono text-orange-800 bg-white px-2 py-0.5 rounded border border-slate-100">{rank3Mat + rank3Math + rank3Sci + rank3Soc}</span> / 100
              </div>
            </div>

            {/* Error Message if validation fails */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-pulse">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                <span className="font-semibold">{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">தரவுகள் வெற்றிகரமாக சேமிக்கப்பட்டன!</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                id="btn-reset-form"
                disabled={isReadOnly}
                onClick={() => {
                  setRank1Name(''); setRank1Mat(0); setRank1Math(0); setRank1Sci(0); setRank1Soc(0);
                  setRank2Name(''); setRank2Mat(0); setRank2Math(0); setRank2Sci(0); setRank2Soc(0);
                  setRank3Name(''); setRank3Mat(0); setRank3Math(0); setRank3Sci(0); setRank3Soc(0);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="h-3.5 w-3.5" /> படிவத்தை காலியாக்கு
              </button>

              {isReadOnly ? (
                <button
                  type="button"
                  disabled
                  className="px-6 py-2.5 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 rounded-xl flex items-center gap-2 cursor-not-allowed opacity-90"
                >
                  <Lock className="h-4 w-4 text-amber-800" /> முடிவடைந்த தேர்வு — பூட்டப்பட்டுள்ளது
                </button>
              ) : (
                <button
                  type="submit"
                  id="btn-submit-form"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Save className="h-4 w-4" /> தரவைச் சேமி (Save Record)
                </button>
              )}
            </div>

          </form>

        </div>

        {/* Right Column: Selectors (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-50 pb-2">
              படி நிலை 1: பள்ளி & தேர்வுத் தேர்வு
            </h3>

            {/* School Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500">பள்ளியைத் தேர்ந்தெடுக்கவும் (Select School)</label>
              <select 
                id="select-school"
                value={selectedSchoolId}
                onChange={e => setSelectedSchoolId(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500 transition-all"
              >
                {SCHOOLS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.udise})
                  </option>
                ))}
              </select>
            </div>

            {/* Test Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500">தேர்வை தேர்ந்தெடுக்கவும் (Select Test)</label>
              <select 
                id="select-test"
                value={selectedTestId}
                onChange={e => setSelectedTestId(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500 transition-all cursor-pointer"
              >
                {TEST_SCHEDULE.map(test => {
                  const locked = isTestLocked(test.id);
                  return (
                    <option key={test.id} value={test.id}>
                      {test.label} ({test.formattedDate}) {locked ? '🔒 (முடிவடைந்தது)' : '🔓 (வரவிருக்கும் தேர்வு)'}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Status of school input */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
              <strong>ஆசிரியர்களின் கவனத்திற்கு:</strong> OMR தாள்கள் திருத்தப்பட்ட பின், <strong>முதல் மூன்று அதிக மதிப்பெண்கள்</strong> பெற்ற மாணவர்களை மட்டுமே இதில் பதிவு செய்ய வேண்டும். முடிவடைந்த தேர்வுகளின் மதிப்பெண்கள் நாட்காட்டிப்படி பூட்டப்படும்.
            </div>
          </div>

        </div>
      </div>

      {/* Database Search Inspection Table */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-50">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">
              தற்போதைய தேர்வு நிலை கண்காணிப்பு (Active Test Entries Inspector)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              தேர்ந்தெடுக்கப்பட்ட தேர்வில் பள்ளிகளின் உள்ளீடுகள் மற்றும் முதலிடம் பெற்றவர்கள்
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="பள்ளி அல்லது மாணவர் பெயர்..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg focus:outline-hidden focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold bg-slate-50">
                <th className="py-3 px-4">வ.எண்</th>
                <th className="py-3 px-4">UDISE எண்</th>
                <th className="py-3 px-4">பள்ளியின் பெயர்</th>
                <th className="py-3 px-4">1st Rank மாணவர்</th>
                <th className="py-3 px-4 text-center">1st Mark</th>
                <th className="py-3 px-4">2nd Rank மாணவர்</th>
                <th className="py-3 px-4 text-center">2nd Mark</th>
                <th className="py-3 px-4 text-center">பதிவான தேதி</th>
                <th className="py-3 px-4 text-center">செயல்</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {filteredSchoolData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-slate-400">
                    தரவுகள் ஏதும் இல்லை அல்லது தேடலுக்குரிய பள்ளி கண்டறியப்படவில்லை!
                  </td>
                </tr>
              ) : (
                filteredSchoolData.map((data, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">{index + 1}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{data.udise}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{data.schoolName}</td>
                    <td className="py-3 px-4 text-slate-800">{data.rank1Name}</td>
                    <td className="py-3 px-4 text-center font-bold text-orange-600 font-mono">{data.rank1Total}/100</td>
                    <td className="py-3 px-4 text-slate-600">{data.rank2Name}</td>
                    <td className="py-3 px-4 text-center font-mono text-slate-500">{data.rank2Total}/100</td>
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">{data.lastUpdated}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSchoolId(data.record.schoolId);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-all"
                        title="Edit marks"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Passkey Unlock Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 relative">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">நிர்வாகி பூட்டு நீக்கம் (Admin Unlock)</h3>
                <p className="text-xs text-slate-500">ஆசிரியர்கள் முடிவடைந்த தேர்வுகளைத் திருத்த அனுமதி இல்லை</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              நாட்காட்டிப்படி இத்தேர்வு காலம் முடிவடைந்துள்ளது. சிறப்பு அனுமதி மூலம் திருத்த நிர்வாகி கடவுச்சொல்லை உள்ளிடவும்:
            </p>

            <form onSubmit={handleAdminUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">நிர்வாகி கடவுச்சொல் (Admin Passkey)</label>
                <input 
                  type="password" 
                  value={passkeyInput}
                  onChange={e => { setPasskeyInput(e.target.value); setPasskeyError(''); }}
                  placeholder="கடவுச்சொல் ('admin' அல்லது '2026')..."
                  className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-amber-500"
                  autoFocus
                />
                {passkeyError && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> {passkeyError}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  ரத்து செய்க (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="h-3.5 w-3.5 text-amber-300" /> பூட்டை நீக்கு (Unlock)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
