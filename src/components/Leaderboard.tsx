/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  TrendingUp, 
  BarChart3, 
  Download, 
  Printer, 
  ListOrdered,
  Search,
  Percent,
  TrendingDown,
  FileText,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import html2pdf from 'html2pdf.js';
import { SCHOOLS, SchoolRecord, StudentMark, TEST_SCHEDULE } from '../types';
import LeaderboardPdfReport from './LeaderboardPdfReport';
import CertificateModal, { CertificateStudent } from './CertificateModal';
import { exportElementToPdf } from '../utils/pdfExport';

interface LeaderboardProps {
  records: SchoolRecord[];
}

export default function Leaderboard({ records }: LeaderboardProps) {
  const [selectedCertificateStudent, setSelectedCertificateStudent] = useState<CertificateStudent | null>(null);
  // Dynamically find available tests that have records or up to highest recorded test
  const availableTestOptions = useMemo(() => {
    const recordedTestIds = new Set(records.map(r => r.testId));
    let maxTestNum = 5;
    recordedTestIds.forEach(id => {
      const num = parseInt(id.replace('test_', ''), 10) || 0;
      if (num > maxTestNum) maxTestNum = num;
    });

    return TEST_SCHEDULE.filter(t => {
      const num = parseInt(t.id.replace('test_', ''), 10) || 0;
      return num <= maxTestNum || recordedTestIds.has(t.id);
    });
  }, [records]);

  // Find latest test ID that has records
  const latestRecordedId = useMemo(() => {
    if (availableTestOptions.length > 0) {
      return availableTestOptions[availableTestOptions.length - 1].id;
    }
    return 'test_5';
  }, [availableTestOptions]);

  const [selectedTestId, setSelectedTestId] = useState<string>(() => latestRecordedId);

  // Synchronize selectedTestId if records change and current test isn't in options
  useEffect(() => {
    if (!availableTestOptions.some(t => t.id === selectedTestId)) {
      setSelectedTestId(latestRecordedId);
    }
  }, [availableTestOptions, latestRecordedId, selectedTestId]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  // 1. Compile ALL students for the selected test
  const activeTestRecords = records.filter(r => r.testId === selectedTestId);
  
  interface CompiledStudent extends StudentMark {
    schoolName: string;
    udise: string;
    schoolId: string;
  }

  const allStudents: CompiledStudent[] = [];

  activeTestRecords.forEach(rec => {
    const sch = SCHOOLS.find(s => s.id === rec.schoolId);
    const schoolName = sch?.name || 'Unknown School';
    const udise = sch?.udise || 'N/A';

    allStudents.push(
      { ...rec.rank_1, schoolName, udise, schoolId: rec.schoolId },
      { ...rec.rank_2, schoolName, udise, schoolId: rec.schoolId },
      { ...rec.rank_3, schoolName, udise, schoolId: rec.schoolId }
    );
  });

  // Sort students by total descending, then by MAT descending
  const sortedStudents = [...allStudents].sort((a, b) => {
    if (b.total !== a.total) {
      return b.total - a.total;
    }
    return b.mat - a.mat; // tie-breaker: higher Mental Ability Test score
  });

  // Take top 10 for overall leaderboard
  const top10Students = sortedStudents.slice(0, 10);

  // Search filtered students (for complete rank viewer)
  const filteredStudents = sortedStudents.filter(s => 
    s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. School performance comparison for selected test (Top 10 schools by top score in this chosen test)
  const schoolTestComparison = activeTestRecords
    .map(r => {
      const sch = SCHOOLS.find(s => s.id === r.schoolId);
      const schName = sch ? sch.name : 'Unknown School';
      return {
        name: schName.replace('PUMS ', '').replace('GHS ', '').replace('GHSS ', '').slice(0, 15),
        fullName: schName,
        'அதிகபட்ச மதிப்பெண்': r.rank_1.total,
        'சராசரி (முதல் 3)': Math.round((r.rank_1.total + r.rank_2.total + r.rank_3.total) / 3),
      };
    })
    .sort((a, b) => b['அதிகபட்ச மதிப்பெண்'] - a['அதிகபட்ச மதிப்பெண்'])
    .slice(0, 10);

  // 3. Compute Subject percentage strength for selected test
  let matTotal = 0;
  let mathTotal = 0;
  let sciTotal = 0;
  let socTotal = 0;
  let totalCount = allStudents.length;

  allStudents.forEach(s => {
    matTotal += s.mat;
    mathTotal += s.satMath;
    sciTotal += s.satScience;
    socTotal += s.satSocial;
  });

  // Convert to percent of maximum marks for THIS selected test
  // MAT max 50, Math max 10, Science max 20, Social max 20
  const subjectData = totalCount > 0 ? [
    { name: 'மனத்திறன் (MAT)', percent: Math.round(((matTotal / totalCount) / 50) * 100), color: '#d97706' },
    { name: 'கணிதம் (SAT)', percent: Math.round(((mathTotal / totalCount) / 10) * 100), color: '#2563eb' },
    { name: 'அறிவியல் (SAT)', percent: Math.round(((sciTotal / totalCount) / 20) * 100), color: '#16a34a' },
    { name: 'சமூக அறிவியல் (SAT)', percent: Math.round(((socTotal / totalCount) / 20) * 100), color: '#ea580c' }
  ] : [];

  const getTestLabel = (testId: string) => {
    const sched = TEST_SCHEDULE.find(t => t.id === testId);
    const testNum = testId.replace('test_', '');
    if (sched && sched.label.includes('(')) {
      const datePart = sched.label.substring(sched.label.indexOf('('));
      return `வாரம் ${testNum} தேர்வு ${datePart}`;
    }
    return `வாரம் ${testNum} தேர்வு`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const element = document.getElementById('pdf-report-document');
      if (!element) {
        alert('PDF document template not ready');
        return;
      }

      await exportElementToPdf(
        element,
        `Vetri_Sudar_NMMS_RankList_${selectedTestId}.pdf`,
        'portrait'
      );
    } catch (err) {
      console.error('PDF generation error:', err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };


  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs print:hidden">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-600" />
            வட்டார அளவிலான தரவரிசை (Kadayampatti Block Leaderboard)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            26 அரசுப் பள்ளிகளிலிருந்து முதல் மூன்று மதிப்பெண் பெற்ற மாணவர்களில், வட்டார அளவில் முதலிடம் பிடிக்கும் சாதனையாளர்கள்.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select 
            id="leaderboard-test-select"
            value={selectedTestId}
            onChange={e => setSelectedTestId(e.target.value)}
            className="text-xs font-bold bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer"
          >
            {availableTestOptions.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          <button
            id="btn-pdf-report"
            onClick={() => setShowPdfModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <FileText className="h-4 w-4" /> PDF தரவரிசை அறிக்கை
          </button>
        </div>
      </div>


      {/* Top 3 Spotlight Podium (Block Level) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 pb-2 print:hidden">
        {/* Rank 2 Podium */}
        {top10Students[1] && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 text-center shadow-xs order-2 md:order-1 flex flex-col items-center hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-black text-xl mb-3 shadow-xs">
              2
            </div>
            <h4 className="text-base font-black text-slate-900">{top10Students[1].studentName}</h4>
            <p className="text-xs text-slate-500 font-medium truncate max-w-full mt-1">{top10Students[1].schoolName}</p>
            <div className="bg-slate-100 text-slate-900 font-mono text-sm font-black px-4 py-1 rounded-full mt-4 border border-slate-200">
              {top10Students[1].total} / 100
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5 font-medium">MAT: {top10Students[1].mat} | SAT: {top10Students[1].satMath + top10Students[1].satScience + top10Students[1].satSocial}</p>
          </div>
        )}

        {/* Rank 1 Podium (Tallest) */}
        {top10Students[0] && (
          <div className="bg-gradient-to-b from-amber-500/10 via-white to-white border-2 border-amber-400 rounded-3xl p-8 text-center shadow-md order-1 md:order-2 flex flex-col items-center relative transform md:-translate-y-4">
            <div className="absolute -top-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest shadow-xs">
              👑 வட்டார முதலிடம்
            </div>
            <div className="h-16 w-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl mb-4 shadow-md border-2 border-amber-300">
              1
            </div>
            <h3 className="text-xl font-black text-slate-900">{top10Students[0].studentName}</h3>
            <p className="text-xs text-orange-600 font-extrabold truncate max-w-full mt-1">{top10Students[0].schoolName}</p>
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-mono text-base font-black px-5 py-1.5 rounded-full mt-4 shadow-xs">
              {top10Students[0].total} / 100
            </div>
            <p className="text-[11px] text-slate-600 font-bold mt-3">MAT: {top10Students[0].mat} | SAT: {top10Students[0].satMath + top10Students[0].satScience + top10Students[0].satSocial}</p>
          </div>
        )}

        {/* Rank 3 Podium */}
        {top10Students[2] && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 text-center shadow-xs order-3 flex flex-col items-center hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-black text-xl mb-3 shadow-xs">
              3
            </div>
            <h4 className="text-base font-black text-slate-900">{top10Students[2].studentName}</h4>
            <p className="text-xs text-slate-500 font-medium truncate max-w-full mt-1">{top10Students[2].schoolName}</p>
            <div className="bg-slate-100 text-slate-900 font-mono text-sm font-black px-4 py-1 rounded-full mt-4 border border-slate-200">
              {top10Students[2].total} / 100
            </div>
            <p className="text-[10px] text-slate-500 mt-2.5 font-medium">MAT: {top10Students[2].mat} | SAT: {top10Students[2].satMath + top10Students[2].satScience + top10Students[2].satSocial}</p>
          </div>
        )}
      </div>

      {/* Graphs Block: Specific to the CHOSEN TEST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
        
        {/* Selected Test - Schools Comparison Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              பள்ளிகளின் முதலிட மதிப்பெண்கள் ({getTestLabel(selectedTestId)})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">தேர்ந்தெடுக்கப்பட்ட தேர்வில் ஒவ்வொரு பள்ளியிலும் பெற்ற அதிகபட்ச மதிப்பெண்</p>
          </div>

          <div className="h-64">
            {schoolTestComparison.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold">
                தரவுகள் இல்லை
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={schoolTestComparison} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} fontWeight="bold" angle={-25} textAnchor="end" />
                  <YAxis stroke="#64748b" fontSize={10} fontWeight="bold" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value} மதிப்பெண்`, 'அதிகபட்சம்']} />
                  <Bar dataKey="அதிகபட்ச மதிப்பெண்" fill="#ea580c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Selected Test - Subject wise average strength */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
              பாடங்களின் தேர்ச்சி % ({getTestLabel(selectedTestId)})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">தேர்ந்தெடுக்கப்பட்ட தேர்வில் பாடங்களின் சராசரி தேர்ச்சி விழுக்காடு</p>
          </div>

          <div className="h-64">
            {subjectData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold">
                புள்ளிவிவரத் தரவுகள் இல்லை
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} fontWeight="bold" />
                  <YAxis stroke="#64748b" fontSize={10} fontWeight="bold" domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}% Mastery`, 'Mastery']} />
                  <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Main Leaderboard Rankings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 print:bg-white print:border-none print:shadow-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-100 print:hidden">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <ListOrdered className="h-4 w-4 text-orange-600" />
              வட்டார முழு தரவரிசைப் பட்டியல் (Block Comprehensive Rank Table)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              தேர்வு செய்யப்பட்ட தேர்வின் அனைத்து 78 முதன்மை மாணவர்களின் தரவரிசை
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="மாணவர் அல்லது பள்ளி பெயர் தேடுக..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Print only header */}
        <div className="hidden print:block text-center space-y-1 pb-4 border-b-2 border-slate-300 mb-4">
          <h1 className="text-2xl font-extrabold text-slate-900">வெற்றிச் சுடர் NMMS பயிற்சித் திட்டம் - காடையாம்பட்டி</h1>
          <h2 className="text-lg font-bold text-slate-700">வட்டார அளவிலான தரவரிசைப் பட்டியல் (Block Level Leaderboard)</h2>
          <p className="text-sm text-slate-500 font-mono">தேர்வு: {getTestLabel(selectedTestId)}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-extrabold bg-slate-50">
                <th className="py-3 px-4 text-center">வட்டார தரம் (Rank)</th>
                <th className="py-3 px-4">UDISE எண்</th>
                <th className="py-3 px-4">மாணவர் பெயர் (Student Name)</th>
                <th className="py-3 px-4">பள்ளியின் பெயர் (School)</th>
                <th className="py-3 px-4 text-center font-black text-orange-800 bg-orange-50">MAT (/50)</th>
                <th className="py-3 px-4 text-center">Math (/10)</th>
                <th className="py-3 px-4 text-center">Sci (/20)</th>
                <th className="py-3 px-4 text-center">Soc (/20)</th>
                <th className="py-3 px-4 text-center font-black text-orange-900 bg-orange-100/80">மொத்தம் (Total /100)</th>
                <th className="py-3 px-4 text-center font-black text-amber-900 bg-amber-100/80 print:hidden">வெற்றிச் சான்றிதழ் (Certificate)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-slate-400 font-bold">
                    தரவுகள் ஏதும் இல்லை!
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const blockRank = idx + 1;
                  return (
                    <tr key={idx} className={`hover:bg-slate-50 transition-colors ${blockRank <= 3 ? 'bg-amber-50/50' : ''}`}>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex h-6 w-6 rounded-lg items-center justify-center font-mono font-black text-xs ${
                          blockRank === 1 ? 'bg-amber-400 text-slate-950 font-black' : 
                          blockRank === 2 ? 'bg-slate-200 text-slate-900' : 
                          blockRank === 3 ? 'bg-amber-600 text-white' : 'text-slate-500 bg-slate-100'
                        }`}>
                          {blockRank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{student.udise}</td>
                      <td className="py-3 px-4 font-black text-slate-900">{student.studentName}</td>
                      <td className="py-3 px-4 font-bold text-slate-700">{student.schoolName}</td>
                      <td className="py-3 px-4 text-center font-mono font-black text-orange-700 bg-orange-50/50">{student.mat}</td>
                      <td className="py-3 px-4 text-center font-mono text-slate-600">{student.satMath}</td>
                      <td className="py-3 px-4 text-center font-mono text-slate-600">{student.satScience}</td>
                      <td className="py-3 px-4 text-center font-mono text-slate-600">{student.satSocial}</td>
                      <td className="py-3 px-4 text-center font-mono font-black text-orange-800 bg-orange-50/80 text-sm">
                        {student.total} / 100
                      </td>
                      <td className="py-3 px-4 text-center print:hidden">
                        {blockRank <= 3 && student.total > 0 ? (
                          <button
                            id={`btn-cert-${blockRank}`}
                            onClick={() => setSelectedCertificateStudent({
                              studentName: student.studentName,
                              schoolName: student.schoolName,
                              udise: student.udise,
                              mat: student.mat,
                              satMath: student.satMath,
                              satScience: student.satScience,
                              satSocial: student.satSocial,
                              total: student.total,
                              rank: blockRank,
                              testId: selectedTestId,
                              testLabel: getTestLabel(selectedTestId)
                            })}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-slate-950 font-black text-[11px] rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                            title={`வட்டார தரவரிசை #${blockRank} பாராட்டுச் சான்றிதழ் உருவாக்கு`}
                          >
                            <Award className="h-3.5 w-3.5 text-slate-950" />
                            <span>சான்றிதழ்</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Model Report Modal */}
      {showPdfModal && (
        <LeaderboardPdfReport
          testId={selectedTestId}
          testLabel={getTestLabel(selectedTestId)}
          students={allStudents}
          onClose={() => setShowPdfModal(false)}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
          isDownloading={isDownloadingPdf}
        />
      )}

      {/* Student Merit Certificate Modal */}
      {selectedCertificateStudent && (
        <CertificateModal
          student={selectedCertificateStudent}
          onClose={() => setSelectedCertificateStudent(null)}
        />
      )}
    </div>
  );
}

