import { useState, useEffect, useRef } from 'react';
import { ServiceRequest, ProfessionalRegistration } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import LeadForms from './components/LeadForms';
import Cities from './components/Cities';
import Reviews from './components/Reviews';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import StickyActions from './components/StickyActions';
import { ShieldCheck, Info, X, Star } from 'lucide-react';
import { firebaseService } from './services/firebaseService';
import CoordinatorDashboard from './components/CoordinatorDashboard';

const LOCAL_STORAGE_REQ_KEY = 'fixker_requests';
const LOCAL_STORAGE_PRO_KEY = 'fixker_pros';

const INITIAL_MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-1',
    fullName: 'Amir Mahmood',
    mobileNumber: '03214567890',
    city: 'Lahore',
    area: 'Johar Town',
    serviceType: 'Electrician',
    description: 'The main UPS battery connection is failing and some house sockets aren\'t supplying electricity. Need immediate help.',
    status: 'Pending',
    createdAt: '2526-06-19 01:20 AM',
  },
  {
    id: 'req-2',
    fullName: 'Noreen Fatima',
    mobileNumber: '03001234567',
    city: 'Karachi',
    area: 'Gulshan-e-Iqbal',
    serviceType: 'Plumber',
    description: 'Water pressure in the overhead tank pipe is too low, and there is a visible moisture line on the master bath wall.',
    status: 'Contacted',
    createdAt: '2526-06-19 02:00 AM',
  },
  {
    id: 'req-3',
    fullName: 'Khawaja Rafiq',
    mobileNumber: '03457891234',
    city: 'Islamabad',
    area: 'F-8/2',
    serviceType: 'AC Technician',
    description: 'Inverter split AC is only blowing standard fan air, no cooling. It displays an E6 communication error. Need diagnostic repair.',
    status: 'Assigned',
    createdAt: '2526-06-19 02:30 AM',
  }
];

const INITIAL_MOCK_PROS: ProfessionalRegistration[] = [
  {
    id: 'pro-1',
    fullName: 'Muhammad Kamran',
    phoneNumber: '03124567830',
    whatsAppNumber: '03124567830',
    city: 'Lahore',
    profession: 'Electrician',
    experience: 8,
    status: 'Approved',
    createdAt: '2026-06-18',
    cnicNumber: '35202-1928473-1',
  },
  {
    id: 'pro-2',
    fullName: 'Shakir Ali',
    phoneNumber: '03348912356',
    whatsAppNumber: '03348912356',
    city: 'Karachi',
    profession: 'Plumber',
    experience: 6,
    status: 'Pending',
    createdAt: '2026-06-19',
    cnicNumber: '42201-9876543-3',
  },
  {
    id: 'pro-3',
    fullName: 'Zeeshan Jameel',
    phoneNumber: '03009578123',
    whatsAppNumber: '03009578123',
    city: 'Faisalabad',
    profession: 'Solar Installer',
    experience: 5,
    status: 'Pending',
    createdAt: '2026-06-19',
    cnicNumber: '33102-1234567-5',
  }
];

