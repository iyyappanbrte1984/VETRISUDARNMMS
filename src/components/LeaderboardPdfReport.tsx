import React from 'react';
import { Mail, Phone, Globe, Award, Sparkles, Printer, Download, X, CheckCircle2 } from 'lucide-react';

interface CompiledStudent {
  studentName: string;
  schoolName: string;
  udise: string;
  schoolId: string;
  mat: number;
  satMath: number;
  satScience: number;
  satSocial: number;
  total: number;
}

interface LeaderboardPdfReportProps {
  testId: string;
  testLabel: string;
  students: CompiledStudent[];
  onClose: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  isDownloading?: boolean;
}

export default function LeaderboardPdfReport({
  testLabel,
  students,
  onClose,
  onDownloadPdf,
  onPrint,
  isDownloading = false,
}: LeaderboardPdfReportProps) {
  // Separate present (total > 0) vs absent/zero scores (total === 0)
  const presentStudents = students.filter(s => s.total > 0);
  const absentStudents = students.filter(s => s.total === 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Container Modal */}
      <div className="bg-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[95vh]">
        
        {/* Modal Controls Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
              PDF
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                தரவரிசைப் பட்டியல் அறிக்கை (Rank List Report)
              </h3>
              <p className="text-xs text-slate-400">
                காடையாம்பட்டி வட்டார NMMS "வெற்றிச் சுடர்" மாணவர் மதிப்பெண் அறிக்கை
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4 text-amber-400" /> அச்சிடு (Print)
            </button>

            <button
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> {isDownloading ? 'பதிவிறக்கம் செய்கிறது...' : 'PDF பதிவிறக்கம்'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer ml-1"
              title="மூடுக"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Area */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200 flex justify-center">
          
          {/* Printable Report Canvas (Exact standard PDF Document Layout) */}
          <div 
            id="pdf-report-document" 
            className="bg-white w-full max-w-[794px] min-h-[1123px] shadow-xl text-slate-900 font-sans border border-slate-300 relative flex flex-col justify-between"
            style={{ width: '100%', minHeight: '1050px', boxSizing: 'border-box' }}
          >
            {/* DOCUMENT TOP HEADER BANNER (Vetri Sudar NMMS Branding) */}
            <div>
              <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b-4 border-amber-500 relative">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    VETRI SUDAR NMMS | <span className="text-amber-400 font-extrabold">வெற்றிச் சுடர் NMMS</span>
                  </h1>
                  <p className="text-[10px] text-slate-300 tracking-wider font-semibold uppercase mt-0.5">
                    காடையாம்பட்டி ஒன்றியம் — 8-ஆம் வகுப்பு NMMS இணையவழி பயிற்சி மையம் 
                  </p>
                </div>

                {/* Circular Gold Seal Logo (Top Right Badge) */}
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 p-0.5 shadow-lg shrink-0 flex items-center justify-center text-center">
                  <div className="h-full w-full rounded-full bg-[#0f172a] flex flex-col items-center justify-center text-amber-400 p-1">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-[8px] font-black leading-tight mt-0.5 text-center text-amber-300">
                      வெற்றிச்<br/>சுடர் NMMS
                    </span>
                  </div>
                </div>
              </div>

              {/* Pink/Purple Gradient Title Bar */}
              <div className="px-6 py-3 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#5b21b6] flex items-center gap-2">
                    வெற்றிச் சுடர் NMMS: {testLabel} - Rank List
                  </h2>
                  <p className="text-xs text-slate-600 font-bold">
                    காடையாம்பட்டி வட்டார அளவிலான மாணவர் தரவரிசைப் பட்டியல் (Block Level)
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-[#5b21b6] text-white text-[11px] font-extrabold rounded-full font-mono">
                    2026 - 2027
                  </span>
                </div>
              </div>

              {/* MAIN RANKINGS TABLE (Purple Header Matching Sample PDF) */}
              <div className="p-4 sm:p-6">
                <table className="w-full text-left text-xs border-collapse border border-slate-300 shadow-xs">
                  <thead>
                    <tr className="bg-[#5b21b6] text-white font-extrabold text-[12px]">
                      <th className="py-2.5 px-3 text-center border border-slate-400 w-14">Rank</th>
                      <th className="py-2.5 px-3 text-center border border-slate-400 w-16">Score</th>
                      <th className="py-2.5 px-3 border border-slate-400">Name / Student Name</th>
                      <th className="py-2.5 px-3 border border-slate-400">School Name & UDISE ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 font-semibold text-slate-800 text-[11px]">
                    {presentStudents.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400">
                          மதிப்பெண் தரவுகள் ஏதும் பதிவு செய்யப்படவில்லை.
                        </td>
                      </tr>
                    ) : (
                      presentStudents.map((student, idx) => {
                        const rank = idx + 1;
                        return (
                          <tr 
                            key={idx} 
                            className={
                              rank === 1 ? 'bg-amber-100/60 font-bold' : 
                              rank === 2 ? 'bg-slate-100/80' : 
                              rank === 3 ? 'bg-orange-50/70' : 
                              idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                            }
                          >
                            <td className="py-2 px-3 text-center font-mono font-extrabold border border-slate-300 text-slate-900">
                              {rank === 1 ? (
                                <span className="inline-flex h-5 w-5 bg-amber-500 text-white rounded-full items-center justify-center text-[10px]">1</span>
                              ) : rank === 2 ? (
                                <span className="inline-flex h-5 w-5 bg-slate-400 text-white rounded-full items-center justify-center text-[10px]">2</span>
                              ) : rank === 3 ? (
                                <span className="inline-flex h-5 w-5 bg-orange-500 text-white rounded-full items-center justify-center text-[10px]">3</span>
                              ) : (
                                rank
                              )}
                            </td>
                            <td className="py-2 px-3 text-center font-mono font-black border border-slate-300 text-purple-900 text-xs">
                              {student.total}
                            </td>
                            <td className="py-2 px-3 border border-slate-300 font-bold text-slate-900">
                              {student.studentName}
                            </td>
                            <td className="py-2 px-3 border border-slate-300 text-slate-700">
                              <span className="font-semibold block">{student.schoolName}</span>
                              <span className="text-[9px] font-mono text-slate-500">{student.udise}</span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                {/* ABSENT / LOW SCORE SECTION (Yellow Banner Matching Page 2 of Sample PDF) */}
                {absentStudents.length > 0 && (
                  <div className="mt-6">
                    <div className="bg-[#facc15] text-slate-950 font-black text-center py-2 px-4 rounded-t-lg border-x border-t border-amber-400 tracking-wider uppercase text-xs">
                      ABSENT / தேர்வு எழுதாத மாணவர்கள்
                    </div>
                    <table className="w-full text-left text-xs border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-[#5b21b6] text-white font-extrabold text-[11px]">
                          <th className="py-2 px-3 text-center border border-slate-400 w-14">Rank</th>
                          <th className="py-2 px-3 text-center border border-slate-400 w-16">Score</th>
                          <th className="py-2 px-3 border border-slate-400">Name</th>
                          <th className="py-2 px-3 border border-slate-400">School & UDISE ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300 font-semibold text-slate-700 text-[11px]">
                        {absentStudents.map((student, idx) => (
                          <tr key={idx} className="bg-amber-50/20">
                            <td className="py-1.5 px-3 text-center font-mono text-slate-400 border border-slate-300">
                              N/A
                            </td>
                            <td className="py-1.5 px-3 text-center font-mono font-bold text-amber-700 border border-slate-300">
                              Absent
                            </td>
                            <td className="py-1.5 px-3 border border-slate-300 font-semibold text-slate-800">
                              {student.studentName}
                            </td>
                            <td className="py-1.5 px-3 border border-slate-300 text-slate-600 text-[10px]">
                              {student.schoolName} ({student.udise})
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* DOCUMENT BOTTOM FOOTER */}
            <div className="mt-auto">
              <div className="px-6 py-2 text-right">
                <p className="font-serif italic text-slate-400 text-xs font-semibold">
                  Vetri Sudar NMMS
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-amber-300 text-[9px] font-bold">
                  <span>வெற்றிச் சுடர் NMMS</span>
                </div>
              </div>

              {/* Dark Footer Bar */}
              <div className="bg-[#0f172a] text-white px-6 py-3 flex flex-wrap items-center justify-between border-t-2 border-amber-500 text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-amber-400" />
                  <span>iyyappanbrte1984@outlook.com</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-amber-400" />
                  <span>+919788858920  (காடையாம்பட்டி ஒன்றியம்)</span>
                </div>

                <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Globe className="h-3 w-3 text-amber-400" />
                  <span>வெற்றிச் சுடர் NMMS 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer info */}
        <div className="bg-slate-900 px-6 py-3 text-slate-400 text-xs flex justify-between items-center shrink-0 border-t border-slate-800">
          <span>காடையாம்பட்டி வட்டாரக் கல்வி அலுவலர் & ஒருங்கிணைப்பு பயிற்றுநர்கள் குழு</span>
          <span className="font-mono text-[10px] text-slate-500">A4 Rank List PDF</span>
        </div>

      </div>
    </div>
  );
}
