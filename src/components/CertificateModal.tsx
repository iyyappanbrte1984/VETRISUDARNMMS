import React, { useRef, useState } from 'react';
import { Download, FileText, Printer, Check, Copy, Sparkles, X, Trophy, Award } from 'lucide-react';
import { exportElementToPdf, exportElementToPng } from '../utils/pdfExport';
import { STUDY_PLAN, TEST_SCHEDULE } from '../types';

export interface CertificateStudent {
  studentName: string;
  schoolName: string;
  udise: string;
  mat: number;
  satMath: number;
  satScience: number;
  satSocial: number;
  total: number;
  rank: number;
  testId: string;
  testLabel: string;
}

interface CertificateModalProps {
  student: CertificateStudent;
  onClose: () => void;
}

const getRankDetails = (rank: number) => {
  if (rank === 1) {
    return {
      label: 'வட்டார அளவில் முதலிடம்',
      english: 'FIRST RANK',
      medal: '🥇',
      color: '#B7791F',
      light: '#FFF8E1',
      border: '#D69E2E',
    };
  }
  if (rank === 2) {
    return {
      label: 'வட்டார அளவில் இரண்டாம் இடம்',
      english: 'SECOND RANK',
      medal: '🥈',
      color: '#64748B',
      light: '#F1F5F9',
      border: '#94A3B8',
    };
  }
  if (rank === 3) {
    return {
      label: 'வட்டார அளவில் மூன்றாம் இடம்',
      english: 'THIRD RANK',
      medal: '🥉',
      color: '#92400E',
      light: '#FFF7ED',
      border: '#C2410C',
    };
  }
  return {
    label: `வட்டார அளவில் ${rank}-ஆம் இடம்`,
    english: `RANK ${rank}`,
    medal: '🏆',
    color: '#0F2E59',
    light: '#EFF6FF',
    border: '#2563EB',
  };
};

const getPerformance = (total: number) => {
  if (total >= 90) return 'மிகச் சிறந்த செயல்திறன்';
  if (total >= 75) return 'சிறந்த செயல்திறன்';
  if (total >= 60) return 'பாராட்டத்தக்க செயல்திறன்';
  return 'சிறப்பான முயற்சி';
};

