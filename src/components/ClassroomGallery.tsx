import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  Search, 
  Filter, 
  Upload, 
  Calendar, 
  School as SchoolIcon, 
  UserCheck, 
  X, 
  Maximize2, 
  Download, 
  Plus, 
  Sparkles,
  CheckCircle2,
  Tag,
  Share2,
  Info
} from 'lucide-react';
import { SCHOOLS } from '../types';

export interface ClassroomPhoto {
  id: string;
  title: string;
  schoolName: string;
  date: string;
  visitorName: string;
  visitorRole: string;
  category: 'classroom' | 'omr' | 'guidance' | 'activity';
  imageUrl: string;
  description: string;
  studentsCount?: number;
  isCustom?: boolean;
}

export const INITIAL_PHOTOS: ClassroomPhoto[] = [];

export function getStoredClassroomPhotos(): ClassroomPhoto[] {
  try {
    const saved = localStorage.getItem('nmms_classroom_photos');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter((p: ClassroomPhoto) => p.isCustom && !p.id.startsWith('photo_'));
      }
    }
  } catch (e) {
    console.error('Failed to parse saved photos', e);
  }
  return [];
}

export default function ClassroomGallery() {
  const [photos, setPhotos] = useState<ClassroomPhoto[]>(getStoredClassroomPhotos);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhoto, setActivePhoto] = useState<ClassroomPhoto | null>(null);

  // Listen for photo updates from Admin Portal
  React.useEffect(() => {
    const handleStorageChange = () => {
      setPhotos(getStoredClassroomPhotos());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('nmms_photos_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('nmms_photos_updated', handleStorageChange);
    };
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        photo.title.toLowerCase().includes(q) ||
        photo.schoolName.toLowerCase().includes(q) ||
        photo.visitorName.toLowerCase().includes(q) ||
        photo.description.toLowerCase().includes(q);
      
      return matchesCategory && matchesSearch;
    });
  }, [photos, selectedCategory, searchQuery]);

  const getCategoryBadge = (category: ClassroomPhoto['category']) => {
    switch (category) {
      case 'classroom':
        return { label: 'வகுப்பறை பார்வை', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'omr':
        return { label: 'OMR பயிற்சி', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'guidance':
        return { label: 'சிறப்பு ஆலோசனைகள்', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'activity':
        return { label: 'செயல்முறை கற்றல்', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <Camera className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-200" />
            காடையாம்பட்டி ஒன்றியம் - NMMS நேரடி களப் பார்வையிடல்
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            NMMS வகுப்பறை பார்வைகள் புகைப்படக் கேலரி
          </h1>

          <p className="text-sm md:text-base text-orange-100 font-medium leading-relaxed">
            வட்டாரக் கல்வி அலுவலர்கள் (BEOs), வட்டார வளமைய மேற்பார்வையாளர் மற்றும் ஆசிரியர் பயிற்றுநர்களின் (BRTEs) பள்ளி வகுப்பறைப் பார்வைகள், OMR மாதிரி தேர்வு கண்காணிப்பு மற்றும் மாணவர் கலந்துரையாடல்களின் புகைப்படப் பதிவுகள்.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <Camera className="w-4 h-4 text-amber-300" />
              <span>மொத்த படங்கள்: {photos.length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <SchoolIcon className="w-4 h-4 text-amber-300" />
              <span>பள்ளிகள்: {new Set(photos.map(p => p.schoolName)).size}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>கள ஆய்வுகள்: {photos.length > 0 ? `${photos.length} பதிவுகள்` : 'பதிவுகள் இல்லை'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Actions */}
      <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              அனைத்தும் ({photos.length})
            </button>
            <button
              onClick={() => setSelectedCategory('classroom')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'classroom'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              வகுப்பறை பார்வைகள்
            </button>
            <button
              onClick={() => setSelectedCategory('omr')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'omr'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              OMR & மாதிரித் தேர்வு
            </button>
            <button
              onClick={() => setSelectedCategory('guidance')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'guidance'
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              ஆலோசனைகள்
            </button>
            <button
              onClick={() => setSelectedCategory('activity')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'activity'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              செயல்முறைகள்
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="பள்ளி, அலுவலர் அல்லது விவரம் தேடுக..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
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

      {/* Photo Cards List View */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {photos.length === 0 ? 'வகுப்பறைப் புகைப்படங்கள் எதுவும் இதுவரை பதிவேற்றப்படவில்லை' : 'புகைப்படங்கள் எதுவும் கிடைக்கவில்லை'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {photos.length === 0 
              ? 'வட்டாரக் கல்வி அலுவலர்கள், மேற்பார்வையாளர் மற்றும் பயிற்றுநர்களின் பள்ளிப் பார்வையிடல் உண்மைப் புகைப்படங்களை நிர்வாகி தளம் (Admin Portal) வழியாகப் பதிவேற்றலாம்.' 
              : 'நீங்கள் தேடிய சொல் அல்லது பிரிவுக்கு உரிய படங்கள் இல்லை. தேடலை மாற்றியமைக்கவும்.'}
          </p>
          {photos.length > 0 && (
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              அனைத்துப் படங்களையும் காட்டு
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPhotos.map((photo) => {
            const badge = getCategoryBadge(photo.category);
            return (
              <div
                key={photo.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-orange-400 transition-all duration-200 overflow-hidden flex flex-col md:flex-row items-stretch"
              >
                {/* Photo Preview Container (Large and clickable) */}
                <div 
                  className="md:w-72 lg:w-80 shrink-0 relative bg-slate-900 min-h-[200px] md:min-h-[220px] overflow-hidden cursor-pointer flex items-center justify-center"
                  onClick={() => setActivePhoto(photo)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border backdrop-blur-md shadow-sm ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-300" />
                      {photo.date}
                    </span>
                  </div>

                  {/* Center/Bottom Overlay Indicator */}
                  <div className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 px-2.5 py-1 rounded-lg shadow text-[10px] font-bold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>பெரிதாக்கு</span>
                  </div>

                  {photo.studentsCount && (
                    <div className="absolute bottom-3 left-3 bg-orange-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                      {photo.studentsCount} மாணவர்கள்
                    </div>
                  )}
                </div>

                {/* Card Content & Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-black text-orange-700 mb-1">
                          <SchoolIcon className="w-4 h-4 shrink-0" />
                          <span>{photo.schoolName}</span>
                        </div>
                        <h3 
                          onClick={() => setActivePhoto(photo)}
                          className="text-base sm:text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer leading-snug"
                        >
                          {photo.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {photo.description}
                    </p>

                    {/* Visitor & Remarks */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-black text-xs shrink-0">
                          ஆ
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">பார்வையிட்ட அலுவலர்</span>
                          <span className="font-extrabold text-slate-800">{photo.visitorName}</span>
                        </div>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                        தேதி: <strong className="text-slate-800">{photo.date}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-slate-400">
                      NMMS நேரடி கள ஆய்வுப் பதிவு
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={photo.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        download={`${photo.schoolName}_${photo.date}.jpg`}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        title="படத்தைப் பதிவிறக்கு"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">பதிவிறக்கு</span>
                      </a>

                      <button
                        onClick={() => setActivePhoto(photo)}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>முழு விவரம் & படம்</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Modal for Photo Details */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 relative my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Full View */}
            <div className="relative bg-black max-h-[420px] flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[420px] w-full object-contain"
              />
            </div>

            {/* Photo Metadata Details */}
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${getCategoryBadge(activePhoto.category).bg}`}>
                    {getCategoryBadge(activePhoto.category).label}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-2">
                    {activePhoto.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePhoto.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={`NMMS_Visit_${activePhoto.schoolName}.jpg`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>பதிவிறக்கு</span>
                  </a>
                </div>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60 text-xs">
                <div>
                  <span className="text-slate-600 block text-[10px] font-bold uppercase">பள்ளிப் பெயர்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <SchoolIcon className="w-3.5 h-3.5 text-orange-600" />
                    {activePhoto.schoolName}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-600 block text-[10px] font-bold uppercase">பார்வையிட்ட நாள்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {activePhoto.date}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-600 block text-[10px] font-bold uppercase">பார்வையாளர் / அலுவலர்</span>
                  <strong className="text-slate-900 font-extrabold flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {activePhoto.visitorName}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">{activePhoto.visitorRole}</span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-orange-600" />
                  களப் பார்வை அறிக்கை & முக்கிய குறிப்புகள்:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                  {activePhoto.description}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