export default function App() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [pros, setPros] = useState<ProfessionalRegistration[]>([]);
  const [firebaseDbStatus, setFirebaseDbStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [showCoordinatorPanel, setShowCoordinatorPanel] = useState(false);
  
  const [preSelectedService, setPreSelectedService] = useState('');
  
  // Modals for policy popups
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // References for smooth scrolling
  const requestFormRef = useRef<HTMLDivElement>(null);
  const proFormRef = useRef<HTMLDivElement>(null);

  // Load data from Firebase
  useEffect(() => {
    async function loadData() {
      try {
        setFirebaseDbStatus('connecting');
        let fetchedReqs = await firebaseService.getRequests();
        let fetchedPros = await firebaseService.getPros();

        // Seed if first time loading empty database
        if (fetchedReqs.length === 0) {
          console.log('Seeding initial mock requests to Firebase...');
          for (const item of INITIAL_MOCK_REQUESTS) {
            await firebaseService.saveRequest(item);
          }
          fetchedReqs = await firebaseService.getRequests();
        }

        if (fetchedPros.length === 0) {
          console.log('Seeding initial mock professionals to Firebase...');
          for (const item of INITIAL_MOCK_PROS) {
            await firebaseService.savePro(item);
          }
          fetchedPros = await firebaseService.getPros();
        }

        setRequests(fetchedReqs);
        setPros(fetchedPros);
        setFirebaseDbStatus('connected');
      } catch (error) {
        console.error('Firebase connection error, falling back to local storage:', error);
        setFirebaseDbStatus('error');
        
        // Fallback to localStorage
        const savedReqs = localStorage.getItem(LOCAL_STORAGE_REQ_KEY);
        const savedPros = localStorage.getItem(LOCAL_STORAGE_PRO_KEY);
        if (savedReqs) {
          setRequests(JSON.parse(savedReqs));
        } else {
          setRequests(INITIAL_MOCK_REQUESTS);
        }
        if (savedPros) {
          setPros(JSON.parse(savedPros));
        } else {
          setPros(INITIAL_MOCK_PROS);
        }
      }
    }
    loadData();
  }, []);

  const persistRequests = (updated: ServiceRequest[]) => {
    setRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_REQ_KEY, JSON.stringify(updated));
  };

  const persistPros = (updated: ProfessionalRegistration[]) => {
    setPros(updated);
    localStorage.setItem(LOCAL_STORAGE_PRO_KEY, JSON.stringify(updated));
  };

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'request-job' && requestFormRef.current) {
      requestFormRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'register-pro' && proFormRef.current) {
      proFormRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Popular Service Interaction
  const handleSelectServiceFromPopular = (serviceName: string) => {
    setPreSelectedService(serviceName);
    setTimeout(() => {
      handleScrollToSection('request-job');
    }, 100);
  };

  // City Interaction
  const handleSelectCityFromZones = (cityName: string) => {
    // Scrolls to request job and sets generic placeholder parameters if possible
    handleScrollToSection('request-job');
  };

  // Inbound Handlers
  const handleAddRequest = async (requestData: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
    const freshJob: ServiceRequest = {
      ...requestData,
      id: 'req-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    
    // Update local state immediately
    const updated = [freshJob, ...requests];
    persistRequests(updated);

    // Persist to Firebase
    try {
      await firebaseService.saveRequest(freshJob);
    } catch (e) {
      console.error('Failed to sync added request to Firebase:', e);
    }
  };

  const handleAddPro = async (proData: Omit<ProfessionalRegistration, 'id' | 'status' | 'createdAt'>) => {
    const freshPro: ProfessionalRegistration = {
      ...proData,
      id: 'pro-' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString().substring(0, 10),
    };

    // Update local state immediately
    const updated = [freshPro, ...pros];
    persistPros(updated);

    // Persist to Firebase
    try {
      await firebaseService.savePro(freshPro);
    } catch (e) {
      console.error('Failed to sync added professional to Firebase:', e);
    }
  };

  // admin updates
  const handleUpdateRequestStatus = async (id: string, status: ServiceRequest['status']) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status } : r));
    persistRequests(updated);

    try {
      await firebaseService.updateRequestStatus(id, status);
    } catch (e) {
      console.error('Failed to sync status update to Firebase:', e);
    }
  };

  const handleUpdateProStatus = async (id: string, status: ProfessionalRegistration['status']) => {
    const updated = pros.map((p) => (p.id === id ? { ...p, status } : p));
    persistPros(updated);

    try {
      await firebaseService.updateProStatus(id, status);
    } catch (e) {
      console.error('Failed to sync status update to Firebase:', e);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    const filtered = requests.filter((r) => r.id !== id);
    persistRequests(filtered);

    try {
      await firebaseService.deleteRequest(id);
    } catch (e) {
      console.error('Failed to sync deletion to Firebase:', e);
    }
  };

  const handleDeletePro = async (id: string) => {
    const filtered = pros.filter((p) => p.id !== id);
    persistPros(filtered);

    try {
      await firebaseService.deletePro(id);
    } catch (e) {
      console.error('Failed to sync deletion to Firebase:', e);
    }
  };

  const handleSeedMockData = async () => {
    // Seed locally
    const seededReqs = [...INITIAL_MOCK_REQUESTS, ...requests];
    const seededPros = [...INITIAL_MOCK_PROS, ...pros];
    persistRequests(seededReqs);
    persistPros(seededPros);

    // Seed on Firebase
    try {
      for (const item of INITIAL_MOCK_REQUESTS) {
        await firebaseService.saveRequest(item);
      }
      for (const item of INITIAL_MOCK_PROS) {
        await firebaseService.savePro(item);
      }
    } catch (e) {
      console.error('Failed to seed mock data to Firebase:', e);
    }
  };

  return (
    <div className="min-h-screen bg-white relative pb-16 md:pb-0">
      
      {/* Top verified banner */}
      <div className="bg-slate-900 text-white font-semibold text-[11px] py-2 px-4 text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1.5 flex-wrap">
          <span className="bg-emerald-500 text-slate-900 text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded mr-1">
            Helpline
          </span>
          <span>Need emergency help? Contact our helpline via</span>
          <a href="https://wa.me/923006347836" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-extrabold mx-1">WhatsApp (+92 300 6347836)</a>
          <span>or</span>
          <a href="tel:+923116347837" className="text-emerald-400 hover:underline font-extrabold ml-1">Call (0311 6347837)</a>
        </div>
      </div>

      {/* Primary Header */}
      <Header
        onScrollToSection={handleScrollToSection}
        onOpenCoordinatorPanel={() => setShowCoordinatorPanel(true)}
      />

      {/* Main Marketing Sections */}
      <main>
        <Hero
          onScrollToSection={handleScrollToSection}
          onSelectServiceTab={handleSelectServiceFromPopular}
        />

        <Services onSelectService={handleSelectServiceFromPopular} />

        <HowItWorks />

        {/* Dynamic Trust Banner */}
        <div className="bg-slate-100 border-t border-b border-slate-200/60 py-12 px-4">
          <div className="max-w-5xl mx-auto text-center grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl">🏅</span>
              <h4 className="text-lg font-black text-slate-900 mt-3">Verified Badging</h4>
              <p className="text-xs text-slate-500 font-bold mt-1">Every professional has an active CNIC & vetted field background check.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">⏱️</span>
              <h4 className="text-lg font-black text-slate-900 mt-3">Rapid Matching</h4>
              <p className="text-xs text-slate-500 font-bold mt-1">Submit description and get connected with verified regional staff in 15 mins.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🤝</span>
              <h4 className="text-lg font-black text-slate-900 mt-3">Direct Negotiations</h4>
              <p className="text-xs text-slate-500 font-bold mt-1">Discuss work quotes directly on phone line with zero commission hikes.</p>
            </div>
          </div>
        </div>

        <WhyChooseUs />

        {/* Interactive Leads Form Grid Zone */}
        <LeadForms
          onSubmitRequest={handleAddRequest}
          onSubmitProRegistration={handleAddPro}
          preSelectedService={preSelectedService}
          requestFormRef={requestFormRef}
          proFormRef={proFormRef}
        />

        {/* Pakistan Metropolitans Area Cards */}
        <Cities onSelectCity={handleSelectCityFromZones} />

        <Reviews />

        {/* "About FixKerpk" Core Section */}
        <section id="about-us" className="py-20 bg-slate-900 text-white border-t border-slate-850">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              
              <div className="md:col-span-8 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Info className="w-3.5 h-3.5 mr-1.5" /> About FixKer.pk
                </div>
                
                <h3 className="text-3xl font-black tracking-tight text-white leading-tight">
                  Our Mission: Bringing Reliability & Safety To Every Household
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                  FixKer.pk was born to address the core challenges of hiring local home services in Pakistan—namely, lack of reliability, opaque pricing structures, and identity transparency concerns. Our mandate is simple: to make it incredibly easy, fast, and completely safe for every Pakistani family and commercial corporate setup to hire vetted professionals at a moment’s notice.
                </p>

                <p className="text-sm text-slate-400 font-semibold leading-relaxed">
                  Whether you are dealing with a severe plumbing emergency in Lahore DHA, needing a pristine commercial solar system installed on your factory roof in Faisalabad, or looking for an honest painter in Karachi Clifton—we link you with local experts directly. 
                </p>
              </div>

              <div className="md:col-span-4 bg-slate-800 border border-slate-755/60 p-6 rounded-2xl">
                <h4 className="font-extrabold text-white text-base">Verified Statistics</h4>
                <div className="space-y-4 mt-6">
                  <div>
                    <span className="text-xs text-slate-400 block font-bold uppercase">Cities Reached</span>
                    <span className="text-2xl font-black text-blue-400">10+ Cities</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold uppercase">Staff Registered</span>
                    <span className="text-2xl font-black text-emerald-400">1,900+ Techs</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-bold uppercase">Ratings Rank</span>
                    <span className="text-2xl font-black text-amber-400">4.9/5 ★</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <FAQSection />
      </main>

      {/* Global Interactive Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenPrivacyModal={() => setActiveModal('privacy')}
        onOpenTermsModal={() => setActiveModal('terms')}
      />

      {/* Persistent floating click helpers */}
      <StickyActions />

      {/* COORDINATOR / ID CARD VERIFICATION DATABASE PANEL */}
      {showCoordinatorPanel && (
        <CoordinatorDashboard
          pros={pros}
          onUpdateProStatus={handleUpdateProStatus}
          onDeletePro={handleDeletePro}
          onSeedMockData={handleSeedMockData}
          firebaseDbStatus={firebaseDbStatus}
          onClose={() => setShowCoordinatorPanel(false)}
        />
      )}

      {/* LEGAL DOCUMENT MODALS (Interactive Popups for high conversion trust) */}
      {activeModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col justify-between">
            <div className="p-6 sm:p-8 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <h3 className="text-lg font-black text-slate-900">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded bg-slate-100 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeModal === 'privacy' ? (
                <div className="space-y-3.5 text-xs text-slate-500 font-semibold leading-relaxed">
                  <p>
                    <b>1. Personal Data Collected:</b> We collect names, mobile numbers, city names, and problem descriptions so regional coordinators can facilitate connecting you with verified nearby skilled professionals.
                  </p>
                  <p>
                    <b>2. Direct Communications:</b> Submitted information is shared strictly with the matched professional to facilitate direct service quotes on WhatsApp or standard phone communication.
                  </p>
                  <p>
                    <b>3. Safe Storage:</b> We never sell or share customer contact databases with external marketing channels. Your data is stored securely in accordance with local regulations in Pakistan.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs text-slate-500 font-semibold leading-relaxed">
                  <p>
                    <b>1. Platform Facilitation:</b> FixKer.pk operates strictly as a matching system/lead generation network. We connect customers with independent skilled professionals.
                  </p>
                  <p>
                    <b>2. Independent Pricing Negotiation:</b> All services, schedules, and job pricing quotes are discussed and agreed upon directly between the customer and the matched professional on WhatsApp/phone line. FixKer holds zero commission or platform fee.
                  </p>
                  <p>
                    <b>3. Limitation of Liability:</b> FixKer.pk makes every reasonable effort to verify workers via CNIC and feedback checking. However, safety verification remains the mutual responsibility of customers and professionals. Always verify ID credentials before granting entry.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