export default function CertificateModal({ student, onClose }: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<'png' | 'pdf' | null>(null);
  const [copied, setCopied] = useState(false);

  const testNum = student.testId.replace('test_', '');
  const weekNumInt = parseInt(testNum, 10) || 1;

  // Look up exact Unit Performance Test date from STUDY_PLAN or TEST_SCHEDULE
  const studyWeek = STUDY_PLAN.find((w) => w.weekNum === weekNumInt);
  const scheduleTest = TEST_SCHEDULE.find((t) => t.id === student.testId);
  const examDate = studyWeek?.unitTestDate || (scheduleTest ? scheduleTest.formattedDate : '31.07.26');

  const certId = `KDY-2026-${testNum}${student.rank}${student.udise.slice(-4)}`;

  const rankDetails = getRankDetails(student.rank);

  const scoreCards = [
    {
      tamilName: 'மனத்திறன் தேர்வு',
      code: 'MAT',
      value: student.mat,
      max: 50,
      color: '#C2410C',
      bg: '#FFF7ED',
      border: '#FDBA74',
    },
    {
      tamilName: 'கணிதம்',
      code: 'SAT - Maths',
      value: student.satMath,
      max: 10,
      color: '#1D4ED8',
      bg: '#EFF6FF',
      border: '#93C5FD',
    },
    {
      tamilName: 'அறிவியல்',
      code: 'SAT - Science',
      value: student.satScience,
      max: 20,
      color: '#047857',
      bg: '#F0FDF4',
      border: '#86EFAC',
    },
    {
      tamilName: 'சமூக அறிவியல்',
      code: 'SAT - Social',
      value: student.satSocial,
      max: 20,
      color: '#7E22CE',
      bg: '#FAF5FF',
      border: '#D8B4FE',
    },
  ];

  const handleCopyId = () => {
    navigator.clipboard.writeText(certId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = async () => {
    if (!certRef.current) return;
    try {
      setDownloading('png');
      const filename = `Certificate_NMMS_KDY_Week_${testNum}_${student.studentName.replace(/\s+/g, '_')}_Rank_${student.rank}.png`;
      await exportElementToPng(certRef.current, filename);
    } catch (err) {
      console.error('Error generating PNG:', err);
      alert('சான்றிதழ் படம் பதிவிறக்கம் செய்வதில் பிழை (Error exporting PNG)');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    try {
      setDownloading('pdf');
      const filename = `Certificate_NMMS_KDY_Week_${testNum}_${student.studentName.replace(/\s+/g, '_')}_Rank_${student.rank}.pdf`;
      await exportElementToPdf(certRef.current, filename, 'landscape');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('சான்றிதழ் PDF பதிவிறக்கம் செய்வதில் பிழை (Error exporting PDF)');
    } finally {
      setDownloading(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:w-full print:rounded-none print:bg-transparent">
        
        {/* Control Action Toolbar */}
        <div className="w-full bg-slate-900 px-4 sm:px-6 py-3 border-b border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center space-x-2 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>சான்றிதழ் குறியீடு (ID):</span>
              <strong className="font-mono text-amber-400 font-black">{certId}</strong>
            </div>
            <button
              onClick={handleCopyId}
              className="text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition cursor-pointer active:scale-95 border border-slate-700"
              title="Copy Certificate ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'நகலெடுக்கப்பட்டது!' : 'நகலெடு'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-print-cert"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer active:scale-95 border border-slate-700"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>அச்சிடுக (Print)</span>
            </button>

            <button
              id="btn-download-png"
              onClick={handleDownloadPNG}
              disabled={downloading === 'png'}
              className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-xs transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading === 'png' ? 'பதிவிறங்குகிறது...' : 'PNG பதிவிறக்கம்'}</span>
            </button>

            <button
              id="btn-download-pdf"
              onClick={handleDownloadPDF}
              disabled={downloading === 'pdf'}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-xs transition cursor-pointer active:scale-95 disabled:opacity-50 border border-blue-700/50"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{downloading === 'pdf' ? 'தயாராகிறது...' : 'PDF பதிவிறக்கம்'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer ml-1"
              title="மூடுக"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Viewport */}
        <div className="w-full overflow-x-auto p-3 sm:p-5 flex justify-center bg-slate-950/70 print:p-0 print:bg-white print:overflow-visible">
          
          {/* ======================================================== */}
          {/* PROFESSIONAL GRADE BOLD BORDER & FUN INSPIRING DOODLES   */}
          {/* Exact Dimensions: 1000px x 707px (A4 Landscape)          */}
          {/* ======================================================== */}
          <div
            ref={certRef}
            id="certificate-print-area"
            className="relative w-[1000px] h-[707px] min-w-[1000px] min-h-[707px] select-none shadow-2xl overflow-hidden flex flex-col justify-between font-serif print:shadow-none print:w-full print:min-w-0 print:h-screen print:border-0"
            style={{
              backgroundColor: '#FCFAF4',
              color: '#0f172a',
              boxSizing: 'border-box',
              fontFamily: "'Anek Tamil', 'Mukta Malalar', 'Tiro Tamil', Georgia, serif",
            }}
          >
            {/* Subtle Royal Texture Tint (Clean, no mix-blend-mode to avoid html2canvas slicing) */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'radial-gradient(#0F2E59 0.75px, transparent 0.75px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* ========================================================================= */}
            {/* MASTER SVG BORDER CANVAS (CLEAN REGAL BORDERS & COMPACT CORNERS)         */}
            {/* ========================================================================= */}
            <svg 
              className="absolute inset-0 w-[1000px] h-[707px] pointer-events-none z-10" 
              viewBox="0 0 1000 707"
              fill="none"
            >
              {/* Central Subtle Watermark (Inside SVG for perfect vector rasterization) */}
              <text
                x="500"
                y="395"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0F2E59"
                fillOpacity="0.03"
                fontSize="92"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="12"
              >
                NMMS 2026
              </text>

              {/* 1. Outer Deep Royal Navy Frame: 3.5px */}
              <rect 
                x="16" 
                y="16" 
                width="968" 
                height="675" 
                rx="3" 
                stroke="#0F2E59" 
                strokeWidth="3.5" 
              />
              
              {/* 2. Middle Warm Antique Gold Accent Line: 1.5px */}
              <rect 
                x="22" 
                y="22" 
                width="956" 
                height="663" 
                rx="2" 
                stroke="#D97706" 
                strokeWidth="1.5" 
              />

              {/* 3. Inner Crisp Deep Border: 1px */}
              <rect 
                x="26" 
                y="26" 
                width="948" 
                height="655" 
                rx="1" 
                stroke="#0F2E59" 
                strokeWidth="1" 
              />

              {/* COMPACT & TASTEFUL CORNER ORNAMENT DEFINITION */}
              <defs>
                <g id="compact-corner-ornament">
                  {/* Corner arc */}
                  <path d="M 28 0 C 28 16, 16 28, 0 28" stroke="#0F2E59" strokeWidth="2" fill="none" />
                  <path d="M 24 0 C 24 13, 13 24, 0 24" stroke="#D97706" strokeWidth="1.2" fill="none" />
                  {/* Gold corner diamond */}
                  <polygon points="12,12 16,8 20,12 16,16" fill="#D97706" stroke="#0F2E59" strokeWidth="0.8" />
                  <circle cx="16" cy="16" r="1.5" fill="#0F2E59" />
                  {/* Corner corner nodes */}
                  <circle cx="28" cy="0" r="2" fill="#0F2E59" />
                  <circle cx="0" cy="28" r="2" fill="#0F2E59" />
                </g>
              </defs>

              {/* 4 COMPACT CORNERS - STRICTLY AT BORDER CORNERS (NO SPREAD) */}
              <use href="#compact-corner-ornament" x="26" y="26" />
              <use href="#compact-corner-ornament" transform="translate(974, 26) scale(-1, 1)" />
              <use href="#compact-corner-ornament" transform="translate(26, 681) scale(1, -1)" />
              <use href="#compact-corner-ornament" transform="translate(974, 681) scale(-1, -1)" />
            </svg>

            {/* ======================================================== */}
            {/* CERTIFICATE MAIN CONTENT (SAFE PADDING INSIDE BORDERS)   */}
            {/* ======================================================== */}
            <div className="relative z-20 w-full h-full px-12 pt-6 pb-7 flex flex-col justify-between">
              
              {/* Header Section: TN Emblem (Left) | Titles & Badge (Center) | Vetri Sudar Logo (Right) */}
              <div className="w-full grid grid-cols-[80px_1fr_80px] items-center gap-3">
                
                {/* Top-Left: Tamil Nadu Government Emblem */}
                <div className="flex justify-center items-center">
                  <img
                    src="/tn_emblem.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/tn_emblem.svg';
                    }}
                    alt="Tamil Nadu Emblem"
                    className="h-14 w-auto object-contain drop-shadow-xs"
                  />
                </div>

                {/* Center: Header Titles */}
                <div className="flex flex-col items-center justify-center text-center space-y-0.5">
                  {/* 1. தமிழ்நாடு அரசு */}
                  <h1
                    className="text-[19px] font-black tracking-wide leading-tight flex items-center justify-center gap-2"
                    style={{ color: '#0F2E59' }}
                  >
                    <span className="text-amber-500 text-xs">✦</span>
                    <span>தமிழ்நாடு அரசு</span>
                    <span className="text-amber-500 text-xs">✦</span>
                  </h1>

                  {/* 2. தொடக்கக் கல்வித் துறை */}
                  <h2
                    className="text-[14.5px] font-extrabold tracking-wide leading-tight"
                    style={{ color: '#800020' }}
                  >
                    தொடக்கக் கல்வித் துறை
                  </h2>

                  {/* 3. காடையாம்பட்டி ஒன்றியம் , சேலம் மாவட்டம் */}
                  <h3
                    className="text-[12.5px] font-bold tracking-normal leading-tight"
                    style={{ color: '#047857' }}
                  >
                    காடையாம்பட்டி ஒன்றியம் , சேலம் மாவட்டம்
                  </h3>

                  {/* 4. Event Name Ribbon Badge */}
                  <div className="pt-0.5 flex flex-col items-center">
                    <div
                      className="px-4 py-0.5 rounded-full text-[11.5px] font-black shadow-xs flex items-center gap-1.5"
                      style={{
                        backgroundColor: '#FFF3E0',
                        color: '#C2410C',
                        border: '1.5px solid #D97706',
                      }}
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>வெற்றிச் சுடர் NMMS பயிற்சித் திட்டம் - 2026</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    </div>
                    <p
                      className="text-[10px] font-bold mt-0.5"
                      style={{ color: '#0F2E59' }}
                    >
                      ( வாரம் {testNum} மாதிரித் தேர்வு - {examDate} )
                    </p>
                  </div>
                </div>

                {/* Top-Right: Vetri Sudar Official Logo */}
                <div className="flex justify-center items-center">
                  <img
                    src="/Picture1.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/Picture1.svg';
                    }}
                    alt="Vetri Sudar Logo"
                    className="h-14 w-auto object-contain drop-shadow-xs"
                  />
                </div>

              </div>

              {/* Certificate Ribbon Title */}
              <div className="flex items-center justify-center gap-3 my-0.5">
                <div
                  className="h-px w-[90px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #C68A20)' }}
                />
                <div className="text-center flex items-center gap-2">
                  <span className="text-amber-600 text-xs">★</span>
                  <span
                    className="font-black text-[20px] tracking-wide"
                    style={{ color: '#0F2E59' }}
                  >
                    பாராட்டுச் சான்றிதழ்
                  </span>
                  <span className="text-amber-600 text-xs">★</span>
                </div>
                <div
                  className="h-px w-[90px]"
                  style={{ background: 'linear-gradient(90deg, #C68A20, transparent)' }}
                />
              </div>

              {/* Student Body Information */}
              <div className="flex flex-col items-center justify-center text-center space-y-1.5 px-4">
                
                {/* Sentence 1 */}
                <p className="font-semibold text-[13.5px] text-slate-700">
                  ஊராட்சி ஒன்றிய நடுநிலைப்/KGBV பள்ளிகளுக்கான <span className="font-bold text-[#0F172A]"> NMMS {testNum}வது வாராந்திர மாதிரித் தேர்வில் </span>
                </p>

                {/* Sentence 2: School & Class */}
                <div className="flex flex-wrap items-baseline justify-center gap-x-2">
                  <span
                    className="font-black border-b-2 inline-block px-4 pb-0.5 text-[16.5px]"
                    style={{ color: '#0F2E59', borderColor: '#C68A20' }}
                  >
                    {student.schoolName}
                  </span>
                  <span className="font-bold text-slate-700 text-[13.5px]">
                    பள்ளியில் பயிலும் 8-ஆம் வகுப்பு மாணவர் / மாணவி
                  </span>
                </div>

                {/* Sentence 3: Student Name & Rank Award */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-0.5">
                  <span className="font-bold text-slate-700 text-[13.5px]">
                    செல்வன் / செல்வி
                  </span>
                  
                  <div
                    className="px-5 py-0.5 rounded-lg inline-block"
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1.5px solid #CBD5E1',
                    }}
                  >
                    <span
                      className="font-black text-[19px] tracking-wide"
                      style={{ color: '#0F2E59' }}
                    >
                      {student.studentName}
                    </span>
                  </div>

                  {/* Rank Badge */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-0.5 rounded-lg shadow-xs"
                    style={{
                      background: rankDetails.light,
                      border: `1.5px solid ${rankDetails.border}`,
                    }}
                  >
                    <span className="text-[18px] leading-none">{rankDetails.medal}</span>
                    <span className="font-black text-[13.5px]" style={{ color: rankDetails.color }}>
                      {rankDetails.label}
                    </span>
                  </div>
                </div>

                {/* Sentence 4 */}
                <p className="font-bold text-[13px] text-slate-700 pt-0.5">
                  பெற்றதைப் பாராட்டி இச்சான்றிதழ் பெருமையுடன் வழங்கப்படுகிறது.
                </p>
              </div>

              {/* Performance Subject Cards (Generously Spaced & Fully Visible - No Truncation) */}
              <div className="w-full max-w-[850px] mx-auto my-1">
                <div className="grid grid-cols-5 gap-2.5">
                  {scoreCards.map((item) => (
                    <div
                      key={item.code}
                      className="rounded-xl px-2 py-1.5 text-center flex flex-col justify-between shadow-2xs"
                      style={{
                        backgroundColor: item.bg,
                        border: `1.5px solid ${item.border}`,
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-extrabold text-[11px] leading-tight text-slate-800 whitespace-nowrap">
                          {item.tamilName}
                        </span>
                        <span 
                          className="text-[8.5px] font-black tracking-wider uppercase mt-0.5 px-2 py-0.2 rounded-full shadow-2xs"
                          style={{ 
                            color: item.color,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: `1px solid ${item.border}`
                          }}
                        >
                          {item.code}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-center gap-0.5 mt-1">
                        <span className="font-black text-[17.5px] leading-none" style={{ color: '#0F2E59' }}>
                          {item.value}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          /{item.max}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Grand Total Card */}
                  <div
                    className="rounded-xl px-2 py-1.5 text-center flex flex-col justify-between shadow-2xs"
                    style={{
                      background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                      border: '1.5px solid #D97706',
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-black text-[11px] leading-tight text-amber-950 whitespace-nowrap">
                        மொத்த மதிப்பெண்
                      </span>
                      <span 
                        className="text-[8.5px] font-black tracking-wider uppercase mt-0.5 px-2 py-0.2 rounded-full shadow-2xs"
                        style={{ 
                          color: '#78350F',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #F59E0B'
                        }}
                      >
                        GRAND TOTAL
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center gap-0.5 mt-1">
                      <span className="font-black text-[18.5px] leading-none text-[#78350F]">
                        {student.total}
                      </span>
                      <span className="text-[10.5px] font-bold text-amber-900">
                        /100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Signatures Layout: Supervisor, BEO 2, BEO 1 */}
              <div className="w-full flex flex-col items-center">
                <div className="w-full grid grid-cols-3 items-end gap-6 text-center px-12">
                  
                  {/* Column 1: Supervisor */}
                  <div className="space-y-0.5 flex flex-col items-center justify-end">
                    <div className="h-8 w-full flex items-end justify-center">
                      <img
                        src="/signature_supervisor.png"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/signature_supervisor.svg';
                        }}
                        alt="Supervisor Signature"
                        className="max-h-7 w-auto object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      மேற்பார்வையாளர்
                    </p>
                    <p className="text-[9.5px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      காடையாம்பட்டி
                    </p>
                  </div>

                  {/* Column 2: BEO 2 */}
                  <div className="space-y-0.5 flex flex-col items-center justify-end">
                    <div className="h-8 w-full flex items-end justify-center">
                      <img
                        src="/signature_beo2.png"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/signature_beo2.svg';
                        }}
                        alt="BEO 2 Signature"
                        className="max-h-7 w-auto object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      வட்டாரக் கல்வி அலுவலர் 2
                    </p>
                    <p className="text-[9.5px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      காடையாம்பட்டி
                    </p>
                  </div>

                  {/* Column 3: BEO 1 */}
                  <div className="space-y-0.5 flex flex-col items-center justify-end">
                    <div className="h-8 w-full flex items-end justify-center">
                      <img
                        src="/signature_beo1.png"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/signature_beo1.svg';
                        }}
                        alt="BEO 1 Signature"
                        className="max-h-7 w-auto object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      வட்டாரக் கல்வி அலுவலர் 1
                    </p>
                    <p className="text-[9.5px] font-black leading-tight font-serif" style={{ color: '#800020' }}>
                      காடையாம்பட்டி
                    </p>
                  </div>

                </div>

                {/* Certificate ID Footer Note (Cleanly placed inside inner border) */}
                <div
                  className="text-center pt-1 font-mono text-[9px] font-bold tracking-wider"
                  style={{ color: '#64748B' }}
                >
                  சான்றிதழ் குறியீடு (Certificate ID): {certId}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
