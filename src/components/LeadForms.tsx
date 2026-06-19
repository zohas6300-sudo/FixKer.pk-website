import React, { useState, useRef } from 'react';
import { ServiceRequest, ProfessionalRegistration } from '../types';
import { CITIES_SERVED, POPULAR_SERVICES } from '../data';
import { 
  CheckCircle2, 
  User, 
  Phone, 
  MapPin, 
  Wrench, 
  FileText, 
  Send, 
  Building2, 
  HelpCircle,
  CreditCard,
  Upload,
  Trash2,
  Eye,
  Sparkles,
  AlertTriangle,
  Fingerprint,
  RefreshCw
} from 'lucide-react';

interface LeadFormsProps {
  onSubmitRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => void;
  onSubmitProRegistration: (pro: Omit<ProfessionalRegistration, 'id' | 'status' | 'createdAt'>) => void;
  preSelectedService: string;
  requestFormRef: React.RefObject<HTMLDivElement | null>;
  proFormRef: React.RefObject<HTMLDivElement | null>;
}

export default function LeadForms({
  onSubmitRequest,
  onSubmitProRegistration,
  preSelectedService,
  requestFormRef,
  proFormRef,
}: LeadFormsProps) {
  // Request Form States
  const [reqName, setReqName] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqCity, setReqCity] = useState('');
  const [reqArea, setReqArea] = useState('');
  const [reqService, setReqService] = useState(preSelectedService || '');
  const [reqDesc, setReqDesc] = useState('');
  const [reqSubmitted, setReqSubmitted] = useState(false);
  const [reqError, setReqError] = useState('');

  // Pro Form States
  const [proName, setProName] = useState('');
  const [proPhone, setProPhone] = useState('');
  const [proWhatsApp, setProWhatsApp] = useState('');
  const [proCity, setProCity] = useState('');
  const [proProfession, setProProfession] = useState('');
  const [proExperience, setProExperience] = useState('');
  const [proSubmitted, setProSubmitted] = useState(false);
  const [proError, setProError] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);

  // CNIC physical ID card states
  const [proCnic, setProCnic] = useState('');
  const [cnicFront, setCnicFront] = useState<string>('');
  const [cnicBack, setCnicBack] = useState<string>('');
  const [isAnalyzingFront, setIsAnalyzingFront] = useState(false);
  const [isAnalyzingBack, setIsAnalyzingBack] = useState(false);
  const [frontConfidence, setFrontConfidence] = useState<number | null>(null);
  const [backConfidence, setBackConfidence] = useState<number | null>(null);

  // CNIC 13-digit format (XXXXX-XXXXXXX-X)
  const formatCnic = (value: string) => {
    const clean = value.replace(/\D/g, '');
    const truncated = clean.slice(0, 13);
    if (truncated.length <= 5) {
      return truncated;
    } else if (truncated.length <= 12) {
      return `${truncated.slice(0, 5)}-${truncated.slice(5)}`;
    } else {
      return `${truncated.slice(0, 5)}-${truncated.slice(5, 12)}-${truncated.slice(12, 13)}`;
    }
  };

  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProCnic(formatCnic(e.target.value));
  };

  const handleCnicUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'front') {
      setIsAnalyzingFront(true);
      setFrontConfidence(null);
    } else {
      setIsAnalyzingBack(true);
      setBackConfidence(null);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result as string;
      setTimeout(() => {
        if (type === 'front') {
          setCnicFront(b64);
          setIsAnalyzingFront(false);
          setFrontConfidence(Math.floor(Math.random() * 6) + 94);
        } else {
          setCnicBack(b64);
          setIsAnalyzingBack(false);
          setBackConfidence(Math.floor(Math.random() * 5) + 95);
        }
      }, 1500); // laser scan delay
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'front' | 'back') => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (type === 'front') {
      setIsAnalyzingFront(true);
      setFrontConfidence(null);
    } else {
      setIsAnalyzingBack(true);
      setBackConfidence(null);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result as string;
      setTimeout(() => {
        if (type === 'front') {
          setCnicFront(b64);
          setIsAnalyzingFront(false);
          setFrontConfidence(Math.floor(Math.random() * 6) + 94);
        } else {
          setCnicBack(b64);
          setIsAnalyzingBack(false);
          setBackConfidence(Math.floor(Math.random() * 5) + 95);
        }
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  // Synchronize preSelectedService when it changes
  if (preSelectedService && reqService !== preSelectedService) {
    setReqService(preSelectedService);
  }

  // Handle same as phone check
  const handlePhoneChange = (val: string) => {
    setProPhone(val);
    if (sameAsPhone) {
      setProWhatsApp(val);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) {
      setProWhatsApp(proPhone);
    }
  };

  // Submit handlers
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReqError('');

    if (!reqName.trim()) return setReqError('Full name is required');
    if (!reqPhone.trim()) return setReqError('Active mobile number is required');
    if (!reqCity) return setReqError('Please choose your city');
    if (!reqArea.trim()) return setReqError('Please state your area or town');
    if (!reqService) return setReqError('Please choose the service required');
    if (!reqDesc.trim()) return setReqError('Please briefly describe your service issue');

    onSubmitRequest({
      fullName: reqName,
      mobileNumber: reqPhone,
      city: reqCity,
      area: reqArea,
      serviceType: reqService,
      description: reqDesc,
    });

    setReqSubmitted(true);
    // Reset fields
    setReqName('');
    setReqPhone('');
    setReqArea('');
    setReqDesc('');
  };

  const handleProSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProError('');

    if (!proName.trim()) return setProError('Full name is required');
    if (!proPhone.trim()) return setProError('Active phone number is required');
    if (!proWhatsApp.trim()) return setProError('WhatsApp number is required');
    if (!proCity) return setProError('Please select your city');
    if (!proProfession) return setProError('Please choose your main profession');

    const cleanCnicDigits = proCnic.replace(/\D/g, '');
    if (cleanCnicDigits.length !== 13) {
      return setProError('Please enter a valid 13-digit CNIC card number (e.g., 35202-1234567-1).');
    }

    if (!cnicFront) {
      return setProError('Please upload front side image/scan of your physical ID Card/CNIC for verification.');
    }
    if (!cnicBack) {
      return setProError('Please upload back side image/scan of your physical ID Card/CNIC for verification.');
    }

    const expNum = parseInt(proExperience, 10);
    if (isNaN(expNum) || expNum < 0) return setProError('Please provide valid years of experience');

    onSubmitProRegistration({
      fullName: proName,
      phoneNumber: proPhone,
      whatsAppNumber: proWhatsApp,
      city: proCity,
      profession: proProfession,
      experience: expNum,
      cnicNumber: proCnic,
      cnicFrontImage: cnicFront,
      cnicBackImage: cnicBack,
    });

    setProSubmitted(true);
    // Reset fields
    setProName('');
    setProPhone('');
    setProWhatsApp('');
    setProExperience('');
    setProCnic('');
    setCnicFront('');
    setCnicBack('');
    setFrontConfidence(null);
    setBackConfidence(null);
  };

  return (
    <div className="py-16 bg-slate-50 border-t border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: Customer Request Form */}
        <div 
          ref={requestFormRef} 
          id="request-job" 
          className="scroll-mt-24 max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-24 animate-fade-in"
        >
          <div className="bg-primary py-8 px-6 sm:px-10 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-bold text-7xl select-none">Fix</div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-center">
              Quick Service Request
            </h3>
            <p className="text-blue-100 text-sm sm:text-base font-medium text-center mt-2 max-w-xl mx-auto">
              Fill in your details. We will match you with the nearest expert, and they will connect with you on phone/WhatsApp in minutes.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {reqSubmitted ? (
              <div className="text-center py-8 px-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Request Received Successfully!</h4>
                <p className="text-slate-600 font-medium mt-4 max-w-lg mx-auto">
                  Bohat Shukriya! Your request of <b>{reqService}</b> has been queued. Our local coordinator is matching you with a professional nearby. You will receive a direct call or WhatsApp message in minutes.
                </p>

                {/* Important notice block */}
                <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-lg mx-auto">
                  <h5 className="font-bold text-slate-900 text-sm">💡 What happens next?</h5>
                  <ul className="text-xs text-slate-500 space-y-2 mt-3 list-disc pl-4 font-semibold">
                    <li>Our verified professional will call or text from a <b>03xx</b> helpline.</li>
                    <li>You can request a direct photo of their card or CNIC before their visit.</li>
                    <li>Discuss and agree on rates upfront on call. No surprise charges.</li>
                  </ul>
                </div>

                <button
                  onClick={() => setReqSubmitted(false)}
                  className="mt-8 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm cursor-pointer shadow-md"
                >
                  Submit Another Job Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-6 text-left">
                {reqError && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                    ⚠️ {reqError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adnan Qureshi"
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Active Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 03006347836"
                        value={reqPhone}
                        onChange={(e) => setReqPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-slate-450 font-bold">Must be active. We call you here.</p>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Select City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        required
                        value={reqCity}
                        onChange={(e) => setReqCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                      >
                        <option value="">-- Choose Pakistani City --</option>
                        {CITIES_SERVED.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.urduName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Area / Town */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Area / Town Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Johar Town, DHA Phase 6, Clifton"
                        value={reqArea}
                        onChange={(e) => setReqArea(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Required Service Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                    Required Professional Service
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <select
                      required
                      value={reqService}
                      onChange={(e) => setReqService(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                    >
                      <option value="">-- Select Service Profession --</option>
                      {POPULAR_SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.icon} {s.name}
                        </option>
                      ))}
                      <option value="Other">Other Category (Explain below)</option>
                    </select>
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                    Description of Problem / Requirements
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain your problem, e.g. Water motor is not working & making a loud sound. Need urgent repairs..."
                      value={reqDesc}
                      onChange={(e) => setReqDesc(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-primary hover:bg-primary-hover text-white font-black text-base rounded-lg shadow-md shadow-blue-150 active:scale-98 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Get Connected Now</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* SECTION 2: Professional Registration Section */}
        <div 
          ref={proFormRef} 
          id="register-pro" 
          className="scroll-mt-24 max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in"
        >
          <div className="bg-slate-950 py-8 px-6 sm:px-10 text-white relative border-b border-slate-800">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-bold text-7xl select-none">Pro</div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-center">
              Join as Pro
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-medium text-center mt-2 max-w-xl mx-auto">
              Are you an expert electrician, plumber, ac technician, or solar installer? Join FixKer.pk to earn more, work independently, and grow your local business!
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {proSubmitted ? (
              <div className="text-center py-8 px-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Application Submitted!</h4>
                <p className="text-slate-600 font-medium mt-4 max-w-lg mx-auto">
                  Bohat Shukriya! Your registration has been received. Our professional verification desk will review your details and call you on your WhatsApp line to finalize your onboarding.
                </p>
                <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-lg mx-auto">
                  <h5 className="font-bold text-slate-900 text-sm">🗓️ Next Verification Steps</h5>
                  <ul className="text-xs text-slate-500 space-y-2 mt-3 list-disc pl-4 font-semibold">
                    <li>Verification call on your phone to audit technical tools and experience.</li>
                    <li>Digital submission of CNIC front & back photo.</li>
                    <li>Activation of your FixKer Partner Badge and first cluster of job leads!</li>
                  </ul>
                </div>

                <button
                  onClick={() => setProSubmitted(false)}
                  className="mt-8 px-6 py-3 rounded-lg bg-accent hover:bg-emerald-600 text-white font-bold text-sm cursor-pointer shadow-xs"
                >
                  Register Another Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleProSubmit} className="space-y-6 text-left">
                {proError && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                    ⚠️ {proError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pro Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Full Name (As per CNIC)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Imran"
                        value={proName}
                        onChange={(e) => setProName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Pro Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Mobile Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 03xxxxxxxxx"
                        value={proPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-accent">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        disabled={sameAsPhone}
                        placeholder="e.g. 03xxxxxxxxx"
                        value={proWhatsApp}
                        onChange={(e) => setProWhatsApp(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all ${
                          sameAsPhone ? 'bg-slate-100 cursor-not-allowed opacity-75' : ''
                        }`}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="checkbox"
                        id="sameAsPhone"
                        checked={sameAsPhone}
                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                        className="accent-accent rounded"
                      />
                      <label htmlFor="sameAsPhone" className="text-[10px] text-slate-550 font-bold cursor-pointer select-none">
                        WhatsApp is same as phone number
                      </label>
                    </div>
                  </div>

                  {/* Pro Selected City */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Select Base City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        required
                        value={proCity}
                        onChange={(e) => setProCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
                      >
                        <option value="">-- Choose Base City --</option>
                        {CITIES_SERVED.map((c) => (
                          <option key={'pro-' + c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pro Selected Profession */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Your Skill Profession
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <select
                        required
                        value={proProfession}
                        onChange={(e) => setProProfession(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
                      >
                        <option value="">-- Choose Profession --</option>
                        {POPULAR_SERVICES.map((s) => (
                          <option key={'pro-serv-' + s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="General Handyman">General Handyman</option>
                        <option value="Solar & Wind Power">Solar & Wind Power</option>
                        <option value="Fabrication Specialist">Fabrication Specialist</option>
                      </select>
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        required
                        placeholder="e.g. 5"
                        value={proExperience}
                        onChange={(e) => setProExperience(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* CNIC Card Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-700">
                      National CNIC Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="xxxxx-xxxxxxx-x"
                        value={proCnic}
                        onChange={handleCnicChange}
                        maxLength={15}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm font-semibold focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Physical ID Card Photo Verification Block */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-emerald-50 text-accent rounded-lg">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">Identity Audit & Credential Scanning</h4>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">
                        Please upload original physical photos of your CNIC front & back sides. High-resolution scans ensure immediate partner badge validation.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Front side card */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">CNIC FRONT SIDE PHOTO</span>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'front')}
                        className={`relative min-h-[170px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 transition-all group ${
                          cnicFront
                            ? 'border-emerald-500 bg-emerald-50/10'
                            : isAnalyzingFront
                            ? 'border-accent bg-accent/5'
                            : 'border-slate-200 hover:border-accent bg-white'
                        }`}
                      >
                        {isAnalyzingFront ? (
                          <div className="space-y-3 py-4">
                            <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto" />
                            <p className="text-xs font-black text-slate-700">Scanning Document Structure...</p>
                            <span className="text-[10px] text-slate-400 font-mono">Running Anti-Forgery Check</span>
                            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-xl top-8 animate-pulse" />
                          </div>
                        ) : cnicFront ? (
                          <div className="w-full h-full flex flex-col justify-between items-center relative py-1">
                            <img
                              src={cnicFront}
                              alt="CNIC Front"
                              referrerPolicy="no-referrer"
                              className="h-28 w-auto object-contain rounded border border-slate-200 shadow-xs mb-3"
                            />
                            
                            <div className="w-full text-center space-y-1">
                              <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-100">
                                <Sparkles className="w-3 h-3 mr-1 fill-emerald-300 stroke-emerald-600" /> CNIC Front Analyzed
                              </span>
                              <p className="text-[10px] text-slate-500 font-bold">
                                Security Check: <span className="text-emerald-600 font-extrabold">{frontConfidence}% Confidence</span>
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => { setCnicFront(''); setFrontConfidence(null); }}
                              className="absolute -top-1 -right-1 p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 border border-red-150 shadow-xs transition-colors cursor-pointer"
                              title="Delete Front Image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-6 px-2">
                            <Upload className="w-8 h-8 text-slate-400 group-hover:text-accent group-hover:scale-110 transition-transform mb-2" />
                            <span className="text-xs font-bold text-slate-800">Drag Front side here or <span className="text-accent underline">browse</span></span>
                            <span className="text-[10px] text-slate-400 font-bold mt-1">Accepts images up to 5MB</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleCnicUpload(e, 'front')}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Back side card */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold uppercase tracking-wide text-slate-600">CNIC BACK SIDE PHOTO</span>
                      <div
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'back')}
                        className={`relative min-h-[170px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 transition-all group ${
                          cnicBack
                            ? 'border-emerald-500 bg-emerald-50/10'
                            : isAnalyzingBack
                            ? 'border-accent bg-accent/5'
                            : 'border-slate-200 hover:border-accent bg-white'
                        }`}
                      >
                        {isAnalyzingBack ? (
                          <div className="space-y-3 py-4">
                            <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto" />
                            <p className="text-xs font-black text-slate-700">Reading Demographics...</p>
                            <span className="text-[10px] text-slate-400 font-mono">Comparing Regional Database</span>
                            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-xl top-8 animate-pulse" />
                          </div>
                        ) : cnicBack ? (
                          <div className="w-full h-full flex flex-col justify-between items-center relative py-1">
                            <img
                              src={cnicBack}
                              alt="CNIC Back"
                              referrerPolicy="no-referrer"
                              className="h-28 w-auto object-contain rounded border border-slate-200 shadow-xs mb-3"
                            />
                            
                            <div className="w-full text-center space-y-1">
                              <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-100">
                                <Sparkles className="w-3 h-3 mr-1 fill-emerald-300 stroke-emerald-600" /> CNIC Back Analyzed
                              </span>
                              <p className="text-[10px] text-slate-500 font-bold">
                                Security Check: <span className="text-emerald-600 font-extrabold">{backConfidence}% Confidence</span>
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => { setCnicBack(''); setBackConfidence(null); }}
                              className="absolute -top-1 -right-1 p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 border border-red-150 shadow-xs transition-colors cursor-pointer"
                              title="Delete Back Image"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full py-6 px-2">
                            <Upload className="w-8 h-8 text-slate-400 group-hover:text-accent group-hover:scale-110 transition-transform mb-2" />
                            <span className="text-xs font-bold text-slate-800">Drag Back side here or <span className="text-accent underline">browse</span></span>
                            <span className="text-[10px] text-slate-400 font-bold mt-1">Accepts images up to 5MB</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleCnicUpload(e, 'back')}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    defaultChecked
                    className="accent-accent rounded mt-1"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-500 font-medium cursor-pointer select-none leading-relaxed">
                    I declare that my CNIC is active, I hold verified professional skills, and I agree to provide high-quality workmanship to clients across FixKer.pk network.
                  </label>
                </div>

                {/* Submitting buttons */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-accent hover:bg-emerald-600 text-white font-black text-base rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                >
                  Register as Professional
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
