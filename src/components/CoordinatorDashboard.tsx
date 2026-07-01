import { useState } from 'react';
import { ProfessionalRegistration } from '../types';
import { 
  ShieldCheck, 
  X, 
  Search, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RefreshCw, 
  Eye, 
  Filter, 
  Sparkles, 
  FileText, 
  Fingerprint, 
  MapPin, 
  Clock, 
  Wrench, 
  User, 
  Phone, 
  Calendar,
  Layers,
  Database,
  Building,
  AlertCircle
} from 'lucide-react';

interface CoordinatorDashboardProps {
  pros: ProfessionalRegistration[];
  onUpdateProStatus: (id: string, status: ProfessionalRegistration['status']) => Promise<void>;
  onDeletePro: (id: string) => Promise<void>;
  onSeedMockData: () => Promise<void>;
  firebaseDbStatus: 'connecting' | 'connected' | 'error';
  onClose: () => void;
}

// Vector CNIC drawing component to serve as a high-fidelity visual placeholder
// for registrations that have CNIC numbers but no raw image uploads.
function VectorCNIC({ 
  name, 
  cnic, 
  profession,
  city,
  side 
}: { 
  name: string; 
  cnic: string; 
  profession: string;
  city: string;
  side: 'front' | 'back' 
}) {
  const gender = "M";
  const formattedCnic = cnic || "35202-1234567-1";

  if (side === 'front') {
    return (
      <div id="cnic-front-render" className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-2xl p-4 bg-gradient-to-br from-emerald-800/10 via-green-50 to-emerald-900/10 border-2 border-emerald-600/30 shadow-md text-slate-800 overflow-hidden font-sans select-none">
        {/* Subtle Pakistani national crest watermark */}
        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
          <span className="text-8xl">🇵🇰</span>
        </div>
        
        {/* Government header bar */}
        <div className="flex items-start justify-between border-b border-emerald-600/20 pb-1.5 mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="text-xl">🇵🇰</span>
            <div>
              <h5 className="text-[8px] font-extrabold tracking-wider text-emerald-800 uppercase leading-none">Government of Pakistan</h5>
              <p className="text-[6px] font-bold text-slate-500 leading-none">Ministry of Interior</p>
            </div>
          </div>
          <div className="text-right">
            <h5 className="text-[7px] font-black text-emerald-800 tracking-tight leading-none">National Identity Card</h5>
            <p className="text-[5px] font-bold text-slate-400 mt-0.5 leading-none">Islamic Republic of Pakistan</p>
          </div>
        </div>

        {/* Card Content Grid */}
        <div className="grid grid-cols-12 gap-2 h-[calc(100%-35px)] relative z-10">
          {/* Portrait Photo Column */}
          <div className="col-span-3 flex flex-col justify-start items-center space-y-1">
            <div className="w-full aspect-[1/1.2] rounded bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden relative shadow-inner">
              <User className="w-8 h-8 text-slate-400" />
              {/* Overlay QR code simulation */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-800" />
            </div>
            
            {/* Holographic Chip simulation */}
            <div className="w-6 h-5 rounded bg-gradient-to-br from-yellow-400 to-amber-600 border border-amber-600/40 flex items-center justify-center shadow-xs">
              <div className="grid grid-cols-3 gap-0.5 w-4 h-3">
                <div className="bg-amber-800/20 rounded-xs" />
                <div className="bg-amber-800/20 rounded-xs" />
                <div className="bg-amber-800/20 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Demographic Information Column */}
          <div className="col-span-9 space-y-1.5 text-left text-[7px] leading-tight flex flex-col justify-between">
            <div className="space-y-0.5">
              <div>
                <span className="text-[5px] text-slate-400 block font-bold leading-none">Name</span>
                <span className="font-extrabold text-slate-900 uppercase leading-none">{name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-1 mt-0.5">
                <div>
                  <span className="text-[5px] text-slate-400 block font-bold leading-none">Country of Stay</span>
                  <span className="font-bold text-slate-800 leading-none">Pakistan</span>
                </div>
                <div>
                  <span className="text-[5px] text-slate-400 block font-bold leading-none">Gender</span>
                  <span className="font-bold text-slate-800 leading-none">{gender}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <div>
                  <span className="text-[5px] text-slate-400 block font-bold leading-none">Verification Scope</span>
                  <span className="font-bold text-slate-800 leading-none">{profession}</span>
                </div>
                <div>
                  <span className="text-[5px] text-slate-400 block font-bold leading-none">Base City</span>
                  <span className="font-bold text-slate-800 leading-none">{city}</span>
                </div>
              </div>
            </div>

            {/* CNIC Number Box */}
            <div className="bg-emerald-600/10 border border-emerald-600/20 p-1 rounded flex justify-between items-center mt-1">
              <div>
                <span className="text-[5px] text-slate-400 block font-bold leading-none">Identity Number</span>
                <span className="font-mono font-black text-[9px] text-emerald-800 tracking-wider leading-none">{formattedCnic}</span>
              </div>
              <span className="text-[9px] opacity-25">🛡️</span>
            </div>
          </div>
        </div>

        {/* Security watermark footer line */}
        <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[4px] text-slate-400 font-mono tracking-widest uppercase border-t border-slate-200/40 pt-1">
          <span>NADRA PAKISTAN VERIFIED BADGE SYSTEM</span>
          <span>ORIGINAL REGISTRATION ONLY</span>
        </div>
      </div>
    );
  }

  // Back Side of Mock CNIC
  return (
    <div id="cnic-back-render" className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-2xl p-4 bg-gradient-to-br from-emerald-800/10 via-green-50 to-emerald-900/10 border-2 border-emerald-600/30 shadow-md text-slate-800 overflow-hidden font-sans select-none">
      {/* Magnetic stripe simulator */}
      <div className="absolute top-4 inset-x-0 h-4 bg-slate-800 opacity-90 border-b border-slate-900" />
      
      {/* Background seal watermarks */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none mt-4">
        <span className="text-7xl">🛡️</span>
      </div>

      <div className="mt-5 space-y-2 text-left relative z-10 h-[calc(100%-25px)] flex flex-col justify-between">
        <div className="space-y-1 text-[7px]">
          <div>
            <span className="text-[5px] text-slate-400 block font-bold leading-none">Present Address</span>
            <span className="font-bold text-slate-700 leading-tight">House # 42A, Sector Block C, DHA Phase 5, {city}, Pakistan</span>
          </div>
          <div>
            <span className="text-[5px] text-slate-400 block font-bold leading-none">Permanent Address</span>
            <span className="font-bold text-slate-700 leading-tight">Tehsil Model Town, District {city}, Punjab, Pakistan</span>
          </div>
        </div>

        {/* Barcode Simulator */}
        <div className="grid grid-cols-12 gap-2 items-end">
          <div className="col-span-8 flex flex-col space-y-1">
            <div className="grid grid-cols-3 gap-1 text-[6px]">
              <div>
                <span className="text-[4px] text-slate-400 block font-bold">Issue Date</span>
                <span className="font-bold text-slate-800">18-06-2023</span>
              </div>
              <div>
                <span className="text-[4px] text-slate-400 block font-bold">Expiry Date</span>
                <span className="font-bold text-slate-800">18-06-2033</span>
              </div>
              <div>
                <span className="text-[4px] text-slate-400 block font-bold">Family No</span>
                <span className="font-bold text-slate-800">10294-85</span>
              </div>
            </div>
            
            {/* Signature Area */}
            <div className="border-t border-slate-300 pt-0.5 flex justify-between items-center">
              <span className="text-[4px] text-slate-400 uppercase font-bold">Registrar General Signature</span>
              <span className="font-serif italic text-[7px] text-emerald-800 font-extrabold pr-2">Usman_M.</span>
            </div>
          </div>

          {/* Realistic Barcode Block */}
          <div className="col-span-4 h-6 bg-slate-900 p-0.5 rounded flex items-center justify-between space-x-0.5 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={'bar-' + i} 
                className="h-full bg-white" 
                style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoordinatorDashboard({
  pros,
  onUpdateProStatus,
  onDeletePro,
  onSeedMockData,
  firebaseDbStatus,
  onClose
}: CoordinatorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [professionFilter, setProfessionFilter] = useState('All');
  const [selectedProId, setSelectedProId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  
  // Interactive Verification checklist state
  const [checklist, setChecklist] = useState({
    nameVerified: false,
    cnicNumberVerified: false,
    photosLegible: false,
    notExpired: false
  });

  // Lightbox Modal for Full-Size ID Cards viewing
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Filter professionals
  const filteredPros = pros.filter((pro) => {
    const matchesSearch = 
      pro.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.cnicNumber.includes(searchTerm) ||
      pro.phoneNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || pro.status === statusFilter;
    const matchesCity = cityFilter === 'All' || pro.city === cityFilter;
    const matchesProfession = professionFilter === 'All' || pro.profession === professionFilter;

    return matchesSearch && matchesStatus && matchesCity && matchesProfession;
  });

  // Calculate stats
  const totalProsCount = pros.length;
  const pendingCount = pros.filter(p => p.status === 'Pending').length;
  const approvedCount = pros.filter(p => p.status === 'Approved').length;
  const rejectedCount = pros.filter(p => p.status === 'Rejected').length;

  // Selected professional
  const selectedPro = pros.find(p => p.id === selectedProId) || filteredPros[0] || null;

  // Sync selected professional change to reset checkboxes
  const handleSelectPro = (proId: string) => {
    setSelectedProId(proId);
    setShowRejectionInput(false);
    setRejectionReason('');
    setChecklist({
      nameVerified: proId ? pros.find(p => p.id === proId)?.status === 'Approved' : false,
      cnicNumberVerified: proId ? pros.find(p => p.id === proId)?.status === 'Approved' : false,
      photosLegible: proId ? pros.find(p => p.id === proId)?.status === 'Approved' : false,
      notExpired: proId ? pros.find(p => p.id === proId)?.status === 'Approved' : false
    });
  };

  // Status handlers
  const handleApprove = async (id: string) => {
    try {
      setIsUpdating(true);
      await onUpdateProStatus(id, 'Approved');
      setShowRejectionInput(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRejectSubmit = async (id: string) => {
    if (!rejectionReason.trim()) return;
    try {
      setIsUpdating(true);
      await onUpdateProStatus(id, 'Rejected');
      setShowRejectionInput(false);
      setRejectionReason('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this professional registration completely from Firestore?')) {
      try {
        setIsUpdating(true);
        await onDeletePro(id);
        if (selectedProId === id) {
          setSelectedProId(null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Cities and professions mapping lists for filters
  const uniqueCities = Array.from(new Set(pros.map(p => p.city)));
  const uniqueProfessions = Array.from(new Set(pros.map(p => p.profession)));

  // Perform fraud metrics and duplicate registration checks
  const getSecurityMetrics = (pro: ProfessionalRegistration) => {
    const duplicates = pros.filter(p => p.cnicNumber === pro.cnicNumber && p.id !== pro.id);
    const hasDuplicate = duplicates.length > 0;
    const cleanCnicDigits = pro.cnicNumber.replace(/\D/g, '');
    const isFormatValid = cleanCnicDigits.length === 13;

    // Simulated scanning confidence based on input criteria
    let confidence = 95;
    if (hasDuplicate) confidence -= 40;
    if (!isFormatValid) confidence -= 50;
    if (pro.experience > 30) confidence -= 10; // Outlier check

    return {
      hasDuplicate,
      duplicateCount: duplicates.length,
      isFormatValid,
      confidenceScore: Math.max(10, confidence)
    };
  };

  return (
    <div id="coordinator-dashboard-portal" className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* 1. PORTAL NAVBAR CONTROL HEADER */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black tracking-tight text-white leading-none">Coordinator Verification Desk</h1>
              <span className="bg-emerald-500 text-slate-950 text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded leading-none">ID DATABASE</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Audit Identity CNIC Images, Background Vetting, and Partner Badge Approvals</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Firestore Connection status badge */}
          <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 font-bold">Firestore:</span>
            {firebaseDbStatus === 'connected' ? (
              <span className="flex items-center text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" /> Live DB Connected
              </span>
            ) : firebaseDbStatus === 'connecting' ? (
              <span className="flex items-center text-amber-400 font-bold">
                <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> Synchronizing...
              </span>
            ) : (
              <span className="flex items-center text-red-400 font-bold">
                <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> Connection Failed
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            title="Exit Coordinator Desk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. STATS SUMMARY BARS */}
      <section className="bg-slate-950/40 border-b border-slate-800/80 p-6 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Total Pros */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">TOTAL APPLICANTS</span>
              <span className="text-2xl font-black text-white">{totalProsCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 text-lg">📁</div>
          </div>

          {/* Pending Verification */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block">PENDING AUDIT</span>
              <span className="text-2xl font-black text-amber-400">{pendingCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 text-lg animate-pulse">⏳</div>
          </div>

          {/* Approved Professionals */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">APPROVED BADGES</span>
              <span className="text-2xl font-black text-emerald-400">{approvedCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-lg">🏅</div>
          </div>

          {/* Rejected Professionals */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5 text-left">
              <span className="text-[10px] text-red-400 font-black uppercase tracking-wider block">FLAGGED / REJECTED</span>
              <span className="text-2xl font-black text-red-400">{rejectedCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 text-lg">❌</div>
          </div>
        </div>
      </section>

      {/* 3. FILTERS BAR */}
      <section className="bg-slate-900 px-6 py-4 border-b border-slate-800/60 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by Name, CNIC, Mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-semibold text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Filters grid */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center justify-end">
            <div className="flex items-center space-x-1 text-slate-400 text-xs font-bold mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-all appearance-none"
            >
              <option value="All">Status: All</option>
              <option value="Pending">⌛ Pending Audit</option>
              <option value="Approved">🏅 Approved</option>
              <option value="Rejected">❌ Rejected</option>
            </select>

            {/* City Filter */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-all appearance-none"
            >
              <option value="All">City: All</option>
              {uniqueCities.map((city) => (
                <option key={'filter-city-' + city} value={city}>{city}</option>
              ))}
            </select>

            {/* Profession Filter */}
            <select
              value={professionFilter}
              onChange={(e) => setProfessionFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-300 focus:outline-none focus:border-emerald-500 transition-all appearance-none"
            >
              <option value="All">Profession: All</option>
              {uniqueProfessions.map((prof) => (
                <option key={'filter-prof-' + prof} value={prof}>{prof}</option>
              ))}
            </select>

            {/* Reset / Seed Mock Data */}
            <button
              onClick={onSeedMockData}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-slate-700 text-xs font-bold text-slate-300 rounded-lg transition-all cursor-pointer"
              title="Add mock registrations with default CNICs to test connection"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Seed DB Data</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. MAIN LAYOUT SPLIT WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: LIST OF REGISTERED PROFESSIONALS */}
        <div className="w-full md:w-80 lg:w-[350px] border-r border-slate-800 flex flex-col flex-shrink-0 bg-slate-950/20 overflow-y-auto">
          <div className="p-3 bg-slate-950/40 border-b border-slate-800/40 flex justify-between items-center text-[10px] text-slate-500 font-extrabold tracking-wider uppercase">
            <span>REGISTRATION QUEUE</span>
            <span>{filteredPros.length} FOUND</span>
          </div>

          {filteredPros.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <span className="text-3xl block mb-2">📁</span>
              <p className="text-xs font-bold">No professional registrations match current filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60">
              {filteredPros.map((pro) => {
                const isSelected = selectedPro?.id === pro.id;
                const secMetrics = getSecurityMetrics(pro);

                return (
                  <div
                    key={'queue-' + pro.id}
                    onClick={() => handleSelectPro(pro.id)}
                    className={`p-4 text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-slate-800/80 border-l-4 border-emerald-500 text-white' 
                        : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm leading-tight uppercase flex items-center">
                          {pro.fullName}
                          {secMetrics.hasDuplicate && (
                            <span className="ml-1.5 w-2 h-2 rounded-full bg-red-500" title="Duplicate CNIC Registration Alert" />
                          )}
                        </h4>
                        <p className="text-xs font-semibold text-slate-400 flex items-center">
                          <span className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[9px] mr-1 text-slate-300">
                            {pro.profession}
                          </span>
                          • {pro.city}
                        </p>
                        <span className="font-mono text-[10px] text-slate-500 block">
                          CNIC: {pro.cnicNumber || "Not Provided"}
                        </span>
                      </div>

                      {/* Small status tag */}
                      <span className={`text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded leading-none border ${
                        pro.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : pro.status === 'Rejected'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                      }`}>
                        {pro.status}
                      </span>
                    </div>

                    {/* Footer timeline metric */}
                    <div className="flex items-center justify-between text-[9px] text-slate-500 mt-3 border-t border-slate-800/40 pt-1.5">
                      <span className="flex items-center">
                        <Clock className="w-2.5 h-2.5 mr-1" />
                        {pro.createdAt}
                      </span>
                      <span className="font-bold">
                        {pro.experience} Years Exp
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: ACTIVE VERIFICATION PANEL / ID VIEWER DESK */}
        <div className="flex-1 bg-slate-900 overflow-y-auto flex flex-col justify-between">
          {selectedPro ? (
            <div className="p-6 md:p-8 space-y-8 text-left max-w-5xl mx-auto w-full">
              
              {/* Profile Card Summary Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black select-none pointer-events-none">ID</div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-teal-500/10">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2.5 flex-wrap">
                      <h2 className="text-xl font-black text-white uppercase tracking-tight">{selectedPro.fullName}</h2>
                      <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded border ${
                        selectedPro.status === 'Approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : selectedPro.status === 'Rejected'
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                      }`}>
                        {selectedPro.status} Verification
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-slate-400 font-bold mt-1 flex-wrap">
                      <span className="flex items-center text-cyan-400">
                        <Wrench className="w-3.5 h-3.5 mr-1" />
                        {selectedPro.profession}
                      </span>
                      <span>•</span>
                      <span className="flex items-center text-slate-300">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {selectedPro.city}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        Registered: {selectedPro.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick actions badge status */}
                <div className="flex items-center space-x-2 w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                  <button
                    onClick={() => handleDelete(selectedPro.id)}
                    disabled={isUpdating}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-colors disabled:opacity-50 cursor-pointer"
                    title="Permanently Delete Registration"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* DUAL WORKSPACE: ID CARD VISUALIZER vs. DEMOGRAPHICS CHECKLIST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ID CARDS VIEWER WORKSPACE (8 Columns) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-black text-slate-200 text-sm flex items-center">
                      <Fingerprint className="w-4 h-4 mr-1.5 text-emerald-400" />
                      PHYSICAL ID CARD IMAGES & CREDENTIAL VISUALS
                    </h3>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Click image to enlarge</span>
                  </div>

                  {/* TWO CARD VIEWS SIDE BY SIDE OR STACKED */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Front side ID */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">1. CNIC FRONT SIDE PHOTO</span>
                        {selectedPro.cnicFrontImage && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/15 uppercase">Uploaded JPEG</span>
                        )}
                      </div>

                      {/* Image container */}
                      <div className="flex items-center justify-center bg-slate-900 rounded-xl p-2.5 min-h-[190px] border border-slate-800/80 relative group overflow-hidden">
                        {selectedPro.cnicFrontImage ? (
                          <div className="relative cursor-zoom-in w-full flex items-center justify-center">
                            <img
                              src={selectedPro.cnicFrontImage}
                              alt="CNIC Front"
                              referrerPolicy="no-referrer"
                              className="max-h-40 rounded object-contain border border-slate-700 shadow-md group-hover:scale-102 transition-transform duration-355"
                            />
                            <div 
                              onClick={() => setLightboxImage({ url: selectedPro.cnicFrontImage!, title: `${selectedPro.fullName} - CNIC Front` })}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded"
                            >
                              <span className="bg-slate-950/80 p-2.5 rounded-full border border-slate-700 flex items-center text-xs font-bold text-white">
                                <Eye className="w-4 h-4 mr-1.5 text-emerald-400" /> Inspect Resolution
                              </span>
                            </div>
                          </div>
                        ) : (
                          // High-fidelity fallback vector rendering
                          <div className="relative">
                            <VectorCNIC
                              name={selectedPro.fullName}
                              cnic={selectedPro.cnicNumber}
                              profession={selectedPro.profession}
                              city={selectedPro.city}
                              side="front"
                            />
                            <div className="absolute top-1 right-1">
                              <span className="text-[8px] bg-blue-500 text-white font-extrabold px-1.5 py-0.5 rounded shadow">MOCK CNIC</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Back side ID */}
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">2. CNIC BACK SIDE PHOTO</span>
                        {selectedPro.cnicBackImage && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.5 rounded border border-emerald-500/15 uppercase">Uploaded JPEG</span>
                        )}
                      </div>

                      {/* Image container */}
                      <div className="flex items-center justify-center bg-slate-900 rounded-xl p-2.5 min-h-[190px] border border-slate-800/80 relative group overflow-hidden">
                        {selectedPro.cnicBackImage ? (
                          <div className="relative cursor-zoom-in w-full flex items-center justify-center">
                            <img
                              src={selectedPro.cnicBackImage}
                              alt="CNIC Back"
                              referrerPolicy="no-referrer"
                              className="max-h-40 rounded object-contain border border-slate-700 shadow-md group-hover:scale-102 transition-transform duration-355"
                            />
                            <div 
                              onClick={() => setLightboxImage({ url: selectedPro.cnicBackImage!, title: `${selectedPro.fullName} - CNIC Back` })}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded"
                            >
                              <span className="bg-slate-950/80 p-2.5 rounded-full border border-slate-700 flex items-center text-xs font-bold text-white">
                                <Eye className="w-4 h-4 mr-1.5 text-emerald-400" /> Inspect Resolution
                              </span>
                            </div>
                          </div>
                        ) : (
                          // High-fidelity fallback vector rendering
                          <div className="relative">
                            <VectorCNIC
                              name={selectedPro.fullName}
                              cnic={selectedPro.cnicNumber}
                              profession={selectedPro.profession}
                              city={selectedPro.city}
                              side="back"
                            />
                            <div className="absolute top-1 right-1">
                              <span className="text-[8px] bg-blue-500 text-white font-extrabold px-1.5 py-0.5 rounded shadow">MOCK CNIC</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* ID Scan Demographics Metrics Block */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center">
                      <Layers className="w-4 h-4 mr-1.5 text-cyan-400" /> Security Scanning Analytics & Duplicity Radar
                    </h4>

                    {(() => {
                      const stats = getSecurityMetrics(selectedPro);
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          {/* Confidence Rating Gauge */}
                          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                            <span className="text-[10px] text-slate-500 font-bold block">AUDIT SCAN SCORE</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xl font-black ${
                                stats.confidenceScore > 80 
                                  ? 'text-emerald-400' 
                                  : stats.confidenceScore > 50 
                                  ? 'text-amber-400' 
                                  : 'text-red-400'
                              }`}>
                                {stats.confidenceScore}% Confidence
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  stats.confidenceScore > 80 
                                    ? 'bg-emerald-400' 
                                    : stats.confidenceScore > 50 
                                    ? 'bg-amber-400' 
                                    : 'bg-red-400'
                                }`} 
                                style={{ width: `${stats.confidenceScore}%` }} 
                              />
                            </div>
                          </div>

                          {/* Duplication check */}
                          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-left">
                            <span className="text-[10px] text-slate-500 font-bold block">DUPLICATE CNIC DETECTOR</span>
                            {stats.hasDuplicate ? (
                              <div className="space-y-1">
                                <span className="text-xs text-red-400 font-black flex items-center">
                                  <AlertCircle className="w-3.5 h-3.5 mr-1" /> Duplicate Detected ({stats.duplicateCount})
                                </span>
                                <p className="text-[9px] text-slate-400 leading-none">This CNIC card is already registered with another profile.</p>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <span className="text-xs text-emerald-400 font-black flex items-center">
                                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Unique Identity Record
                                </span>
                                <p className="text-[9px] text-slate-400 leading-none">No overlapping registrations found in Firestore database.</p>
                              </div>
                            )}
                          </div>

                          {/* Format validate */}
                          <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-left">
                            <span className="text-[10px] text-slate-500 font-bold block">CNIC STRUCTURAL FORMAT</span>
                            {stats.isFormatValid ? (
                              <div className="space-y-1">
                                <span className="text-xs text-emerald-400 font-black flex items-center">
                                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Valid 13-Digit Format
                                </span>
                                <p className="text-[9px] text-slate-400 leading-none">Valid Pakistani CNIC numbering pattern matches standards.</p>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <span className="text-xs text-red-400 font-black flex items-center">
                                  <AlertCircle className="w-3.5 h-3.5 mr-1" /> Invalid CNIC Format
                                </span>
                                <p className="text-[9px] text-slate-400 leading-none">Pattern does not adhere to standard 13-digit format.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* DEMOGRAPHICS & CHECKLIST PANEL (4 Columns) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Demographics details block */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center border-b border-slate-800 pb-2.5">
                      <FileText className="w-4 h-4 mr-1.5 text-cyan-400" /> Applicant Demographic Data
                    </h4>

                    <div className="space-y-3.5 text-xs text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Full Name</span>
                        <span className="font-extrabold text-white text-sm uppercase mt-0.5 block">{selectedPro.fullName}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Phone Line</span>
                          <a href={`tel:${selectedPro.phoneNumber}`} className="font-bold text-cyan-400 hover:underline mt-0.5 block">
                            {selectedPro.phoneNumber}
                          </a>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">WhatsApp</span>
                          <a href={`https://wa.me/${selectedPro.whatsAppNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-400 hover:underline mt-0.5 block">
                            {selectedPro.whatsAppNumber}
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">National ID (CNIC)</span>
                          <span className="font-mono font-bold text-slate-200 mt-0.5 block">{selectedPro.cnicNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Field Experience</span>
                          <span className="font-bold text-slate-200 mt-0.5 block">{selectedPro.experience} Years active</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Service Skill</span>
                          <span className="font-bold text-amber-400 mt-0.5 block">{selectedPro.profession}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none">Vetted Zone</span>
                          <span className="font-bold text-slate-200 mt-0.5 block">{selectedPro.city} Office</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual verification checklist to guide approval */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center border-b border-slate-800 pb-2.5">
                      <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" /> Coordinator Checklist
                    </h4>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist.nameVerified}
                          onChange={(e) => setChecklist({ ...checklist, nameVerified: e.target.checked })}
                          className="mt-0.5 bg-slate-900 border-slate-800 text-emerald-500 rounded focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                          Full Name matches CNIC photograph name text
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist.cnicNumberVerified}
                          onChange={(e) => setChecklist({ ...checklist, cnicNumberVerified: e.target.checked })}
                          className="mt-0.5 bg-slate-900 border-slate-800 text-emerald-500 rounded focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                          Identity CNIC Number matches input field database string
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist.photosLegible}
                          onChange={(e) => setChecklist({ ...checklist, photosLegible: e.target.checked })}
                          className="mt-0.5 bg-slate-900 border-slate-800 text-emerald-500 rounded focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                          Front & Back side images legible (no severe blurs)
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist.notExpired}
                          onChange={(e) => setChecklist({ ...checklist, notExpired: e.target.checked })}
                          className="mt-0.5 bg-slate-900 border-slate-800 text-emerald-500 rounded focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                          Identity card is valid and non-expired
                        </span>
                      </label>
                    </div>

                    {/* Completion indicators */}
                    <div className="pt-2 text-center">
                      {Object.values(checklist).every(Boolean) ? (
                        <span className="inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-400 font-black px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                          All Audits Passed. Ready for Badge!
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] bg-slate-900 text-slate-400 font-bold px-2.5 py-1 rounded-full border border-slate-800 uppercase tracking-wider">
                          Pending Checklist Audits
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AUDIT ACTIONS BAR */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                      Decision Control Desk
                    </h4>

                    {showRejectionInput ? (
                      <div className="space-y-3">
                        <textarea
                          placeholder="Provide a rejection reason (e.g. Blurry CNIC photo, mismatched name)..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-semibold text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all min-h-[70px]"
                        />
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleRejectSubmit(selectedPro.id)}
                            disabled={!rejectionReason.trim() || isUpdating}
                            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md disabled:opacity-50"
                          >
                            Confirm Rejection
                          </button>
                          <button
                            type="button"
                            onClick={() => { setShowRejectionInput(false); setRejectionReason(''); }}
                            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Reject button */}
                        <button
                          onClick={() => setShowRejectionInput(true)}
                          disabled={isUpdating || selectedPro.status === 'Rejected'}
                          className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs cursor-pointer flex items-center justify-center space-x-2 transition-all ${
                            selectedPro.status === 'Rejected'
                              ? 'bg-red-950/20 text-red-500/60 border-red-950/40 cursor-not-allowed'
                              : 'bg-red-500/10 hover:bg-red-500/25 text-red-400 border-red-500/20 hover:border-red-500/30 shadow-md shadow-red-950/20'
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject Partner</span>
                        </button>

                        {/* Approve and Badge Partner Button */}
                        <button
                          onClick={() => handleApprove(selectedPro.id)}
                          disabled={isUpdating || selectedPro.status === 'Approved'}
                          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center space-x-2 transition-all ${
                            selectedPro.status === 'Approved'
                              ? 'bg-emerald-950/20 text-emerald-500/60 border border-emerald-950/40 cursor-not-allowed'
                              : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/10'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve & Badge</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>
          ) : (
            <div className="m-auto text-center p-8 text-slate-500">
              <ShieldCheck className="w-16 h-16 text-slate-700 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-slate-300">Verification Desk Active</h3>
              <p className="text-sm mt-1 text-slate-500 max-w-sm mx-auto">
                No applicants left in current queue, or select a professional registration card on the left panel to begin credentials verification.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 5. LIGHTBOX MODAL ENLARGER FOR DUAL SIDE ID CARDS IN HIGH RESOLUTION */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-55 flex flex-col items-center justify-center bg-black/95 p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute top-4 right-4 flex space-x-2">
            <span className="text-xs text-slate-400 font-bold bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              {lightboxImage.title}
            </span>
            <button
              onClick={() => setLightboxImage(null)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <img
            src={lightboxImage.url}
            alt="Credential Enlarger"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[80vh] object-contain rounded-lg border border-slate-800 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing
          />
          
          <p className="text-slate-500 text-xs mt-4 font-bold max-w-md text-center">
            Security Inspector: Double-check national watermarks, registration stamp, signature and portrait matches.
          </p>
        </div>
      )}

    </div>
  );
}
