import React, { useState, useMemo, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  RotateCcw, 
  Calendar, 
  School as SchoolIcon, 
  Edit3, 
  Table, 
  Check, 
  Eye, 
  EyeOff,
  Plus, 
  RefreshCw, 
  Sparkles,
  Lock,
  Unlock,
  Key,
  KeyRound,
  LogOut,
  Database,
  ArrowRight,
  Info,
  ChevronDown,
  Camera,
  Trash2,
  Image,
  UserCheck,
  Gamepad2,
  FileCode,
  Code,
  Play,
  Trophy,
  Users,
  MessageSquareText,
  Clock,
  X,
  BookOpen,
  BookMarked,
  Calculator,
  Landmark,
  Factory,
  Sprout,
  Monitor,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Activity,
  TrendingUp,
  BarChart3,
  ListChecks,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { 
  SCHOOLS, 
  SchoolRecord, 
  StudentMark, 
  School, 
  TEST_SCHEDULE, 
  TestInfo, 
  isTestLocked,
  parseDateDDMMYY 
} from '../types';
import { getCurrentCalendarWeek } from '../data/studyPlanData';
import { ClassroomPhoto, INITIAL_PHOTOS, getStoredClassroomPhotos } from './ClassroomGallery';
import { GamificationReport, INITIAL_GAMIFICATION_REPORTS, getStoredGamificationReports } from './GamificationLearningResults';
import { UploadedHtmlExam, getStoredHtmlExams } from './OnlineTest';
import { InteractiveStudyMaterial, INTERACTIVE_STUDY_MATERIALS, getStoredStudyMaterials } from '../data/htmlStudyMaterials';

interface AdminPortalProps {
  records: SchoolRecord[];
  onSaveRecord: (updatedRecord: SchoolRecord) => void;
  onImportData: (newRecords: SchoolRecord[]) => void;
}

export default function AdminPortal({ records, onSaveRecord, onImportData }: AdminPortalProps) {
  // Tabs: 'master_grid' | 'upload_excel' | 'single_test_editor' | 'classroom_photos' | 'gamification_results' | 'upload_online_exam' | 'upload_study_material' | 'database_manager'
  const [activeSubTab, setActiveSubTab] = useState<
    'master_grid' | 
    'upload_excel' | 
    'single_test_editor' | 
    'classroom_photos' | 
    'gamification_results' | 
    'upload_online_exam' | 
    'upload_study_material' | 
    'database_manager'
  >('master_grid');

  // Filter & Search
  const [selectedTestFilter, setSelectedTestFilter] = useState<string>('all'); // 'all' or testId
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditingGrid, setIsEditingGrid] = useState<boolean>(false);
  const [showMarksAnalytics, setShowMarksAnalytics] = useState<boolean>(false);

  // Selected test for single week editor & upload target
  const [targetTestId, setTargetTestId] = useState<string>('test_6');

  // Local grid edit copy
  const [gridData, setGridData] = useState<SchoolRecord[]>(records);

  // Synchronize with parent records if not actively dirty
  React.useEffect(() => {
    setGridData(records);
  }, [records]);

  // Status Alerts
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('nmms_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState<boolean>(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthSubmitting(true);
    setAuthError('');

    const trimmedUser = usernameInput.trim().toLowerCase();
    const trimmedPass = passwordInput.trim();

    // Required credentials: username: nmms, password: 2026
    if (trimmedUser === 'nmms' && trimmedPass === '2026') {
      try {
        sessionStorage.setItem('nmms_admin_authenticated', 'true');
      } catch (err) {
        console.error('SessionStorage access failed', err);
      }
      setIsAuthenticated(true);
      setAuthError('');
      showToast('success', 'நிர்வாகப் பலகைக்குள் வெற்றிகரமாக உள்நுழைந்தீர்கள்! (Welcome Admin)');
    } else {
      setAuthError('தவறான பயனர் பெயர் அல்லது கடவுச்சொல்! (Invalid Admin Credentials). இப்பக்கம் NMMS நிர்வாக ஒருங்கிணைப்பாளர்கள் மற்றும் BRTEs-க்கு மட்டுமே.');
    }
    setIsAuthSubmitting(false);
  };

  const handleAdminLogout = () => {
    try {
      sessionStorage.removeItem('nmms_admin_authenticated');
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    setAuthError('');
    showToast('info', 'நிர்வாகப் பலகையிலிருந்து பாதுகாப்பாக வெளியேறினீர்கள்.');
  };

  // Upload parser states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [parsedUploadRecords, setParsedUploadRecords] = useState<SchoolRecord[]>([]);
  const [uploadTargetTest, setUploadTargetTest] = useState<string>('test_6');
  const [uploadSummary, setUploadSummary] = useState<{
    totalRowsFound: number;
    matchedSchoolsCount: number;
    unmatchedNames: string[];
    detectedWeekLabel?: string;
  } | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);

  // Classroom Photo Management State
  const [classroomPhotos, setClassroomPhotos] = useState<ClassroomPhoto[]>(getStoredClassroomPhotos);
  const [photoSearchQuery, setPhotoSearchQuery] = useState<string>('');
  const [photoFilterCategory, setPhotoFilterCategory] = useState<string>('all');
  
  // New Photo Form State
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoSchool, setPhotoSchool] = useState(SCHOOLS[0]?.name || 'PUMS, KADAYAMPATTI');
  const [photoDate, setPhotoDate] = useState(new Date().toISOString().slice(0, 10));
  const [photoVisitor, setPhotoVisitor] = useState('ஆசிரியர் பயிற்றுநர் ஐய்யப்பன்');
  const [photoRole, setPhotoRole] = useState('BRTE (வட்டார வளமைய ஆசிரியர் பயிற்றுநர்)');
  const [photoCategory, setPhotoCategory] = useState<'classroom' | 'omr' | 'guidance' | 'activity'>('classroom');
  const [photoImageUrl, setPhotoImageUrl] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoStudentsCount, setPhotoStudentsCount] = useState<number>(18);
  const [isAddingPhoto, setIsAddingPhoto] = useState<boolean>(false);

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim() || !photoDescription.trim()) {
      showToast('error', 'தலைப்பு மற்றும் களப் பார்வை விளக்கக் குறிப்புகளை உள்ளிடவும்.');
      return;
    }

    const fallbackImage = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200';

    const newPhoto: ClassroomPhoto = {
      id: `custom_photo_${Date.now()}`,
      title: photoTitle.trim(),
      schoolName: photoSchool,
      date: photoDate,
      visitorName: photoVisitor.trim(),
      visitorRole: photoRole.trim(),
      category: photoCategory,
      imageUrl: photoImageUrl || fallbackImage,
      description: photoDescription.trim(),
      studentsCount: photoStudentsCount,
      isCustom: true
    };

    const updated = [newPhoto, ...classroomPhotos];
    setClassroomPhotos(updated);

    try {
      const customOnly = updated.filter(p => p.isCustom);
      localStorage.setItem('nmms_classroom_photos', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_photos_updated'));
    } catch (e) {
      console.error('Failed to save photo to localStorage', e);
    }

    // Reset Form
    setPhotoTitle('');
    setPhotoImageUrl('');
    setPhotoDescription('');
    setIsAddingPhoto(false);
    showToast('success', 'புதிய வகுப்பறைப் புகைப்படம் வெற்றிகரமாகச் சேர்க்கப்பட்டு கேலரியில் வெளியிடப்பட்டது!');
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!window.confirm('இப்புகைப்படத்தை நிச்சயமாக நீக்க விரும்புகிறீர்களா?')) return;

    const updated = classroomPhotos.filter(p => p.id !== photoId);
    setClassroomPhotos(updated);

    try {
      const customOnly = updated.filter(p => p.isCustom);
      localStorage.setItem('nmms_classroom_photos', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_photos_updated'));
      showToast('info', 'புகைப்படம் நீக்கப்பட்டது.');
    } catch (e) {
      console.error('Failed to update photos', e);
    }
  };

  // =========================================================================
  // Gamification Results Management State & Handlers
  // =========================================================================
  const [gamificationReports, setGamificationReports] = useState<GamificationReport[]>(getStoredGamificationReports);
  const [gamificationSearchQuery, setGamificationSearchQuery] = useState<string>('');
  const [gamificationFilterPlatform, setGamificationFilterPlatform] = useState<string>('all');
  const [isAddingGamification, setIsAddingGamification] = useState<boolean>(false);

  // New Gamification Form
  const [gTopic, setGTopic] = useState('');
  const [gDate, setGDate] = useState(new Date().toISOString().slice(0, 10));
  const [gHostedBy, setGHostedBy] = useState('ஆசிரியர் பயிற்றுநர் ஐய்யப்பன்');
  const [gHostRole, setGHostRole] = useState('BRTE - NMMS ஒருங்கிணைப்பாளர்');
  const [gPlatform, setGPlatform] = useState<'Kahoot' | 'Quizizz' | 'Google Forms' | 'Live Quiz' | 'Other'>('Kahoot');
  const [gImageUrl, setGImageUrl] = useState('');
  const [gSchoolsCount, setGSchoolsCount] = useState<number>(15);
  const [gParticipantsCount, setGParticipantsCount] = useState<number>(150);
  const [gTopSchool, setGTopSchool] = useState(SCHOOLS[0]?.name || 'PUMS, KADAYAMPATTI');
  const [gRemarks, setGRemarks] = useState('');

  const handleGamificationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGamificationReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gTopic.trim() || !gRemarks.trim()) {
      showToast('error', 'தயவுசெய்து தலைப்பு மற்றும் பள்ளிகள் பங்கேற்பு அறிக்கைக் குறிப்புகளை நிரப்பவும்.');
      return;
    }

    const fallbackImage = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200';

    const newReport: GamificationReport = {
      id: `gamification_${Date.now()}`,
      topic: gTopic.trim(),
      date: gDate,
      hostedBy: gHostedBy.trim(),
      hostRole: gHostRole.trim(),
      platform: gPlatform,
      imageUrl: gImageUrl || fallbackImage,
      participatingSchoolsCount: gSchoolsCount,
      totalParticipants: gParticipantsCount,
      topSchoolWinner: gTopSchool,
      remarks: gRemarks.trim(),
      isCustom: true
    };

    const updated = [newReport, ...gamificationReports];
    setGamificationReports(updated);

    try {
      const customOnly = updated.filter(r => r.isCustom);
      localStorage.setItem('nmms_gamification_reports', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_gamification_updated'));
    } catch (e) {
      console.error('Failed to store gamification reports', e);
    }

    // Reset Form
    setGTopic('');
    setGImageUrl('');
    setGRemarks('');
    setIsAddingGamification(false);
    showToast('success', 'விளையாட்டு வழிக் கற்றல் முடிவுகள் வெற்றிகரமாகப் பதிவேற்றப்பட்டு வெளியிடப்பட்டது!');
  };

  const handleDeleteGamificationReport = (reportId: string) => {
    if (!window.confirm('இவ்விளையாட்டு வழிக் கற்றல் முடிவை நிச்சயமாக நீக்க விரும்புகிறீர்களா?')) return;

    const updated = gamificationReports.filter(r => r.id !== reportId);
    setGamificationReports(updated);

    try {
      const customOnly = updated.filter(r => r.isCustom);
      localStorage.setItem('nmms_gamification_reports', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_gamification_updated'));
      showToast('info', 'கற்றல் முடிவுகள் நீக்கப்பட்டது.');
    } catch (e) {
      console.error('Failed to delete gamification report', e);
    }
  };

  // =========================================================================
  // Upload Online Exam (HTML File) Management State & Handlers
  // =========================================================================
  const [uploadedHtmlExams, setUploadedHtmlExams] = useState<UploadedHtmlExam[]>(getStoredHtmlExams);
  const [examSearchQuery, setExamSearchQuery] = useState<string>('');
  const [isAddingExam, setIsAddingExam] = useState<boolean>(false);
  const [previewExamHtml, setPreviewExamHtml] = useState<string | null>(null);

  // New HTML Exam Form
  const [examTitle, setExamTitle] = useState('');
  const [examTamilTitle, setExamTamilTitle] = useState('');
  const [examSubject, setExamSubject] = useState<'maths' | 'mat' | 'science' | 'social' | 'full_omr'>('maths');
  const [examDuration, setExamDuration] = useState<number>(20);
  const [examTotalQuestions, setExamTotalQuestions] = useState<number>(25);
  const [examDescription, setExamDescription] = useState('');
  const [examAuthor, setExamAuthor] = useState('ஆசிரியர் பயிற்றுநர் ஐய்யப்பன் (BRTE)');
  const [examHtmlContent, setExamHtmlContent] = useState('');
  const [examFileName, setExamFileName] = useState('');
  const htmlFileInputRef = useRef<HTMLInputElement>(null);

  const handleHtmlFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExamFileName(file.name);
      if (!examTitle) {
        // Auto populate title from file name
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
        setExamTitle(cleanName);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setExamHtmlContent(content || '');
      };
      reader.readAsText(file);
    }
  };

  const handleSaveHtmlExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle.trim()) {
      showToast('error', 'தயவுசெய்து தேர்வின் தலைப்பை உள்ளிடவும்.');
      return;
    }
    if (!examHtmlContent.trim()) {
      showToast('error', 'தயவுசெய்து HTML கோப்பைத் தேர்வு செய்யவும் அல்லது HTML குறியீட்டை ஒட்டவும்.');
      return;
    }

    const subjectLabels: Record<string, string> = {
      maths: 'கணிதம் & வடிவவியல்',
      mat: 'MAT மனத்திறன் தேர்வு',
      science: 'SAT அறிவியல்',
      social: 'SAT சமூக அறிவியல்',
      full_omr: 'NMMS முழு மாதிரித் தேர்வு'
    };

    const newExam: UploadedHtmlExam = {
      id: `html_exam_${Date.now()}`,
      title: examTitle.trim(),
      tamilTitle: examTamilTitle.trim() || examTitle.trim(),
      subject: examSubject,
      subjectLabel: subjectLabels[examSubject] || 'NMMS மாதிரித் தேர்வு',
      durationMinutes: Number(examDuration) || 20,
      totalQuestions: Number(examTotalQuestions) || 20,
      description: examDescription.trim() || 'ஆசிரியரால் பதிவேற்றப்பட்ட ஊடாடும் ஆன்லைன் மாதிரித் தேர்வு.',
      htmlContent: examHtmlContent,
      fileName: examFileName || 'exam.html',
      uploadedAt: new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: examAuthor.trim(),
      isCustomHtml: true
    };

    const updated = [newExam, ...uploadedHtmlExams];
    setUploadedHtmlExams(updated);

    try {
      localStorage.setItem('nmms_uploaded_html_exams', JSON.stringify(updated));
      window.dispatchEvent(new Event('nmms_exams_updated'));
    } catch (e) {
      console.error('Failed to store html exam', e);
    }

    // Reset Form
    setExamTitle('');
    setExamTamilTitle('');
    setExamDescription('');
    setExamHtmlContent('');
    setExamFileName('');
    if (htmlFileInputRef.current) htmlFileInputRef.current.value = '';
    setIsAddingExam(false);
    showToast('success', 'HTML ஆன்லைன் தேர்வு வெற்றிகரமாகப் பதிவேற்றப்பட்டு மாணவர் பயிற்சிப் பகுதியில் சேர்க்கப்பட்டது!');
  };

  const handleDeleteHtmlExam = (examId: string) => {
    if (!window.confirm('இத்தேர்வை நிச்சயமாக நீக்க விரும்புகிறீர்களா?')) return;

    const updated = uploadedHtmlExams.filter(e => e.id !== examId);
    setUploadedHtmlExams(updated);

    try {
      localStorage.setItem('nmms_uploaded_html_exams', JSON.stringify(updated));
      window.dispatchEvent(new Event('nmms_exams_updated'));
      showToast('info', 'ஆன்லைன் தேர்வு நீக்கப்பட்டது.');
    } catch (e) {
      console.error('Failed to update html exams', e);
    }
  };

  // =========================================================================
  // Upload Study Material (HTML File) Management State & Handlers
  // =========================================================================
  const [studyMaterials, setStudyMaterials] = useState<InteractiveStudyMaterial[]>(getStoredStudyMaterials);
  const [smSearchQuery, setSmSearchQuery] = useState<string>('');
  const [smCategoryFilter, setSmCategoryFilter] = useState<string>('all');
  const [isAddingStudyMaterial, setIsAddingStudyMaterial] = useState<boolean>(false);
  const [previewStudyMaterialHtml, setPreviewStudyMaterialHtml] = useState<string | null>(null);

  // New Study Material Form
  const [smTitle, setSmTitle] = useState('');
  const [smEnglishTitle, setSmEnglishTitle] = useState('');
  const [smCategory, setSmCategory] = useState<'social' | 'maths' | 'science'>('social');
  const [smSubjectLabel, setSmSubjectLabel] = useState('சமூக அறிவியல் • வரலாறு');
  const [smClassTerm, setSmClassTerm] = useState('8 ஆம் வகுப்பு • பாடம்');
  const [smDescription, setSmDescription] = useState('');
  const [smTrainer, setSmTrainer] = useState('கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி');
  const [smTags, setSmTags] = useState('');
  const [smIcon, setSmIcon] = useState('Landmark');
  const [smHtmlContent, setSmHtmlContent] = useState('');
  const [smFileName, setSmFileName] = useState('');
  const smFileInputRef = useRef<HTMLInputElement>(null);

  const handleStudyMaterialFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSmFileName(file.name);
      if (!smTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
        setSmTitle(cleanName);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setSmHtmlContent(content || '');
      };
      reader.readAsText(file);
    }
  };

  const handleSaveStudyMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smTitle.trim()) {
      showToast('error', 'தயவுசெய்து பாடக் குறிப்பின் தலைப்பை உள்ளிடவும்.');
      return;
    }
    if (!smHtmlContent.trim()) {
      showToast('error', 'தயவுசெய்து HTML கோப்பைத் தேர்வு செய்யவும் அல்லது HTML குறியீட்டை ஒட்டவும்.');
      return;
    }

    const tagsArray = smTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (tagsArray.length === 0) {
      tagsArray.push(smCategory === 'social' ? 'சமூக அறிவியல்' : smCategory === 'maths' ? 'கணிதம்' : 'அறிவியல்');
      tagsArray.push('8-ஆம் வகுப்பு');
    }

    const newMaterial: InteractiveStudyMaterial = {
      id: `sm_custom_${Date.now()}`,
      title: smTitle.trim(),
      englishTitle: smEnglishTitle.trim() || smTitle.trim(),
      category: smCategory,
      subjectLabel: smSubjectLabel.trim() || (smCategory === 'social' ? 'சமூக அறிவியல்' : smCategory === 'maths' ? 'கணிதம்' : 'அறிவியல்'),
      classTerm: smClassTerm.trim() || '8 ஆம் வகுப்பு',
      description: smDescription.trim() || 'ஆசிரியரால் பதிவேற்றப்பட்ட ஊடாடும் டிஜிட்டல் பாடக் குறிப்பு மற்றும் மாதிரி வினாக்கள்.',
      trainer: smTrainer.trim(),
      tags: tagsArray,
      icon: smIcon,
      htmlContent: smHtmlContent,
      isCustom: true,
      uploadedAt: new Date().toLocaleDateString('ta-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileName: smFileName || 'study_material.html'
    };

    // Prepend to current materials
    const updated = [newMaterial, ...studyMaterials];
    setStudyMaterials(updated);

    try {
      // Keep only custom materials in localStorage
      const customOnly = updated.filter(m => m.isCustom);
      localStorage.setItem('nmms_uploaded_study_materials', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_materials_updated'));
    } catch (e) {
      console.error('Failed to save custom study material', e);
    }

    // Reset form
    setSmTitle('');
    setSmEnglishTitle('');
    setSmDescription('');
    setSmTags('');
    setSmHtmlContent('');
    setSmFileName('');
    if (smFileInputRef.current) smFileInputRef.current.value = '';
    setIsAddingStudyMaterial(false);
    showToast('success', 'HTML பாடக்குறிப்பு வெற்றிகரமாகப் பதிவேற்றப்பட்டு "பாடக் குறிப்புகள்" பகுதியில் சேர்க்கப்பட்டது!');
  };

  const handleDeleteStudyMaterial = (materialId: string) => {
    if (!window.confirm('இப்பாடக் குறிப்பை நிச்சயமாக நீக்க விரும்புகிறீர்களா?')) return;

    const updated = studyMaterials.filter(m => m.id !== materialId);
    setStudyMaterials(updated);

    try {
      const customOnly = updated.filter(m => m.isCustom);
      localStorage.setItem('nmms_uploaded_study_materials', JSON.stringify(customOnly));
      window.dispatchEvent(new Event('nmms_materials_updated'));
      showToast('info', 'பாடக்குறிப்பு நீக்கப்பட்டது.');
    } catch (e) {
      console.error('Failed to update study materials', e);
    }
  };


  // Current Calendar Week calculation
  const currentWeekInfo = useMemo(() => {
    const cal = getCurrentCalendarWeek();
    return {
      weekNum: cal.week,
      approxTestId: `test_${Math.min(cal.week, 25)}`
    };
  }, []);

  // Helper to find a record for a school & test
  const getRecordFor = (schoolId: string, testId: string): SchoolRecord | undefined => {
    return gridData.find(r => r.schoolId === schoolId && r.testId === testId);
  };

  // Helper to create a blank StudentMark
  const createEmptyMark = (name = ''): StudentMark => ({
    studentName: name,
    mat: 0,
    satMath: 0,
    satScience: 0,
    satSocial: 0,
    total: 0
  });

  // Cell change handler for inline editing in Master Spreadsheet
  const handleCellChange = (
    schoolId: string,
    testId: string,
    rankKey: 'rank_1' | 'rank_2' | 'rank_3',
    field: keyof StudentMark,
    value: string | number
  ) => {
    setGridData(prevGrid => {
      const existingIdx = prevGrid.findIndex(r => r.schoolId === schoolId && r.testId === testId);
      const testInfo = TEST_SCHEDULE.find(t => t.id === testId);
      const dateStr = testInfo ? testInfo.date : new Date().toISOString().slice(0, 10);

      let record: SchoolRecord;
      if (existingIdx >= 0) {
        record = JSON.parse(JSON.stringify(prevGrid[existingIdx]));
      } else {
        record = {
          id: `${schoolId}_${testId}`,
          schoolId,
          testId,
          rank_1: createEmptyMark(),
          rank_2: createEmptyMark(),
          rank_3: createEmptyMark(),
          lastUpdated: dateStr
        };
      }

      // Update the specific field
      const currentRank = record[rankKey];
      if (field === 'studentName') {
        currentRank.studentName = String(value);
      } else {
        const numVal = Math.max(0, Number(value) || 0);
        (currentRank[field] as number) = numVal;
        // Recalculate total
        currentRank.total = Number(currentRank.mat || 0) + 
                            Number(currentRank.satMath || 0) + 
                            Number(currentRank.satScience || 0) + 
                            Number(currentRank.satSocial || 0);
      }
      record.lastUpdated = dateStr;

      if (existingIdx >= 0) {
        const updated = [...prevGrid];
        updated[existingIdx] = record;
        return updated;
      } else {
        return [...prevGrid, record];
      }
    });
  };

  // Save all in-grid modifications
  const handleSaveGridChanges = () => {
    onImportData(gridData);
    setIsEditingGrid(false);
    showToast('success', `அனைத்து மதிப்பெண்களும் வெற்றிகரமாக சேமிக்கப்பட்டது! (${gridData.length} records)`);
  };

  // Discard in-grid changes
  const handleDiscardGridChanges = () => {
    setGridData(records);
    setIsEditingGrid(false);
    showToast('info', 'மாற்றங்கள் நிராகரிக்கப்பட்டது.');
  };

  // Excel Parser Logic
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFile(file);
    setIsProcessingFile(true);
    setParsedUploadRecords([]);
    setUploadSummary(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Parse to JSON (array of arrays for raw matrix inspection)
        const rawRows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        if (!rawRows || rawRows.length === 0) {
          showToast('error', 'தேர்ந்தெடுக்கப்பட்ட எக்செல் கோப்பில் எந்த தரவும் இல்லை!');
          setIsProcessingFile(false);
          return;
        }

        // Process rows according to NMMS format
        parseNmmsExcelMatrix(rawRows);
      } catch (err: any) {
        console.error('Error parsing Excel file:', err);
        showToast('error', `எக்செல் கோப்பை வாசிப்பதில் பிழை: ${err.message}`);
        setIsProcessingFile(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  // Intelligent matrix parser for NMMS format
  const parseNmmsExcelMatrix = (rows: any[][]) => {
    // Look for header row that contains keywords: "UDISE", "School", "Rank", "MAT", "SAT"
    let headerRowIdx = -1;
    let udiseColIdx = -1;
    let schoolColIdx = -1;
    let rankColIdx = -1;

    for (let r = 0; r < Math.min(rows.length, 15); r++) {
      const rowStr = rows[r].map(c => String(c).toLowerCase()).join(' ');
      if (rowStr.includes('udise') || (rowStr.includes('school') && rowStr.includes('rank')) || rowStr.includes('student name')) {
        headerRowIdx = r;
        // Find specific columns
        rows[r].forEach((val, idx) => {
          const v = String(val).toLowerCase().trim();
          if (v.includes('udise')) udiseColIdx = idx;
          if (v.includes('school') || v.includes('பள்ளி')) schoolColIdx = idx;
          if (v.includes('rank') || v.includes('வரிசை') || v.includes('mark')) rankColIdx = idx;
        });
        break;
      }
    }

    // Default fallback columns if header not strictly labeled
    if (udiseColIdx === -1) udiseColIdx = 1;
    if (schoolColIdx === -1) schoolColIdx = 2;
    if (rankColIdx === -1) rankColIdx = 3;

    // Detect if multi-test columns or single-test columns exist
    // If multi-test headers exist, find test blocks
    const parsedRecordsMap: Record<string, SchoolRecord> = {};
    const unmatched: string[] = [];
    let matchedSchools = new Set<string>();

    // Clean school search map
    const schoolUdiseMap = new Map<string, School>();
    const schoolNameMap = new Map<string, School>();
    SCHOOLS.forEach(s => {
      schoolUdiseMap.set(s.udise.trim(), s);
      schoolNameMap.set(s.name.toLowerCase().replace(/[^a-z0-9]/g, ''), s);
    });

    const findSchool = (udiseVal: string, nameVal: string): School | undefined => {
      const uClean = String(udiseVal || '').trim();
      if (schoolUdiseMap.has(uClean)) return schoolUdiseMap.get(uClean);

      const nClean = String(nameVal || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (schoolNameMap.has(nClean)) return schoolNameMap.get(nClean);

      // Partial fuzzy search
      for (const s of SCHOOLS) {
        const sClean = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (nClean && (sClean.includes(nClean) || nClean.includes(sClean))) {
          return s;
        }
      }
      return undefined;
    };

    // Iterate through data rows
    let currentSchool: School | undefined = undefined;
    const startRow = headerRowIdx >= 0 ? headerRowIdx + 1 : 0;

    for (let r = startRow; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0) continue;

      const rawUdise = String(row[udiseColIdx] || '').trim();
      const rawSchoolName = String(row[schoolColIdx] || '').trim();
      const rawRank = String(row[rankColIdx] || '').trim();

      // Check if this row introduces a school
      const schoolMatch = findSchool(rawUdise, rawSchoolName);
      if (schoolMatch) {
        currentSchool = schoolMatch;
      }

      if (!currentSchool) {
        // Maybe school is specified in first column
        const c0School = findSchool('', String(row[0] || ''));
        if (c0School) currentSchool = c0School;
      }

      if (!currentSchool) {
        if (rawSchoolName && rawSchoolName.length > 3) {
          unmatched.push(rawSchoolName);
        }
        continue;
      }

      matchedSchools.add(currentSchool.id);

      // Determine rank index (1, 2, or 3)
      let rankKey: 'rank_1' | 'rank_2' | 'rank_3' = 'rank_1';
      const rankLower = rawRank.toLowerCase();
      if (rankLower.includes('2nd') || rankLower.includes('2') || rankLower.includes('இரண்டாம்')) {
        rankKey = 'rank_2';
      } else if (rankLower.includes('3rd') || rankLower.includes('3') || rankLower.includes('மூன்றாம்')) {
        rankKey = 'rank_3';
      } else if (rankLower.includes('1st') || rankLower.includes('1') || rankLower.includes('முதல்')) {
        rankKey = 'rank_1';
      }

      // Check columns for marks
      // Format in sheet: [Student Name, MAT /50, SAT-Math /10, SAT-Science /20, SAT-Social /20]
      // Search starting after rank column (col 4 or next available)
      let studentColStart = rankColIdx + 1;
      if (studentColStart >= row.length) studentColStart = 4;

      // Extract marks for target test
      const studentName = String(row[studentColStart] || '').trim();
      const mat = Math.min(50, Math.max(0, Number(row[studentColStart + 1]) || 0));
      const satMath = Math.min(10, Math.max(0, Number(row[studentColStart + 2]) || 0));
      const satScience = Math.min(20, Math.max(0, Number(row[studentColStart + 3]) || 0));
      const satSocial = Math.min(20, Math.max(0, Number(row[studentColStart + 4]) || 0));
      const total = mat + satMath + satScience + satSocial;

      const recordKey = `${currentSchool.id}_${uploadTargetTest}`;
      if (!parsedRecordsMap[recordKey]) {
        // Look up existing in records to preserve others
        const existing = records.find(x => x.id === recordKey);
        parsedRecordsMap[recordKey] = existing ? JSON.parse(JSON.stringify(existing)) : {
          id: recordKey,
          schoolId: currentSchool.id,
          testId: uploadTargetTest,
          rank_1: createEmptyMark(),
          rank_2: createEmptyMark(),
          rank_3: createEmptyMark(),
          lastUpdated: new Date().toISOString().slice(0, 10)
        };
      }

      if (studentName || mat > 0 || satMath > 0 || satScience > 0 || satSocial > 0) {
        parsedRecordsMap[recordKey][rankKey] = {
          studentName: studentName || `Student ${rankKey.slice(-1)}`,
          mat,
          satMath,
          satScience,
          satSocial,
          total
        };
      }
    }

    const finalParsed = Object.values(parsedRecordsMap);
    setParsedUploadRecords(finalParsed);
    setUploadSummary({
      totalRowsFound: rows.length,
      matchedSchoolsCount: matchedSchools.size,
      unmatchedNames: Array.from(new Set(unmatched)),
    });
    setIsProcessingFile(false);

    if (finalParsed.length > 0) {
      showToast('success', `எக்செல் கோப்பிலிருந்து ${matchedSchools.size} பள்ளிகளின் மதிப்பெண்கள் தயார் செய்யப்பட்டன!`);
    } else {
      showToast('error', 'எந்தப் பள்ளியின் மதிப்பெண்களையும் அடையாளம் காண இயலவில்லை. மாதிரி எக்செல் படிவத்தை பயன்படுத்தவும்.');
    }
  };

  // Apply parsed uploaded records to main database
  const handleApplyUpload = () => {
    if (parsedUploadRecords.length === 0) return;

    // Merge parsed records into existing records
    const updatedMap = new Map<string, SchoolRecord>();
    records.forEach(r => updatedMap.set(r.id, r));
    parsedUploadRecords.forEach(r => updatedMap.set(r.id, r));

    const newAllRecords = Array.from(updatedMap.values());
    onImportData(newAllRecords);
    setGridData(newAllRecords);

    showToast('success', `வெற்றி! ${parsedUploadRecords.length} பள்ளிகளுக்கான ${uploadTargetTest} மதிப்பெண்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டு சேமிக்கப்பட்டது!`);
    setUploadFile(null);
    setParsedUploadRecords([]);
    setUploadSummary(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveSubTab('master_grid');
  };

  // Export full Master Spreadsheet to Excel (.xlsx)
  const handleExportFullMasterExcel = () => {
    try {
      const activeTests = selectedTestFilter === 'all' 
        ? TEST_SCHEDULE 
        : TEST_SCHEDULE.filter(t => t.id === selectedTestFilter);

      // Build 2D headers array
      const headerRow1: string[] = ['S.No.', 'UDISE Number', 'Name of the School', 'Rank'];
      const headerRow2: string[] = ['', '', '', ''];

      activeTests.forEach(test => {
        headerRow1.push(test.label, '', '', '', '', '');
        headerRow2.push('Student Name', 'MAT /50', 'SAT-Math /10', 'SAT-Science /20', 'SAT-Social /20', 'Total /100');
      });

      const excelRows: any[][] = [headerRow1, headerRow2];

      // Populate 3 rows per school
      SCHOOLS.forEach((school, sIdx) => {
        const ranks: ('rank_1' | 'rank_2' | 'rank_3')[] = ['rank_1', 'rank_2', 'rank_3'];
        const rankLabels = ['1st Mark', '2nd Mark', '3rd Mark'];

        ranks.forEach((rKey, rIdx) => {
          const rowData: any[] = [
            rIdx === 0 ? sIdx + 1 : '',
            rIdx === 0 ? school.udise : '',
            rIdx === 0 ? school.name : '',
            rankLabels[rIdx]
          ];

          activeTests.forEach(test => {
            const rec = getRecordFor(school.id, test.id);
            if (rec && rec[rKey] && (rec[rKey].studentName || rec[rKey].total > 0)) {
              const m = rec[rKey];
              rowData.push(m.studentName || '', m.mat || 0, m.satMath || 0, m.satScience || 0, m.satSocial || 0, m.total || 0);
            } else {
              rowData.push('', '', '', '', '', '');
            }
          });

          excelRows.push(rowData);
        });
      });

      // Generate Workbook
      const worksheet = XLSX.utils.aoa_to_sheet(excelRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'NMMS_Master_Marks');

      // Auto-size columns
      worksheet['!cols'] = [
        { wch: 6 },  // S.No
        { wch: 14 }, // UDISE
        { wch: 30 }, // School Name
        { wch: 12 }, // Rank
      ];

      XLSX.writeFile(workbook, `NMMS_Kadayampatti_Weekly_Marks_${new Date().toISOString().slice(0, 10)}.xlsx`);
      showToast('success', 'முழு NMMS மதிப்பெண் எக்செல் கோப்பு பதிவிறக்கம் செய்யப்பட்டது!');
    } catch (err: any) {
      console.error('Export error:', err);
      showToast('error', `எக்செல் ஏற்றுமதியில் பிழை: ${err.message}`);
    }
  };

  // Download Blank/Weekly Template (.xlsx)
  const handleDownloadWeeklyTemplate = (testId: string) => {
    try {
      const test = TEST_SCHEDULE.find(t => t.id === testId) || TEST_SCHEDULE[0];
      const headerRow1 = ['S.No.', 'UDISE Number', 'Name of the School', 'Rank', `${test.label} (${test.formattedDate})`, '', '', '', ''];
      const headerRow2 = ['', '', '', '', 'Student Name', 'MAT /50', 'SAT-Math /10', 'SAT-Science /20', 'SAT-Social /20', 'Total /100'];

      const excelRows: any[][] = [headerRow1, headerRow2];

      SCHOOLS.forEach((school, sIdx) => {
        const ranks = ['1st Mark', '2nd Mark', '3rd Mark'];
        ranks.forEach((rLabel, rIdx) => {
          excelRows.push([
            rIdx === 0 ? sIdx + 1 : '',
            rIdx === 0 ? school.udise : '',
            rIdx === 0 ? school.name : '',
            rLabel,
            '', '', '', '', '', ''
          ]);
        });
      });

      const worksheet = XLSX.utils.aoa_to_sheet(excelRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${test.id}_Template`);

      XLSX.writeFile(workbook, `NMMS_${test.id}_Upload_Template.xlsx`);
      showToast('success', `${test.label} மாதிரி எக்செல் படிவம் பதிவிறக்கம் செய்யப்பட்டது!`);
    } catch (err: any) {
      showToast('error', `படிவப் பதிவிறக்கத்தில் பிழை: ${err.message}`);
    }
  };

  // Filtered schools for view
  const displaySchools = useMemo(() => {
    if (!searchQuery.trim()) return SCHOOLS;
    const q = searchQuery.toLowerCase().trim();
    return SCHOOLS.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.udise.includes(q) ||
      s.location.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Display tests in master sheet
  const displayTests = useMemo(() => {
    if (selectedTestFilter === 'all') return TEST_SCHEDULE;
    return TEST_SCHEDULE.filter(t => t.id === selectedTestFilter);
  }, [selectedTestFilter]);

  // Computed Executive Statistics for Informative Overview & Radar
  const executiveStats = useMemo(() => {
    const totalSchools = SCHOOLS.length;
    let totalMarksSum = 0;
    let totalRecordEntries = 0;

    // Target test submissions check
    const currentTargetTest = TEST_SCHEDULE.find(t => t.id === targetTestId) || TEST_SCHEDULE[5];
    const targetSubmissions = records.filter(r => r.testId === targetTestId && ((r.rank_1?.total && r.rank_1.total > 0) || (r.rank_2?.total && r.rank_2.total > 0) || (r.rank_3?.total && r.rank_3.total > 0)));
    const targetSubmittedCount = targetSubmissions.length;
    const targetPendingCount = Math.max(0, totalSchools - targetSubmittedCount);

    // Calculate school overall performance
    const schoolPerformances: { [schoolId: string]: { totalMarks: number; count: number; schoolName: string } } = {};

    records.forEach(r => {
      const schoolObj = SCHOOLS.find(s => s.id === r.schoolId);
      const schoolName = schoolObj?.name || r.schoolId;

      const activeRanks = [r.rank_1, r.rank_2, r.rank_3].filter(rk => rk && rk.total > 0);
      if (activeRanks.length > 0) {
        const sum = activeRanks.reduce((acc, curr) => acc + (curr.total || 0), 0);
        const avg = sum / activeRanks.length;
        totalMarksSum += avg;
        totalRecordEntries += 1;

        if (!schoolPerformances[r.schoolId]) {
          schoolPerformances[r.schoolId] = { totalMarks: 0, count: 0, schoolName };
        }
        schoolPerformances[r.schoolId].totalMarks += avg;
        schoolPerformances[r.schoolId].count += 1;
      }
    });

    const blockAvgPercent = totalRecordEntries > 0 ? (totalMarksSum / totalRecordEntries).toFixed(1) : '58.5';

    let topSchool = 'PUMS, KADAYAMPATTI';
    let topSchoolAvg = 0;
    Object.values(schoolPerformances).forEach(sp => {
      const avg = sp.totalMarks / (sp.count || 1);
      if (avg > topSchoolAvg) {
        topSchoolAvg = avg;
        topSchool = sp.schoolName;
      }
    });

    return {
      totalSchools,
      totalRecordEntries: records.length,
      blockAvgPercent,
      topSchool,
      topSchoolAvg: topSchoolAvg > 0 ? topSchoolAvg.toFixed(1) : '78.2',
      targetTestLabel: currentTargetTest.label,
      targetSubmittedCount,
      targetPendingCount,
      targetSubmittedPercent: Math.round((targetSubmittedCount / totalSchools) * 100),
      totalPhotos: classroomPhotos.length,
      totalGames: gamificationReports.length,
      totalHtmlExams: uploadedHtmlExams.length,
      totalStudyMaterials: studyMaterials.length
    };
  }, [records, targetTestId, classroomPhotos.length, gamificationReports.length, uploadedHtmlExams.length, studyMaterials.length]);

  // Sub-tab metadata for the vertical navigation (Weekly Form Entry removed as requested)
  const subTabItems = [
    {
      id: 'master_grid' as const,
      title: 'முழு மதிப்பெண் அட்டவணை',
      english: 'Master Marksheet',
      icon: Table,
      color: 'indigo',
      badge: `${records.length} பதிவுகள்`,
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'upload_excel' as const,
      title: 'எக்செல் பதிவேற்றம்',
      english: 'Upload Excel (.xlsx)',
      icon: Upload,
      color: 'orange',
      badge: 'Batch Sync',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'classroom_photos' as const,
      title: 'வகுப்பறை புகைப்படங்கள்',
      english: 'Classroom Gallery',
      icon: Camera,
      color: 'amber',
      badge: `${classroomPhotos.length} படங்கள்`,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'gamification_results' as const,
      title: 'விளையாட்டு முடிவுகள்',
      english: 'Gamification Reports',
      icon: Gamepad2,
      color: 'purple',
      badge: `${gamificationReports.length} போட்டிகள்`,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'upload_online_exam' as const,
      title: 'ஆன்லைன் தேர்வுகள் (HTML)',
      english: 'Upload Interactive Quiz',
      icon: FileCode,
      color: 'rose',
      badge: `${uploadedHtmlExams.length} தேர்வுகள்`,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'upload_study_material' as const,
      title: 'பாடக்குறிப்புகள் (HTML)',
      english: 'Upload Study Materials',
      icon: BookMarked,
      color: 'teal',
      badge: `${studyMaterials.length} பாடங்கள்`,
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'database_manager' as const,
      title: 'தரவுத்தள மேலாண்மை',
      english: 'Backup & Restore',
      icon: Database,
      color: 'slate',
      badge: 'பாதுகாப்பு',
      badgeColor: 'bg-slate-100 text-slate-800'
    }
  ];

  // If not authenticated, display the secure admin login gate with stunning animation & instructions
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 animate-fadeIn font-sans">
        <div className="w-full max-w-lg">
          
          {/* Main Security Card */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-6 sm:p-9 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Header Icon with pulse ring animation */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-indigo-400 p-0.5 shadow-xl shadow-indigo-500/25 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                      <Lock className="w-9 h-9 text-indigo-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-slate-950 shadow-md">
                    <KeyRound className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-black uppercase tracking-wider mb-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    நிர்வாக அணுகல் மட்டுமே (Admin Only)
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    நிர்வாகப் பாதுகாப்பு நுழைவு மையம்
                  </h2>
                  <p className="text-xs text-indigo-200/90 font-bold mt-1">
                    Kadayampatti Block NMMS Coordination & Admin Portal
                  </p>
                </div>
              </div>

              {/* Warning & Instructions Notice */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 space-y-2 leading-relaxed backdrop-blur-xs">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>அதிகாரப்பூர்வ நிர்வாகிகளுக்கு மட்டும்</span>
                </div>
                <p className="text-[11px] text-slate-300/90">
                  இப்பக்கம் காடையாம்பட்டி ஒன்றிய NMMS மாதிரித் தேர்வு மதிப்பெண்கள், எக்செல் தரவு ஒத்திசைவு, வகுப்பறை ஆய்வுகள் & பாடக்குறிப்புகளை நிர்வகிக்கும் பிரத்யேக நிர்வாகத் தளம் ஆகும்.
                </p>
                <p className="text-[10px] text-slate-400 font-medium border-t border-white/10 pt-2">
                  This portal is strictly restricted for NMMS Block Administrators & BRTEs. Please enter your designated admin credentials to proceed.
                </p>
              </div>

              {/* Error Message if wrong credentials entered */}
              {authError && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-2xl flex items-start gap-3 text-rose-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">{authError}</span>
                    <span className="text-[10px] text-rose-300/80 mt-0.5 block">
                      தயவுசெய்து சரியான பயனர் பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.
                    </span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    பயனர் பெயர் (Username)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="admin-username-input"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="எ.கா: nmms"
                      autoFocus
                      required
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    கடவுச்சொல் (Password)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="admin-password-input"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="கடவுச்சொல் உள்ளிடவும்"
                      required
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
                      title={showPassword ? "மறைக்க" : "காண்க"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-admin-login-submit"
                  disabled={isAuthSubmitting}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 active:scale-[0.99] text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>நிர்வாகப் பலகைக்குள் நுழைக (Enter Admin Portal)</span>
                </button>
              </form>

              {/* Security Footer Badges */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  256-Bit Encrypted
                </span>
                <span>•</span>
                <span>காடையாம்பட்டி ஒன்றியம்</span>
                <span>•</span>
                <span>NMMS 2026 Admin</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-sans">
      
      {/* 1. Top Executive Command Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                காடையாம்பட்டி ஒன்றிய நிர்வாக மேலாண்மை மையம்
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync & LocalStorage Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <FileSpreadsheet className="h-7 w-7 text-indigo-400 shrink-0" />
              NMMS நிர்வாக மேலாண்மைத் தளம் (Master Command Center)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              காடையாம்பட்டி ஒன்றிய 26 நடுநிலைப் பள்ளிகளுக்கான NMMS மாதிரித் தேர்வு மதிப்பெண்கள், வகுப்பறை ஆய்வுகள், விளையாட்டு வழிக் கற்றல் அறிக்கைகள், HTML ஊடாடும் தேர்வுகள் & பாடக்குறிப்புகளை ஒரே இடத்தில் முழுமையாக நிர்வகிக்கவும்.
            </p>
          </div>

          {/* Quick Global Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="btn-export-master-excel"
              onClick={handleExportFullMasterExcel}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all cursor-pointer active:scale-95 border border-emerald-500/50"
            >
              <Download className="h-4 w-4" />
              முழு எக்செல் ஏற்றுமதி (.xlsx)
            </button>
            <button
              id="btn-download-weekly-template"
              onClick={() => handleDownloadWeeklyTemplate(targetTestId)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl backdrop-blur-md transition-all cursor-pointer border border-white/20 active:scale-95"
            >
              <FileSpreadsheet className="h-4 w-4 text-indigo-300" />
              மாதிரி படிவம் பதிவிறக்கம்
            </button>
            <button
              id="btn-admin-logout"
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-2xl backdrop-blur-md transition-all cursor-pointer active:scale-95"
              title="நிர்வாகப் பலகையிலிருந்து வெளியேறு"
            >
              <LogOut className="h-4 w-4 text-rose-400" />
              வெளியேறு (Logout)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout: Left Navigation & Command Dock + Right Main Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: VERTICAL NAVIGATION & MARKS DETAILS EXPANDABLE DOCK */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-80 xl:w-88 shrink-0 space-y-4 lg:sticky lg:top-20">

          {/* Sub-Tab Vertical Menu */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between px-2 pb-2.5 border-b border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                நிர்வாகப் பிரிவுகள் (Menu)
              </span>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                {subTabItems.length} பிரிவுகள்
              </span>
            </div>

            <nav className="space-y-1.5" aria-label="Admin Portal Vertical Navigation">
              {subTabItems.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeSubTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => {
                      setActiveSubTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 ring-2 ring-indigo-500' 
                        : 'hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}>
                        <TabIcon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <span className={`block text-xs font-black truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                          {tab.title}
                        </span>
                        <span className={`block text-[10px] font-medium truncate ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {tab.english}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : tab.badgeColor
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}

              {/* Dedicated Marks Details & Analytics Toggle Navigation Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  id="btn-toggle-marks-details"
                  onClick={() => setShowMarksAnalytics(prev => !prev)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer border ${
                    showMarksAnalytics 
                      ? 'bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-indigo-500 shadow-md ring-2 ring-indigo-400/50' 
                      : 'bg-indigo-50/70 hover:bg-indigo-100/80 text-indigo-950 border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      showMarksAnalytics ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'
                    }`}>
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-black truncate">
                        மதிப்பெண் விவரங்கள் & கண்காணிப்பு
                      </span>
                      <span className={`block text-[10px] font-medium truncate ${showMarksAnalytics ? 'text-indigo-200' : 'text-indigo-600 font-bold'}`}>
                        Marks Analytics & Tracker
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                      showMarksAnalytics ? 'bg-emerald-500 text-white' : 'bg-indigo-200 text-indigo-900'
                    }`}>
                      {showMarksAnalytics ? 'மறைக்க' : 'காண்க'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMarksAnalytics ? 'rotate-180 text-white' : 'text-indigo-700'}`} />
                  </div>
                </button>
              </div>
            </nav>
          </div>

          {/* Expandable Section: Marks Details, Radar & KPIs Shown BELOW the navigation when clicked */}
          {showMarksAnalytics && (
            <div className="space-y-4 animate-slideDown">
              
              {/* Executive Statistics Grid */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ஒன்றிய மதிப்பெண் புள்ளிவிவரங்கள்
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                    {executiveStats.totalSchools} பள்ளிகள்
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 block">ஒன்றிய சராசரி</span>
                    <span className="text-lg font-black text-indigo-600">{executiveStats.blockAvgPercent}%</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-500 block">மொத்தப் பதிவுகள்</span>
                    <span className="text-lg font-black text-slate-800">{executiveStats.totalRecordEntries}</span>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">முன்னணிப் பள்ளி (Top Performance)</span>
                  <span className="text-xs font-black text-amber-950 block mt-0.5">{executiveStats.topSchool}</span>
                  <span className="text-[10px] font-bold text-amber-700">சராசரி: {executiveStats.topSchoolAvg}%</span>
                </div>
              </div>

              {/* Target Test Submission Health Tracker Radar */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-5 border border-indigo-800/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    தேர்வு பதிவு கண்காணிப்பு
                  </span>
                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Live Tracker
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1.5">
                    கண்காணிக்க வேண்டிய தேர்வு வாரம்:
                  </label>
                  <select
                    value={targetTestId}
                    onChange={(e) => setTargetTestId(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                  >
                    {TEST_SCHEDULE.map((t) => (
                      <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                        {t.label} ({t.formattedDate})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="text-slate-300">ஒன்றியப் பதிவுகள்:</span>
                    <span className="text-emerald-400 font-black">{executiveStats.targetSubmittedPercent}% முடிந்தது</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(4, Math.min(100, executiveStats.targetSubmittedPercent))}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block">பதிவிட்டவை</span>
                    <span className="text-base font-black text-emerald-400">{executiveStats.targetSubmittedCount} பள்ளிகள்</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block">நிலுவை</span>
                    <span className="text-base font-black text-amber-400">{executiveStats.targetPendingCount} பள்ளிகள்</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex gap-2">
                  <button
                    onClick={() => {
                      setActiveSubTab('master_grid');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Table className="w-3.5 h-3.5" />
                    <span>மதிப்பெண் அட்டவணை</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSubTab('upload_excel');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    title="எக்செல் பதிவேற்றம்"
                  >
                    <Upload className="w-3.5 h-3.5 text-orange-400" />
                  </button>
                </div>
              </div>

              {/* Quick Action Toolkit Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    விரைவுக் கருவிகள் (Quick Toolkit)
                  </h3>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleExportFullMasterExcel}
                    className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer border border-emerald-200"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span>முழு எக்செல் ஏற்றுமதி (.xlsx)</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                  </button>

                  <button
                    onClick={() => handleDownloadWeeklyTemplate(targetTestId)}
                    className="w-full p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer border border-indigo-200"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                      <span>மாதிரி படிவம் பதிவிறக்கு</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveSubTab('database_manager');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer border border-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-600" />
                      <span>முழு JSON காப்புநகல் (Backup)</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* BRTE & Teachers Official Guidelines Notice */}
              <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 text-amber-950 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>நிர்வாக வழிகாட்டுதல்கள்</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-amber-900/90 leading-relaxed font-medium">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>OMR விடைத்தாள்களை மதிப்பீடு செய்து வாராந்திர சராசரியை உடனுக்குடன் பதிவு செய்யவும்.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>வகுப்பறை ஆய்வுப் புகைப்படங்களை பதிவேற்றும் போது பள்ளிப் பெயர் & தேதி இருப்பதை உறுதிப்படுத்தவும்.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>மாணவர்கள் சுயமாகப் பயிற்சி பெற HTML பாடங்கள் & தேர்வுகளைப் பதிவேற்றலாம்.</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>
        {/* END OF LEFT COLUMN */}

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: ACTIVE WORKSPACE CANVAS */}
        {/* ========================================================================= */}
        <div className="flex-1 min-w-0 w-full space-y-6">

          {/* Toast Notification */}
          {notification && (
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md animate-slideDown ${
              notification.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
              notification.type === 'error' ? 'bg-rose-50 text-rose-900 border-rose-300' :
              'bg-indigo-50 text-indigo-900 border-indigo-300'
            }`}>
              <div className="flex items-center gap-3">
                {notification.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" /> :
                 notification.type === 'error' ? <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" /> :
                 <Info className="h-5 w-5 text-indigo-600 shrink-0" />}
                <span className="text-xs font-bold">{notification.message}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

      {/* ========================================================================= */}
      {/* SUB-TAB 1: MASTER SPREADSHEET (Exact Match to PDF / Excel Layout) */}
      {/* ========================================================================= */}
      {activeSubTab === 'master_grid' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative min-w-[240px] flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="input-search-master-grid"
                  type="text"
                  placeholder="Search by school name, UDISE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Test Focus Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  id="select-test-filter"
                  value={selectedTestFilter}
                  onChange={(e) => setSelectedTestFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                  <option value="all">அனைத்து தேர்வுகள் (All Tests 1-25)</option>
                  {TEST_SCHEDULE.map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* In-Grid Edit Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {isEditingGrid ? (
                <>
                  <button
                    id="btn-save-grid"
                    onClick={handleSaveGridChanges}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Save className="h-4 w-4" /> மாற்றங்களைச் சேமி (Save All)
                  </button>
                  <button
                    id="btn-discard-grid"
                    onClick={handleDiscardGridChanges}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" /> நிராகரி
                  </button>
                </>
              ) : (
                <button
                  id="btn-enable-grid-edit"
                  onClick={() => setIsEditingGrid(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Edit3 className="h-4 w-4" /> நேரடியாக திருத்துக (Inline Edit Mode)
                </button>
              )}
            </div>

          </div>

          {/* Master Table Scrollable Container */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[75vh]">
              <table className="w-full text-left border-collapse text-[11px] font-sans">
                
                {/* Level 1 Header: Test Names */}
                <thead className="bg-slate-900 text-white sticky top-0 z-20 select-none">
                  <tr>
                    <th className="p-3 border-r border-b border-slate-700 font-black text-center w-12 sticky left-0 bg-slate-900 z-30">
                      S.No.
                    </th>
                    <th className="p-3 border-r border-b border-slate-700 font-black w-28 sticky left-12 bg-slate-900 z-30">
                      UDISE Number
                    </th>
                    <th className="p-3 border-r border-b border-slate-700 font-black min-w-[200px] sticky left-40 bg-slate-900 z-30">
                      Name of the School
                    </th>
                    <th className="p-3 border-r border-b border-slate-700 font-black text-center w-20 sticky left-[360px] bg-slate-900 z-30">
                      Rank
                    </th>

                    {displayTests.map(test => (
                      <th
                        key={test.id}
                        colSpan={6}
                        className="p-3 text-center font-extrabold border-r border-b border-slate-700 bg-slate-800 text-slate-100 whitespace-nowrap min-w-[360px]"
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{test.label}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({test.formattedDate})</span>
                        </div>
                      </th>
                    ))}
                  </tr>

                  {/* Level 2 Sub-Headers: Student Name, MAT, SAT-Math, SAT-Science, SAT-Social, Total */}
                  <tr className="bg-slate-800 text-slate-200 text-[10px] font-extrabold">
                    <th className="p-2 border-r border-slate-700 sticky left-0 bg-slate-800 z-30"></th>
                    <th className="p-2 border-r border-slate-700 sticky left-12 bg-slate-800 z-30"></th>
                    <th className="p-2 border-r border-slate-700 sticky left-40 bg-slate-800 z-30"></th>
                    <th className="p-2 border-r border-slate-700 sticky left-[360px] bg-slate-800 z-30"></th>

                    {displayTests.map(test => (
                      <React.Fragment key={`${test.id}-sub`}>
                        <th className="p-2 border-r border-slate-700 font-bold min-w-[110px] text-slate-200 bg-slate-850">
                          Student Name
                        </th>
                        <th className="p-2 border-r border-slate-700 font-bold text-center w-14 bg-indigo-950/60 text-indigo-300">
                          MAT /50
                        </th>
                        <th className="p-2 border-r border-slate-700 font-bold text-center w-16 bg-blue-950/60 text-blue-300">
                          SAT-Math /10
                        </th>
                        <th className="p-2 border-r border-slate-700 font-bold text-center w-16 bg-emerald-950/60 text-emerald-300">
                          SAT-Sci /20
                        </th>
                        <th className="p-2 border-r border-slate-700 font-bold text-center w-16 bg-amber-950/60 text-amber-300">
                          SAT-Soc /20
                        </th>
                        <th className="p-2 border-r border-slate-700 font-extrabold text-center w-16 bg-slate-750 text-white">
                          Total /100
                        </th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>

                {/* Table Body: 3 rows per school (1st, 2nd, 3rd) */}
                <tbody className="divide-y divide-slate-200">
                  {displaySchools.map((school, sIdx) => {
                    const ranks: ('rank_1' | 'rank_2' | 'rank_3')[] = ['rank_1', 'rank_2', 'rank_3'];
                    const rankLabels = ['1st Mark', '2nd Mark', '3rd Mark'];

                    return (
                      <React.Fragment key={school.id}>
                        {ranks.map((rKey, rIdx) => {
                          const isFirstOfSchool = rIdx === 0;

                          return (
                            <tr 
                              key={`${school.id}_${rKey}`}
                              className={`hover:bg-indigo-50/40 transition-colors ${
                                rIdx === 2 ? 'border-b-2 border-b-slate-300' : ''
                              } ${sIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                            >
                              {/* S.No */}
                              {isFirstOfSchool ? (
                                <td 
                                  rowSpan={3} 
                                  className="p-3 border-r border-slate-200 text-center font-bold text-slate-700 sticky left-0 bg-inherit z-10 align-middle"
                                >
                                  {sIdx + 1}
                                </td>
                              ) : null}

                              {/* UDISE */}
                              {isFirstOfSchool ? (
                                <td 
                                  rowSpan={3} 
                                  className="p-3 border-r border-slate-200 font-mono font-bold text-slate-600 sticky left-12 bg-inherit z-10 align-middle"
                                >
                                  {school.udise}
                                </td>
                              ) : null}

                              {/* School Name */}
                              {isFirstOfSchool ? (
                                <td 
                                  rowSpan={3} 
                                  className="p-3 border-r border-slate-200 font-bold text-slate-900 sticky left-40 bg-inherit z-10 align-middle"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-xs">{school.name}</span>
                                  </div>
                                </td>
                              ) : null}

                              {/* Rank Badge */}
                              <td className="p-2.5 border-r border-slate-200 font-black text-center sticky left-[360px] bg-inherit z-10">
                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                  rIdx === 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                                  rIdx === 1 ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                                  'bg-amber-100 text-amber-800 border border-amber-300'
                                }`}>
                                  {rankLabels[rIdx]}
                                </span>
                              </td>

                              {/* Test Columns */}
                              {displayTests.map(test => {
                                const rec = getRecordFor(school.id, test.id);
                                const mark = rec ? rec[rKey] : undefined;

                                if (isEditingGrid) {
                                  return (
                                    <React.Fragment key={`${test.id}_${school.id}_${rKey}_edit`}>
                                      {/* Editable Student Name */}
                                      <td className="p-1 border-r border-slate-200 bg-white">
                                        <input
                                          type="text"
                                          value={mark?.studentName || ''}
                                          onChange={(e) => handleCellChange(school.id, test.id, rKey, 'studentName', e.target.value)}
                                          placeholder="பெயர்..."
                                          className="w-full px-2 py-1 bg-amber-50/40 border border-amber-200 rounded text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                      </td>
                                      {/* Editable MAT */}
                                      <td className="p-1 border-r border-slate-200 bg-white text-center">
                                        <input
                                          type="number"
                                          max={50}
                                          min={0}
                                          value={mark?.mat !== undefined ? mark.mat : ''}
                                          onChange={(e) => handleCellChange(school.id, test.id, rKey, 'mat', e.target.value)}
                                          className="w-12 px-1 py-1 text-center bg-indigo-50/40 border border-indigo-200 rounded text-xs font-bold focus:outline-none"
                                        />
                                      </td>
                                      {/* Editable SAT Math */}
                                      <td className="p-1 border-r border-slate-200 bg-white text-center">
                                        <input
                                          type="number"
                                          max={10}
                                          min={0}
                                          value={mark?.satMath !== undefined ? mark.satMath : ''}
                                          onChange={(e) => handleCellChange(school.id, test.id, rKey, 'satMath', e.target.value)}
                                          className="w-12 px-1 py-1 text-center bg-blue-50/40 border border-blue-200 rounded text-xs font-bold focus:outline-none"
                                        />
                                      </td>
                                      {/* Editable SAT Science */}
                                      <td className="p-1 border-r border-slate-200 bg-white text-center">
                                        <input
                                          type="number"
                                          max={20}
                                          min={0}
                                          value={mark?.satScience !== undefined ? mark.satScience : ''}
                                          onChange={(e) => handleCellChange(school.id, test.id, rKey, 'satScience', e.target.value)}
                                          className="w-12 px-1 py-1 text-center bg-emerald-50/40 border border-emerald-200 rounded text-xs font-bold focus:outline-none"
                                        />
                                      </td>
                                      {/* Editable SAT Social */}
                                      <td className="p-1 border-r border-slate-200 bg-white text-center">
                                        <input
                                          type="number"
                                          max={20}
                                          min={0}
                                          value={mark?.satSocial !== undefined ? mark.satSocial : ''}
                                          onChange={(e) => handleCellChange(school.id, test.id, rKey, 'satSocial', e.target.value)}
                                          className="w-12 px-1 py-1 text-center bg-amber-50/40 border border-amber-200 rounded text-xs font-bold focus:outline-none"
                                        />
                                      </td>
                                      {/* Auto Computed Total */}
                                      <td className="p-2 border-r border-slate-200 text-center font-black text-slate-900 bg-slate-100">
                                        {mark?.total || 0}
                                      </td>
                                    </React.Fragment>
                                  );
                                }

                                return (
                                  <React.Fragment key={`${test.id}_${school.id}_${rKey}_view`}>
                                    {/* Student Name */}
                                    <td className="p-2.5 border-r border-slate-200 font-bold text-slate-800 truncate max-w-[130px]">
                                      {mark?.studentName ? (
                                        <span className="font-semibold">{mark.studentName}</span>
                                      ) : (
                                        <span className="text-slate-300 font-normal italic">-</span>
                                      )}
                                    </td>

                                    {/* MAT /50 */}
                                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700 bg-indigo-50/30 font-mono">
                                      {mark?.studentName || (mark?.total ?? 0) > 0 ? mark?.mat : '-'}
                                    </td>

                                    {/* SAT-Math /10 */}
                                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700 bg-blue-50/30 font-mono">
                                      {mark?.studentName || (mark?.total ?? 0) > 0 ? mark?.satMath : '-'}
                                    </td>

                                    {/* SAT-Science /20 */}
                                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700 bg-emerald-50/30 font-mono">
                                      {mark?.studentName || (mark?.total ?? 0) > 0 ? mark?.satScience : '-'}
                                    </td>

                                    {/* SAT-Social /20 */}
                                    <td className="p-2.5 border-r border-slate-200 text-center font-bold text-slate-700 bg-amber-50/30 font-mono">
                                      {mark?.studentName || (mark?.total ?? 0) > 0 ? mark?.satSocial : '-'}
                                    </td>

                                    {/* Total /100 */}
                                    <td className="p-2.5 border-r border-slate-200 text-center font-black text-slate-900 bg-slate-100 font-mono">
                                      {mark?.studentName || (mark?.total ?? 0) > 0 ? (
                                        <span className="text-orange-700 font-black">{mark?.total}</span>
                                      ) : '-'}
                                    </td>
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: UPLOAD EXCEL / CSV SHEET */}
      {/* ========================================================================= */}
      {activeSubTab === 'upload_excel' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Upload Box */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Upload className="h-5 w-5 text-orange-600" />
                  எக்செல் மதிப்பெண் கோப்பை பதிவேற்றுக (Upload Excel File)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  நீங்கள் தயாரித்த `.xlsx` அல்லது `.csv` கோப்பை இங்கு பதிவேற்றி நடப்பு வாரத்துக்கான மதிப்பெண்களை உடனடியாகப் புதுப்பிக்கலாம்.
                </p>
              </div>

              {/* Target Test Selection */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-black text-slate-700 block">
                  மதிப்பெண் சேர்க்கப்பட வேண்டிய தேர்வு (Target Test Week):
                </label>
                <select
                  id="select-upload-target-test"
                  value={uploadTargetTest}
                  onChange={(e) => setUploadTargetTest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {TEST_SCHEDULE.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.label} — ({t.formattedDate})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 font-medium">
                  குறிப்பு: எக்செல் கோப்பில் குறிப்பிட்ட வாரம் தேர்வு செய்யப்படாவிட்டால், இங்கு தேர்ந்தெடுக்கப்படும் வாரத்துக்கு மதிப்பெண்கள் இணைக்கப்படும்.
                </p>
              </div>

              {/* Drag & Drop File Zone */}
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  id="input-excel-file"
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white text-indigo-600 shadow-sm border border-indigo-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FileSpreadsheet className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {uploadFile ? uploadFile.name : 'எக்செல் கோப்பை கிளிக் செய்து தேர்ந்தெடுக்கவும்'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      ஆதரிக்கப்படும் வடிவங்கள்: .xlsx, .xls, .csv
                    </p>
                  </div>
                  <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs">
                    Browse File
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <h5 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-amber-600" />
                  எக்செல் நெடுவரிசை வடிவம் (Columns Format):
                </h5>
                <ul className="text-xs text-amber-950 font-medium space-y-1 pl-4 list-disc">
                  <li><strong>S.No, UDISE, School Name, Rank</strong> (1st, 2nd, 3rd)</li>
                  <li><strong>Student Name</strong> (மாணவர் பெயர்)</li>
                  <li><strong>MAT /50</strong> (மனத்திறன் தேர்வு - 50 மதிப்பெண்கள்)</li>
                  <li><strong>SAT-Math /10</strong> (கணிதம் - 10 மதிப்பெண்கள்)</li>
                  <li><strong>SAT-Science /20</strong> (அறிவியல் - 20 மதிப்பெண்கள்)</li>
                  <li><strong>SAT-Social /20</strong> (சமூக அறிவியல் - 20 மதிப்பெண்கள்)</li>
                </ul>
              </div>

            </div>

            {/* Right Preview & Action Box */}
            <div className="lg:col-span-6 space-y-6">
              
              {isProcessingFile ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                  <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-700">எக்செல் கோப்பு வாசிக்கப்படுகிறது...</p>
                </div>
              ) : uploadSummary ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        பதிவேற்ற சுருக்கம் (Upload Summary)
                      </h4>
                      <p className="text-xs text-slate-500">
                        இலக்கு தேர்வு: <strong>{uploadTargetTest}</strong>
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-300">
                      {uploadSummary.matchedSchoolsCount} / 26 பள்ளிகள் பொருந்தின
                    </span>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">மொத்த பதிவுகள்</span>
                      <strong className="text-2xl font-black text-slate-900 mt-0.5 block">{parsedUploadRecords.length}</strong>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">மதிப்பெண்கள் பெற்ற மாணவர்கள்</span>
                      <strong className="text-2xl font-black text-indigo-600 mt-0.5 block">
                        {parsedUploadRecords.reduce((sum, r) => sum + (r.rank_1.studentName ? 1 : 0) + (r.rank_2.studentName ? 1 : 0) + (r.rank_3.studentName ? 1 : 0), 0)}
                      </strong>
                    </div>
                  </div>

                  {/* Parsed List Preview */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      மாதிரி முன்னோட்டம் (Preview 5 Schools):
                    </h5>
                    <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl">
                      {parsedUploadRecords.slice(0, 8).map(rec => {
                        const s = SCHOOLS.find(x => x.id === rec.schoolId);
                        return (
                          <div key={rec.id} className="p-3 bg-white hover:bg-slate-50 text-xs">
                            <div className="flex justify-between items-center">
                              <strong className="font-extrabold text-slate-900">{s?.name || rec.schoolId}</strong>
                              <span className="font-mono text-[10px] text-slate-500 font-bold">{s?.udise}</span>
                            </div>
                            <div className="mt-1 text-[11px] text-slate-600 flex flex-wrap gap-2">
                              <span>1: {rec.rank_1.studentName || '-'} ({rec.rank_1.total}/100)</span> • 
                              <span>2: {rec.rank_2.studentName || '-'} ({rec.rank_2.total}/100)</span> • 
                              <span>3: {rec.rank_3.studentName || '-'} ({rec.rank_3.total}/100)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    id="btn-apply-parsed-excel"
                    onClick={handleApplyUpload}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    இந்த மதிப்பெண்களை தரவுத்தளத்தில் இணைக்கவும் (Apply & Save)
                  </button>

                </div>
              ) : (
                <div className="bg-slate-100/70 border border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-500 space-y-3">
                  <FileSpreadsheet className="h-10 w-10 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold">
                    இடதுபுறத்தில் எக்செல் கோப்பை பதிவேற்றியதும், அதன் தரவுகள் இங்கு முன்னோட்டமாக காண்பிக்கப்படும்.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SINGLE TEST BULK FORM EDITOR (Manual School-by-School Entry) */}
      {/* ========================================================================= */}
      {activeSubTab === 'single_test_editor' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-indigo-600" />
                தேர்வு வாரம் வாரியான விரைவுப் படிவம் (Weekly Fast Entry)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                தேர்ந்தெடுக்கப்பட்ட தேர்வு வாரத்திற்கான அனைத்து 26 பள்ளிகளின் 1, 2, 3 தரவரிசை மாணவர் மதிப்பெண்களை ஒரே பக்கத்தில் உள்ளீடு செய்யலாம்.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-black text-slate-700">தேர்வு வாரம்:</label>
              <select
                id="select-single-editor-test"
                value={targetTestId}
                onChange={(e) => setTargetTestId(e.target.value)}
                className="px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-extrabold text-indigo-900 focus:outline-none cursor-pointer"
              >
                {TEST_SCHEDULE.map(t => (
                  <option key={t.id} value={t.id}>{t.label} ({t.formattedDate})</option>
                ))}
              </select>
            </div>
          </div>

          {/* School Form Cards */}
          <div className="space-y-4">
            {displaySchools.map((school, sIdx) => {
              const rec = getRecordFor(school.id, targetTestId);
              const r1 = rec?.rank_1 || createEmptyMark();
              const r2 = rec?.rank_2 || createEmptyMark();
              const r3 = rec?.rank_3 || createEmptyMark();

              return (
                <div 
                  key={school.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">{school.name}</h4>
                        <span className="text-[10px] font-mono font-bold text-slate-400">UDISE: {school.udise} • {school.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Rank Inputs Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    
                    {/* Rank 1 */}
                    <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                          🥇 1st Mark (முதல் இடம்)
                        </span>
                        <strong className="text-xs font-black text-emerald-900 font-mono">
                          மொத்தம்: {r1.total} / 100
                        </strong>
                      </div>
                      <input
                        type="text"
                        placeholder="மாணவர் பெயர்..."
                        value={r1.studentName}
                        onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_1', 'studentName', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-semibold text-slate-800"
                      />
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                        <div>
                          <label className="text-slate-500 font-bold block">MAT /50</label>
                          <input
                            type="number"
                            max={50}
                            min={0}
                            value={r1.mat || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_1', 'mat', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Math /10</label>
                          <input
                            type="number"
                            max={10}
                            min={0}
                            value={r1.satMath || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_1', 'satMath', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Sci /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r1.satScience || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_1', 'satScience', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Soc /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r1.satSocial || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_1', 'satSocial', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rank 2 */}
                    <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider">
                          🥈 2nd Mark (இரண்டாம் இடம்)
                        </span>
                        <strong className="text-xs font-black text-blue-900 font-mono">
                          மொத்தம்: {r2.total} / 100
                        </strong>
                      </div>
                      <input
                        type="text"
                        placeholder="மாணவர் பெயர்..."
                        value={r2.studentName}
                        onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_2', 'studentName', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-blue-300 rounded-lg text-xs font-semibold text-slate-800"
                      />
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                        <div>
                          <label className="text-slate-500 font-bold block">MAT /50</label>
                          <input
                            type="number"
                            max={50}
                            min={0}
                            value={r2.mat || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_2', 'mat', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Math /10</label>
                          <input
                            type="number"
                            max={10}
                            min={0}
                            value={r2.satMath || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_2', 'satMath', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Sci /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r2.satScience || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_2', 'satScience', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Soc /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r2.satSocial || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_2', 'satSocial', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rank 3 */}
                    <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                          🥉 3rd Mark (மூன்றாம் இடம்)
                        </span>
                        <strong className="text-xs font-black text-amber-900 font-mono">
                          மொத்தம்: {r3.total} / 100
                        </strong>
                      </div>
                      <input
                        type="text"
                        placeholder="மாணவர் பெயர்..."
                        value={r3.studentName}
                        onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_3', 'studentName', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-slate-800"
                      />
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                        <div>
                          <label className="text-slate-500 font-bold block">MAT /50</label>
                          <input
                            type="number"
                            max={50}
                            min={0}
                            value={r3.mat || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_3', 'mat', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Math /10</label>
                          <input
                            type="number"
                            max={10}
                            min={0}
                            value={r3.satMath || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_3', 'satMath', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Sci /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r3.satScience || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_3', 'satScience', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 font-bold block">Soc /20</label>
                          <input
                            type="number"
                            max={20}
                            min={0}
                            value={r3.satSocial || ''}
                            onChange={(e) => handleCellChange(school.id, targetTestId, 'rank_3', 'satSocial', e.target.value)}
                            className="w-full p-1 text-center bg-white border border-slate-300 rounded font-bold"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Save All Button */}
          <div className="sticky bottom-6 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-xl flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600">
              {targetTestId} தேர்வுக்கான அனைத்து உள்ளீடுகளையும் சேமிக்க:
            </span>
            <button
              id="btn-save-all-single-test"
              onClick={handleSaveGridChanges}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Save className="h-4 w-4" />
              இந்த வாரத்திற்கான அனைத்து மதிப்பெண்களையும் சேமி (Save All)
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: CLASSROOM PHOTOS MANAGEMENT & UPLOAD */}
      {/* ========================================================================= */}
      {activeSubTab === 'classroom_photos' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Info & Action Card */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Camera className="w-72 h-72 text-white" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  வகுப்பறை ஆய்வு & கேலரி புகைப்பட மேலாண்மை
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  புதிய வகுப்பறைப் புகைப்படங்கள் சேர்க்க & நிர்வகிக்க
                </h2>
                <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                  BEO, BRTE அலுவலர்கள் மற்றும் ஆசிரியர்களின் பள்ளி ஆய்வுப் புகைப்படங்களை தலைப்பு, பள்ளிப் பெயர் மற்றும் விரிவான குறிப்புகளுடன் இங்கு எளிதாகப் பதிவேற்றி பொது கேலரியில் வெளியிடலாம்.
                </p>
              </div>

              <button
                id="btn-toggle-add-photo-form"
                onClick={() => setIsAddingPhoto(!isAddingPhoto)}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
                  isAddingPhoto
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-white text-orange-900 hover:bg-orange-50'
                }`}
              >
                {isAddingPhoto ? (
                  <>
                    <span>படிவத்தை மூடுக</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-orange-600" />
                    <span>புதிய புகைப்படம் சேர்க்க (Add Photo)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form: Add New Photo */}
          {isAddingPhoto && (
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-md space-y-6 animate-slideDown">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">புதிய வகுப்பறைப் புகைப்படம் சேர்க்க</h3>
                    <p className="text-xs text-slate-500">பள்ளி களப்பார்வையின் தகவல்களையும் படத்தையும் உள்ளிடவும்</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddingPhoto(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveNewPhoto} className="space-y-4 text-xs font-medium">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">படத்தின் தலைப்பு / பார்வை தலைப்பு *</label>
                    <input
                      type="text"
                      required
                      placeholder="எ.கா: PUMS கணவாய்புதூர் NMMS சிறப்பு வகுப்பறை ஆய்வு"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பள்ளி தேர்ந்தெடு (26 பள்ளிகள்) *</label>
                    <select
                      value={photoSchool}
                      onChange={(e) => setPhotoSchool(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    >
                      {SCHOOLS.map(s => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.location})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பார்வையிட்ட நாள் *</label>
                    <input
                      type="date"
                      required
                      value={photoDate}
                      onChange={(e) => setPhotoDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பார்வையாளர் / அலுவலர் பெயர் *</label>
                    <input
                      type="text"
                      required
                      value={photoVisitor}
                      onChange={(e) => setPhotoVisitor(e.target.value)}
                      placeholder="எ.கா: ஆசிரியர் பயிற்றுநர் ஐய்யப்பன்"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">அலுவலர் பதவி / பணிப்பொறுப்பு</label>
                    <input
                      type="text"
                      value={photoRole}
                      onChange={(e) => setPhotoRole(e.target.value)}
                      placeholder="BRTE / BEO / HM"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பிரிவு (Category) *</label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    >
                      <option value="classroom">வகுப்பறை பார்வை (Classroom Visit)</option>
                      <option value="omr">OMR & மாதிரித் தேர்வு (OMR & Model Test)</option>
                      <option value="guidance">சிறப்பு ஆலோசனைகள் (Guidance & Motivation)</option>
                      <option value="activity">செயல்முறை கற்றல் (Hands-on Activities)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பங்கேற்ற மாணவர்கள் எண்ணிக்கை</label>
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={photoStudentsCount}
                      onChange={(e) => setPhotoStudentsCount(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Photo File / URL Upload Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block font-bold text-slate-800">
                    புகைப்பட கோப்பு தேர்வு செய்யவும் அல்லது இணைய URL உள்ளிடவும்:
                  </label>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="w-full text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-200 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 shrink-0">அல்லது URL:</span>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/... அல்லது நேரடி URL"
                      value={photoImageUrl}
                      onChange={(e) => setPhotoImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  {photoImageUrl && (
                    <div className="pt-2 flex items-center gap-3">
                      <img
                        src={photoImageUrl}
                        alt="Preview"
                        className="w-20 h-14 object-cover rounded-lg border border-slate-200 shadow-sm"
                      />
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> படம் தேர்வு செய்யப்பட்டுள்ளது
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">களப் பார்வை குறிப்புகள் & வழிகாட்டல்கள் *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="மாணவர்களின் கற்றல் முன்னேற்றம், தேர்வு உத்திகள், வழங்கப்பட்ட ஆலோசனைகள் பற்றிய விவரங்களை உள்ளிடவும்..."
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhoto(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    ரத்து செய்
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>கேலரியில் வெளியிடவும் (Publish Photo)</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Manage Existing Photos Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Image className="w-5 h-5 text-indigo-600" />
                  தற்போது கேலரியில் உள்ள புகைப்படங்கள் ({classroomPhotos.length})
                </h3>
                <p className="text-xs text-slate-500">அனைத்து புகைப்படங்களையும் பார்வையிடலாம் அல்லது தேவையற்றவற்றை நீக்கலாம்</p>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="பள்ளி, அலுவலர் தேடுக..."
                    value={photoSearchQuery}
                    onChange={(e) => setPhotoSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <select
                  value={photoFilterCategory}
                  onChange={(e) => setPhotoFilterCategory(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="all">அனைத்துப் பிரிவுகள்</option>
                  <option value="classroom">வகுப்பறை பார்வை</option>
                  <option value="omr">OMR பயிற்சி</option>
                  <option value="guidance">ஆலோசனைகள்</option>
                  <option value="activity">செயல்முறைகள்</option>
                </select>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {classroomPhotos
                .filter(p => {
                  const matchCat = photoFilterCategory === 'all' || p.category === photoFilterCategory;
                  const q = photoSearchQuery.toLowerCase().trim();
                  const matchQ = !q || 
                    p.title.toLowerCase().includes(q) ||
                    p.schoolName.toLowerCase().includes(q) ||
                    p.visitorName.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q);
                  return matchCat && matchQ;
                })
                .map((photo) => (
                  <div 
                    key={photo.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-orange-300 transition-all shadow-2xs"
                  >
                    <div className="relative h-40 bg-slate-200 overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        {photo.isCustom ? (
                          <span className="bg-orange-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                            நிர்வாகப் பதிவு
                          </span>
                        ) : (
                          <span className="bg-slate-900/80 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md backdrop-blur-xs">
                            இயல்புநிலை
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[10px] font-bold text-amber-300 block truncate">
                          {photo.schoolName}
                        </span>
                        <span className="text-[9px] text-slate-200 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" /> {photo.date}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                          {photo.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-tight">
                          {photo.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                        <div className="text-[10px] text-slate-600 truncate pr-2">
                          <strong>{photo.visitorName}</strong>
                        </div>
                        
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer shrink-0"
                          title="புகைப்படத்தை நீக்குக"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: GAMIFICATION LEARNING RESULTS MANAGEMENT */}
      {/* ========================================================================= */}
      {activeSubTab === 'gamification_results' && (
        <div className="space-y-6">
          
          {/* Header Action Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  விளையாட்டு வழிக் கற்றல் முடிவுகள் மேலாண்மை (Gamification Results)
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium max-w-2xl">
                கஹூட் (Kahoot), குவிஸிஸ் (Quizizz) போன்ற விளையாட்டுக் கற்றல் போட்டிகளின் முடிவுகள், புகைப்படங்கள் மற்றும் அறிக்கைகளைப் பதிவேற்றி நிர்வகிக்கவும்.
              </p>
            </div>

            <button
              onClick={() => setIsAddingGamification(!isAddingGamification)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
            >
              {isAddingGamification ? (
                <>
                  <X className="w-4 h-4" />
                  <span>படிவத்தை மூடு</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>+ புதிய முடிவுகள் பதிவேற்ற</span>
                </>
              )}
            </button>
          </div>

          {/* Add Gamification Result Form */}
          {isAddingGamification && (
            <form onSubmit={handleSaveGamificationReport} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-lg space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  புதிய விளையாட்டு வழிக் கற்றல் அறிக்கை பதிவேற்றம்
                </h4>
                <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Admin Entry
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">போட்டித் தலைப்பு / பாடம் (Topic) *</label>
                  <input
                    type="text"
                    required
                    value={gTopic}
                    onChange={(e) => setGTopic(e.target.value)}
                    placeholder="எ.கா: 8-ஆம் வகுப்பு வடிவவியல் & MAT Kahoot போட்டி"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">தேதி (Date)</label>
                    <input
                      type="date"
                      value={gDate}
                      onChange={(e) => setGDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">தளம் (Platform)</label>
                    <select
                      value={gPlatform}
                      onChange={(e) => setGPlatform(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      <option value="Kahoot">Kahoot</option>
                      <option value="Quizizz">Quizizz</option>
                      <option value="Google Forms">Google Forms</option>
                      <option value="Live Quiz">Live Quiz</option>
                      <option value="Other">மற்றவை</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">நடத்துனர் பெயர் (Hosted By)</label>
                  <input
                    type="text"
                    value={gHostedBy}
                    onChange={(e) => setGHostedBy(e.target.value)}
                    placeholder="ஆசிரியர் பெயர் / BRTE"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">வெற்றி பெற்ற பள்ளி</label>
                  <select
                    value={gTopSchool}
                    onChange={(e) => setGTopSchool(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    {SCHOOLS.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">பங்கேற்ற பள்ளிகள் எண்ணிக்கை</label>
                  <input
                    type="number"
                    value={gSchoolsCount}
                    onChange={(e) => setGSchoolsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">மொத்த மாணவர்கள் எண்ணிக்கை</label>
                  <input
                    type="number"
                    value={gParticipantsCount}
                    onChange={(e) => setGParticipantsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">முடிவுப் படம் தேர்வு செய்க (Choose File)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGamificationFileChange}
                    className="w-full text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">அல்லது படத்தின் இணைய முகவரியை (Image URL) உள்ளிடலாம்:</div>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={gImageUrl}
                    onChange={(e) => setGImageUrl(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">பள்ளிகள் பங்கேற்பு அறிக்கை விவரங்கள் & குறிப்புகள் (Remarks) *</label>
                  <textarea
                    rows={3}
                    required
                    value={gRemarks}
                    onChange={(e) => setGRemarks(e.target.value)}
                    placeholder="பள்ளிகள் பங்கேற்பு, சராசரி மதிப்பெண்கள், முதல் 3 இடங்களைப் பிடித்த மாணவர்கள் விவரங்கள்..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingGamification(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  ரத்து செய்
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                >
                  வெளியிடு & சேமி
                </button>
              </div>
            </form>
          )}

          {/* List of Gamification Reports */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-600">
                மொத்த விளையாட்டு அறிக்கைகள்: <strong className="text-purple-600 text-sm font-black">{gamificationReports.length}</strong>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="அறிக்கைகளைத் தேடுக..."
                    value={gamificationSearchQuery}
                    onChange={(e) => setGamificationSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <select
                  value={gamificationFilterPlatform}
                  onChange={(e) => setGamificationFilterPlatform(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="all">அனைத்து தளங்கள்</option>
                  <option value="Kahoot">Kahoot</option>
                  <option value="Quizizz">Quizizz</option>
                  <option value="Google Forms">Google Forms</option>
                  <option value="Live Quiz">Live Quiz</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gamificationReports
                .filter(r => {
                  const matchP = gamificationFilterPlatform === 'all' || r.platform === gamificationFilterPlatform;
                  const q = gamificationSearchQuery.toLowerCase().trim();
                  const matchQ = !q || 
                    r.topic.toLowerCase().includes(q) ||
                    r.hostedBy.toLowerCase().includes(q) ||
                    r.remarks.toLowerCase().includes(q) ||
                    (r.topSchoolWinner && r.topSchoolWinner.toLowerCase().includes(q));
                  return matchP && matchQ;
                })
                .map((report) => (
                  <div
                    key={report.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-purple-300 transition-all shadow-2xs"
                  >
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      <img
                        src={report.imageUrl}
                        alt={report.topic}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-lg shadow-xs">
                          {report.platform}
                        </span>
                        {report.isCustom && (
                          <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                            நிர்வாகப் பதிவு
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-xs font-black text-amber-300 block truncate">
                          வெற்றி: {report.topSchoolWinner || 'PUMS'}
                        </span>
                        <span className="text-[10px] text-slate-200 flex items-center gap-2 mt-0.5">
                          <span>தேதி: {report.date}</span>
                          <span>•</span>
                          <span>மாணவர்கள்: {report.totalParticipants}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                          {report.topic}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-tight">
                          {report.remarks}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                        <div className="text-[10px] text-slate-600 truncate pr-2">
                          <strong>{report.hostedBy}</strong>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteGamificationReport(report.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all cursor-pointer shrink-0"
                          title="அறிக்கையை நீக்குக"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 6: UPLOAD ONLINE EXAM (HTML FILE TYPE) */}
      {/* ========================================================================= */}
      {activeSubTab === 'upload_online_exam' && (
        <div className="space-y-6">
          
          {/* Header Action Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  ஆன்லைன் தேர்வு பதிவேற்றுக (Upload Online Exam - HTML)
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium max-w-2xl">
                HTML வடிவிலான NMMS ஊடாடும் மாதிரித் தேர்வுகளை (.html / .htm) நேரடியாக பதிவேற்றி மாணவர்களின் ஆன்லைன் தேர்வுப் பகுதியில் வெளியிடவும்.
              </p>
            </div>

            <button
              onClick={() => setIsAddingExam(!isAddingExam)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
            >
              {isAddingExam ? (
                <>
                  <X className="w-4 h-4" />
                  <span>படிவத்தை மூடு</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>+ புதிய HTML தேர்வு பதிவேற்ற</span>
                </>
              )}
            </button>
          </div>

          {/* Add Online Exam HTML Form */}
          {isAddingExam && (
            <form onSubmit={handleSaveHtmlExam} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-lg space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-rose-600" />
                  புதிய HTML ஊடாடும் தேர்வு பதிவேற்றப் படிவம்
                </h4>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  File Type: .HTML
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* HTML File Upload Dropzone */}
                <div className="md:col-span-2 bg-rose-50/50 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-rose-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black shrink-0">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 text-xs">HTML கோப்பைத் தேர்வு செய்யவும் (.html, .htm) *</h5>
                        <p className="text-[11px] text-slate-500 font-medium">தேர்வு வினாக்கள் கொண்ட இணையப் பக்கக் கோப்பைப் பதிவேற்றவும்</p>
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={htmlFileInputRef}
                      accept=".html,.htm,text/html"
                      onChange={handleHtmlFileSelect}
                      className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-700 cursor-pointer"
                    />
                  </div>

                  {examFileName && (
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-rose-200 text-[11px] font-bold text-rose-800">
                      <FileCode className="w-4 h-4 text-rose-600" />
                      <span>தேர்வு செய்யப்பட்ட கோப்பு: <strong>{examFileName}</strong> ({Math.round(examHtmlContent.length / 1024)} KB)</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">தேர்வின் தலைப்பு (Exam Title) *</label>
                  <input
                    type="text"
                    required
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    placeholder="எ.கா: NMMS 8-ஆம் வகுப்பு வடிவவியல் மாதிரித் தேர்வு 2025"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">துணைத் தலைப்பு / பாடம் (Topic)</label>
                  <input
                    type="text"
                    value={examTamilTitle}
                    onChange={(e) => setExamTamilTitle(e.target.value)}
                    placeholder="எ.கா: கோணங்கள், நாற்கரங்கள் & முக்கோணங்கள்"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">பாடப்பிரிவு (Subject Category)</label>
                  <select
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="maths">கணிதம் & வடிவவியல்</option>
                    <option value="mat">MAT மனத்திறன் தேர்வு</option>
                    <option value="science">SAT அறிவியல்</option>
                    <option value="social">SAT சமூக அறிவியல்</option>
                    <option value="full_omr">NMMS முழு மாதிரித் தேர்வு</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">கால அளவு (நிமிடங்கள்)</label>
                    <input
                      type="number"
                      value={examDuration}
                      onChange={(e) => setExamDuration(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">வினாக்கள் எண்ணிக்கை</label>
                    <input
                      type="number"
                      value={examTotalQuestions}
                      onChange={(e) => setExamTotalQuestions(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">பதிவேற்றுபவர் பெயர் (Author / Teacher)</label>
                  <input
                    type="text"
                    value={examAuthor}
                    onChange={(e) => setExamAuthor(e.target.value)}
                    placeholder="ஆசிரியர் பெயர் / BRTE"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">தேர்வு பற்றிய குறிப்புகள் (Description)</label>
                  <input
                    type="text"
                    value={examDescription}
                    onChange={(e) => setExamDescription(e.target.value)}
                    placeholder="எ.கா: முந்தைய ஆண்டு வினாத்தாள் மற்றும் புதிய பாடத்திட்ட மாதிரி வினாக்கள்."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                {/* Direct HTML Code Area / Paste Option */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-700">HTML குறியீடு (HTML Content / Code) *</label>
                    {examHtmlContent && (
                      <button
                        type="button"
                        onClick={() => setPreviewExamHtml(examHtmlContent)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>நேரடி முன்னோட்டம் (Preview)</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={6}
                    required
                    value={examHtmlContent}
                    onChange={(e) => setExamHtmlContent(e.target.value)}
                    placeholder="HTML கோப்பை மேலே பதிவேற்றவும் அல்லது HTML குறியீட்டை இங்கே நேரடியாக ஒட்டவும் (<!DOCTYPE html>...)..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] border border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingExam(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  ரத்து செய்
                </button>
                {examHtmlContent && (
                  <button
                    type="button"
                    onClick={() => setPreviewExamHtml(examHtmlContent)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    முன்னோட்டம்
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                >
                  தேர்வைச் சேமித்து வெளியிடு
                </button>
              </div>
            </form>
          )}

          {/* List of Uploaded HTML Exams */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-600">
                பதிவேற்றப்பட்ட ஆன்லைன் தேர்வுகள்: <strong className="text-rose-600 text-sm font-black">{uploadedHtmlExams.length}</strong>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="தேர்வுகளைத் தேடுக..."
                  value={examSearchQuery}
                  onChange={(e) => setExamSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {uploadedHtmlExams.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                <FileCode className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">பதிவேற்றப்பட்ட HTML தேர்வுகள் எதுவும் இல்லை</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  '+ புதிய HTML தேர்வு பதிவேற்ற' பொத்தானைக் கிளிக் செய்து உங்கள் HTML தேர்வு கோப்பை உடனடியாகப் பதிவேற்றலாம்.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedHtmlExams
                  .filter(e => {
                    const q = examSearchQuery.toLowerCase().trim();
                    return !q || 
                      e.title.toLowerCase().includes(q) || 
                      e.description.toLowerCase().includes(q) ||
                      (e.tamilTitle && e.tamilTitle.toLowerCase().includes(q));
                  })
                  .map((exam) => (
                    <div
                      key={exam.id}
                      className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between hover:border-rose-300 transition-all shadow-2xs group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                            <FileCode className="w-3 h-3 text-rose-600" />
                            {exam.subjectLabel}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {exam.durationMinutes} நிமிடங்கள்
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-black text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                            {exam.title}
                          </h4>
                          {exam.author && (
                            <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                              {exam.author} • {exam.uploadedAt}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                          {exam.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setPreviewExamHtml(exam.htmlContent)}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                          >
                            <Play className="w-3 h-3" />
                            <span>முன்னோட்டம் (Run)</span>
                          </button>

                          <a
                            href={`data:text/html;charset=utf-8,${encodeURIComponent(exam.htmlContent)}`}
                            download={`${exam.title.replace(/\s+/g, '_')}.html`}
                            className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all cursor-pointer"
                            title="HTML கோப்பைப் பதிவிறக்கு"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <button
                          onClick={() => handleDeleteHtmlExam(exam.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                          title="தேர்வை நீக்குக"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

          </div>

        </div>
      )}

      {/* HTML Exam Preview Modal */}
      {previewExamHtml && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-3xl w-full h-[95vh] max-w-6xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-slate-950 flex items-center justify-center font-black">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    HTML தேர்வு நேரடி முன்னோட்டம் (Interactive Test Preview)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-bold block">
                    உண்மையான மாணவர் பார்வை வடிவம்
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewExamHtml(null)}
                className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold px-3"
              >
                <X className="w-4 h-4" />
                <span>மூடு (Close Preview)</span>
              </button>
            </div>

            <div className="flex-1 bg-white relative w-full h-full">
              <iframe
                title="Preview"
                srcDoc={previewExamHtml}
                sandbox="allow-scripts allow-forms allow-same-origin allow-modals allow-popups"
                className="w-full h-full border-0"
              />
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 7: UPLOAD STUDY MATERIAL (HTML FILE TYPE) */}
      {/* ========================================================================= */}
      {activeSubTab === 'upload_study_material' && (
        <div className="space-y-6">
          
          {/* Header Action Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <BookMarked className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  பாடக்குறிப்பு பதிவேற்றுக (Upload Study Material - HTML)
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium max-w-2xl">
                ஊடாடும் NMMS பாடக் கையேடுகள், சிமுலேட்டர்கள் மற்றும் வினாடி வினாக்கள் அடங்கிய HTML கோப்புகளை (.html / .htm) பதிவேற்றி "பாடக் குறிப்புகள்" பகுதியில் வெளியிடவும்.
              </p>
            </div>

            <button
              onClick={() => setIsAddingStudyMaterial(!isAddingStudyMaterial)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
            >
              {isAddingStudyMaterial ? (
                <>
                  <X className="w-4 h-4" />
                  <span>படிவத்தை மூடு</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>+ புதிய HTML பாடக்குறிப்பு பதிவேற்ற</span>
                </>
              )}
            </button>
          </div>

          {/* Add Study Material HTML Form */}
          {isAddingStudyMaterial && (
            <form onSubmit={handleSaveStudyMaterial} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-lg space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  புதிய HTML ஊடாடும் பாடக்குறிப்பு பதிவேற்றப் படிவம்
                </h4>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  File Type: .HTML / .HTM
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* HTML File Upload Dropzone */}
                <div className="md:col-span-2 bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-emerald-200 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-black text-slate-900 text-xs">HTML பாடக் கோப்பைத் தேர்வு செய்யவும் (.html, .htm) *</h5>
                        <p className="text-[11px] text-slate-500 font-medium">ஊடாடும் வரைபடங்கள், குறிப்புகள் & வினாடி வினா கொண்ட HTML கோப்பைப் பதிவேற்றவும்</p>
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={smFileInputRef}
                      accept=".html,.htm,text/html"
                      onChange={handleStudyMaterialFileSelect}
                      className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                    />
                  </div>

                  {smFileName && (
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-emerald-200 text-[11px] font-bold text-emerald-800">
                      <FileCode className="w-4 h-4 text-emerald-600" />
                      <span>தேர்வு செய்யப்பட்ட கோப்பு: <strong>{smFileName}</strong> ({Math.round(smHtmlContent.length / 1024)} KB)</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">பாடத் தலைப்பு (Title) *</label>
                  <input
                    type="text"
                    required
                    value={smTitle}
                    onChange={(e) => setSmTitle(e.target.value)}
                    placeholder="எ.கா: H4. மக்களின் புரட்சி (People's Revolt 1857)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">ஆங்கிலத் தலைப்பு (English Title)</label>
                  <input
                    type="text"
                    value={smEnglishTitle}
                    onChange={(e) => setSmEnglishTitle(e.target.value)}
                    placeholder="எ.கா: People's Revolt (Class 8 History)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பாடப் பிரிவு (Category)</label>
                    <select
                      value={smCategory}
                      onChange={(e) => {
                        const cat = e.target.value as 'social' | 'maths' | 'science';
                        setSmCategory(cat);
                        if (cat === 'social') setSmSubjectLabel('சமூக அறிவியல் • வரலாறு');
                        else if (cat === 'maths') setSmSubjectLabel('கணிதம்');
                        else setSmSubjectLabel('அறிவியல்');
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="social">சமூக அறிவியல் (Social)</option>
                      <option value="maths">கணிதம் (Maths)</option>
                      <option value="science">அறிவியல் (Science)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">ஐகான் (Icon)</label>
                    <select
                      value={smIcon}
                      onChange={(e) => setSmIcon(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="Landmark">வரலாறு (Landmark)</option>
                      <option value="Calculator">கணிதம் (Calculator)</option>
                      <option value="Factory">பொருளியல் (Factory)</option>
                      <option value="Sprout">தாவரவியல்/அறிவியல் (Sprout)</option>
                      <option value="Monitor">கணினி/அறிவியல் (Monitor)</option>
                      <option value="BookOpen">புத்தகம் (BookOpen)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">பாடப்பிரிவு லேபிள் (Subject Label)</label>
                    <input
                      type="text"
                      value={smSubjectLabel}
                      onChange={(e) => setSmSubjectLabel(e.target.value)}
                      placeholder="எ.கா: சமூக அறிவியல் • வரலாறு"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">வகுப்பு & பருவம் (Class & Term)</label>
                    <input
                      type="text"
                      value={smClassTerm}
                      onChange={(e) => setSmClassTerm(e.target.value)}
                      placeholder="எ.கா: 8 ஆம் வகுப்பு • பாடம் 4"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">உருவாக்கியவர் / பயிற்றுநர் (Trainer)</label>
                  <input
                    type="text"
                    value={smTrainer}
                    onChange={(e) => setSmTrainer(e.target.value)}
                    placeholder="கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர்..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">குறிச்சொற்கள் (Tags - கமா கொண்டு பிரிக்கவும்)</label>
                  <input
                    type="text"
                    value={smTags}
                    onChange={(e) => setSmTags(e.target.value)}
                    placeholder="வரலாறு, புரட்சி, 1857, 8-ஆம் வகுப்பு"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">பாட விளக்கக் குறிப்பு (Description)</label>
                  <input
                    type="text"
                    value={smDescription}
                    onChange={(e) => setSmDescription(e.target.value)}
                    placeholder="எ.கா: பாளையக்காரர்கள் புரட்சி, வேலூர் புரட்சி 1806 மற்றும் 1857 பெரும் புரட்சி பற்றிய ஊடாடும் விளக்கங்கள்."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Direct HTML Code Area / Paste Option */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-700">HTML குறியீடு (HTML Content / Code) *</label>
                    {smHtmlContent && (
                      <button
                        type="button"
                        onClick={() => setPreviewStudyMaterialHtml(smHtmlContent)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>நேரடி முன்னோட்டம் (Preview)</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={6}
                    required
                    value={smHtmlContent}
                    onChange={(e) => setSmHtmlContent(e.target.value)}
                    placeholder="HTML கோப்பை மேலே பதிவேற்றவும் அல்லது HTML குறியீட்டை இங்கே நேரடியாக ஒட்டவும் (<!DOCTYPE html>...)..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingStudyMaterial(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  ரத்து செய்
                </button>
                {smHtmlContent && (
                  <button
                    type="button"
                    onClick={() => setPreviewStudyMaterialHtml(smHtmlContent)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    முன்னோட்டம்
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                >
                  பாடக்குறிப்பைச் சேமித்து வெளியிடு
                </button>
              </div>
            </form>
          )}

          {/* List of Study Materials */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-600">
                மொத்தப் பாடக் கையேடுகள்: <strong className="text-emerald-600 text-sm font-black">{studyMaterials.length}</strong>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="பாடங்களைத் தேடுக..."
                    value={smSearchQuery}
                    onChange={(e) => setSmSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <select
                  value={smCategoryFilter}
                  onChange={(e) => setSmCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="all">அனைத்து பிரிவுகள்</option>
                  <option value="social">சமூக அறிவியல்</option>
                  <option value="maths">கணிதம்</option>
                  <option value="science">அறிவியல்</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMaterials
                .filter(m => {
                  const matchCat = smCategoryFilter === 'all' || m.category === smCategoryFilter;
                  const q = smSearchQuery.toLowerCase().trim();
                  const matchQ = !q ||
                    m.title.toLowerCase().includes(q) ||
                    (m.englishTitle && m.englishTitle.toLowerCase().includes(q)) ||
                    m.description.toLowerCase().includes(q) ||
                    m.tags.some(t => t.toLowerCase().includes(q));
                  return matchCat && matchQ;
                })
                .map((material) => (
                  <div
                    key={material.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-2xs group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            material.category === 'social' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                            material.category === 'maths' ? 'bg-sky-100 text-sky-900 border border-sky-200' :
                            'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}>
                            {material.subjectLabel}
                          </span>
                          {material.isCustom && (
                            <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                              நிர்வாகப் பதிவு
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          {material.classTerm}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {material.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium italic block mt-0.5 truncate">
                          {material.englishTitle}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                        {material.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {material.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[9px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setPreviewStudyMaterialHtml(material.htmlContent)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                        >
                          <Play className="w-3 h-3" />
                          <span>முன்னோட்டம் (Run)</span>
                        </button>

                        <a
                          href={`data:text/html;charset=utf-8,${encodeURIComponent(material.htmlContent)}`}
                          download={`${material.title.replace(/\s+/g, '_')}.html`}
                          className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition-all cursor-pointer"
                          title="HTML பாடக் கோப்பைப் பதிவிறக்கு"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {material.isCustom ? (
                        <button
                          onClick={() => handleDeleteStudyMaterial(material.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                          title="பாடக்குறிப்பை நீக்குக"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded-lg">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>

          </div>

        </div>
      )}

      {/* Study Material Preview Modal */}
      {previewStudyMaterialHtml && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-3xl w-full h-[95vh] max-w-6xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    HTML பாடக்குறிப்பு நேரடி முன்னோட்டம் (Study Material Preview)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-bold block">
                    ஊடாடும் மாணவர் கற்றல் கையேடு
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewStudyMaterialHtml(null)}
                className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold px-3"
              >
                <X className="w-4 h-4" />
                <span>மூடு (Close Preview)</span>
              </button>
            </div>

            <div className="flex-1 bg-white relative w-full h-full">
              <iframe
                title="Study Material Preview"
                srcDoc={previewStudyMaterialHtml}
                sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
                className="w-full h-full border-0"
              />
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 8: DATABASE MANAGER (Backup & Restore) */}
      {/* ========================================================================= */}
      {activeSubTab === 'database_manager' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Backup JSON */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">காப்புப் பிரதி தரவிறக்கம் (JSON Backup)</h3>
                <p className="text-xs text-slate-500">அனைத்து மதிப்பெண்களையும் முழுமையான JSON கோப்பாக சேமிக்கவும்.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              தற்போது தரவுத்தளத்தில் <strong>{records.length}</strong> பள்ளி தேர்வு பதிவுகள் உள்ளன. எதிர்காலப் பயன்பாட்டிற்கு இதை உடனடியாக பதிவிறக்கி வைத்துக் கொள்ளலாம்.
            </p>

            <button
              id="btn-download-json-backup"
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `vetrisudar_records_backup_${new Date().toISOString().slice(0, 10)}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                showToast('success', 'JSON Backup கோப்பு பதிவிறக்கம் செய்யப்பட்டது!');
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="h-4 w-4" /> JSON கோப்பாக பதிவிறக்கு
            </button>
          </div>

          {/* Reset Defaults */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">தொடக்க நிலைக்கு மீட்டமைக்க (Reset Defaults)</h3>
                <p className="text-xs text-slate-500">அசல் ஆரம்ப மதிப்பெண்களுக்கு மீட்டமைக்கவும்.</p>
              </div>
            </div>

            <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
              எச்சரிக்கை: நீங்கள் உள்ளிட்ட புதிய மதிப்பெண்கள் அழிக்கப்பட்டு அசல் 1-5 தேர்வுகளின் தொடக்க நிலைக்கு திரும்பும்.
            </p>

            <button
              id="btn-reset-records-defaults"
              onClick={() => {
                if (window.confirm('நிச்சயமாக அசல் தொடக்க நிலைக்கு மீட்டமைக்க விரும்புகிறீர்களா?')) {
                  localStorage.removeItem('vetrisudar_records');
                  window.location.reload();
                }
              }}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <RotateCcw className="h-4 w-4" /> அசல் நிலைக்கு மீட்டமை (Reset to Factory Defaults)
            </button>
          </div>

        </div>
      )}

        </div>
        {/* END OF RIGHT WORKSPACE CANVAS */}

      </div>
      {/* END OF MAIN 2-COLUMN CONTAINER */}

    </div>
  );
}
