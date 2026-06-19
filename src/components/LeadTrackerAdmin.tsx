import { useState } from 'react';
import { ServiceRequest, ProfessionalRegistration } from '../types';
import { Database, Users, ShieldAlert, Phone, MapPin, ClipboardList, CheckCircle2, ChevronRight, X, Fingerprint, CreditCard } from 'lucide-react';

interface LeadTrackerAdminProps {
  requests: ServiceRequest[];
  registrations: ProfessionalRegistration[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateRequestStatus: (id: string, status: ServiceRequest['status']) => void;
  onUpdateProStatus: (id: string, status: ProfessionalRegistration['status']) => void;
  onDeleteRequest: (id: string) => void;
  onDeletePro: (id: string) => void;
  onSeedMockData: () => void;
}

export default function LeadTrackerAdmin({
  requests,
  registrations,
  isOpen,
  onClose,
  onUpdateRequestStatus,
  onUpdateProStatus,
  onDeleteRequest,
  onDeletePro,
  onSeedMockData,
}: LeadTrackerAdminProps) {
  const [expandedCnics, setExpandedCnics] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-4xl bg-white h-full min-h-screen shadow-2xl flex flex-col animate-slide-left">
        
        {/* Header bar */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">FixKer.pk Admin CRM Console</h2>
              <p className="text-[10px] text-slate-400 font-mono">Lead Generation & Partner Activation Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-755 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Panel */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div>
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-200/50 px-2.5 py-0.5 rounded-md">
              Testing Playground
            </span>
            <p className="text-xs text-slate-500 font-bold mt-1">
              Data is saved in browser memory. Submit website forms or seed mock data to see leads pop up instantly!
            </p>
          </div>
          <button
            onClick={onSeedMockData}
            className="px-4 py-2 text-xs font-black text-white bg-primary hover:bg-primary-hover rounded-lg transition-all shadow-xs cursor-pointer"
          >
            Seed Mock Requests & Pros
          </button>
        </div>

        {/* Content body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 text-left">
          
          {/* SEC 1: Inbound Lead Requests */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-4 h-4 text-primary" />
                <h3 className="font-extrabold text-slate-900 text-base">Inbound Customer Service Requests ({requests.length})</h3>
              </div>
            </div>

            {requests.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-sm text-slate-500 font-bold">No active service requests submitted yet.</p>
                <p className="text-xs text-slate-400 font-bold mt-1">Submit the customer request form on the homepage to register a request.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 border border-slate-200 bg-white rounded-xl shadow-xs relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-primary bg-blue-50 px-2 py-1 rounded-md">
                          ⚡ {req.serviceType}
                        </span>
                        
                        {/* Status Select dropdown */}
                        <select
                          value={req.status}
                          onChange={(e) => onUpdateRequestStatus(req.id, e.target.value as ServiceRequest['status'])}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md outline-none bg-slate-100/80 border border-gray-200 ${
                            req.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            req.status === 'Assigned' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            req.status === 'Contacted' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                            'bg-red-50 text-red-600 border-red-200 animate-pulse'
                          }`}
                        >
                          <option value="Pending">🔴 Pending Match</option>
                          <option value="Contacted">🔵 Contacted Client</option>
                          <option value="Assigned">🟡 Tech Assigned</option>
                          <option value="Completed">🟢 Job Completed</option>
                        </select>
                      </div>

                      {/* Info lines */}
                      <h4 className="font-extrabold text-slate-900 text-base">{req.fullName}</h4>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-500 font-bold mt-2">
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {req.city} ({req.area})
                        </span>
                        <a href={`tel:${req.mobileNumber}`} className="flex items-center text-primary hover:underline">
                          <Phone className="w-3.5 h-3.5 mr-1" /> {req.mobileNumber}
                        </a>
                      </div>

                      <p className="mt-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium leading-relaxed font-semibold">
                        {req.description}
                      </p>
                    </div>

                    {/* Bottom row actions */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-[10px]">
                      <span className="text-slate-400 font-bold">{req.createdAt}</span>
                      <div className="flex items-center space-x-2">
                        <a
                          href={`https://wa.me/92${req.mobileNumber.replace(/^0/, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(req.fullName)},%20this%20is%20FixKer%20verification.%20Do%20you%20still%20need%20the%20${encodeURIComponent(req.serviceType)}%20service?`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-accent text-white font-extrabold hover:bg-emerald-600 text-[10px]"
                        >
                          WhatsApp Customer
                        </a>
                        <button
                          onClick={() => onDeleteRequest(req.id)}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-black rounded text-[10px] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEC 2: Partner Applications */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-accent" />
                <h3 className="font-extrabold text-slate-900 text-base">Registered Professional Partners ({registrations.length})</h3>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-sm text-slate-500 font-bold">No partner applications submitted yet.</p>
                <p className="text-xs text-slate-400 font-bold mt-1">Submit the join-pro registration form at the bottom of the page to apply.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registrations.map((pro) => (
                  <div
                    key={pro.id}
                    className="p-5 border border-slate-200 bg-white rounded-xl shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge Header Row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-accent bg-emerald-50 px-2 py-1 rounded-md">
                          🛠️ {pro.profession}
                        </span>
                        
                        {/* Status dropdown */}
                        <select
                          value={pro.status}
                          onChange={(e) => onUpdateProStatus(pro.id, e.target.value as ProfessionalRegistration['status'])}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md outline-none bg-slate-100/80 border border-slate-200 ${
                            pro.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            pro.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                            'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                          }`}
                        >
                          <option value="Pending">🟡 Pending Review</option>
                          <option value="Approved">🟢 Approved Partner</option>
                          <option value="Rejected">🔴 Rejected</option>
                        </select>
                      </div>

                      {/* Partner Name info */}
                      <h4 className="font-extrabold text-slate-900 text-base">{pro.fullName}</h4>
                      
                      <div className="space-y-1 mt-2 text-xs text-slate-500 font-bold">
                        <p className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> City Location: <b className="text-slate-800 ml-1">{pro.city}</b>
                        </p>
                        <p className="flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Verified Experience: <b className="text-slate-800 ml-1">{pro.experience} Years</b>
                        </p>
                        <p className="flex items-center">
                          <CreditCard className="w-3.5 h-3.5 mr-1.5 text-blue-500 animate-pulse" /> CNIC Card No: <b className="text-slate-800 ml-1 font-mono tracking-tight">{pro.cnicNumber || '12345-6789012-3'}</b>
                        </p>
                      </div>

                      {/* CNIC verification drop drawer control */}
                      {pro.cnicFrontImage || pro.cnicBackImage ? (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => setExpandedCnics(prev => ({ ...prev, [pro.id]: !prev[pro.id] }))}
                            className={`w-full py-1.5 px-3 rounded text-[10px] font-black flex items-center justify-between border transition-all cursor-pointer ${
                              expandedCnics[pro.id]
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="flex items-center">
                              <Fingerprint className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> 
                              {expandedCnics[pro.id] ? 'Hide Verification Materials' : 'Review Identity Scans'}
                            </span>
                            <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded-full font-black scale-90">
                              2 Docs
                            </span>
                          </button>

                          {expandedCnics[pro.id] && (
                            <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-3 animate-fade-in text-left">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1 text-center">
                                  <span className="text-[9px] uppercase font-black text-slate-400 block font-mono">Front Scan</span>
                                  {pro.cnicFrontImage ? (
                                    <div className="relative group overflow-hidden rounded border border-slate-200 bg-white shadow-xs p-1">
                                      <img
                                        src={pro.cnicFrontImage}
                                        alt="CNIC Front Scan"
                                        referrerPolicy="no-referrer"
                                        className="h-16 w-full object-contain hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-slate-400 font-bold block py-2 bg-slate-100 rounded">No Image</span>
                                  )}
                                </div>

                                <div className="space-y-1 text-center">
                                  <span className="text-[9px] uppercase font-black text-slate-400 block font-mono">Back Scan</span>
                                  {pro.cnicBackImage ? (
                                    <div className="relative group overflow-hidden rounded border border-slate-200 bg-white shadow-xs p-1">
                                      <img
                                        src={pro.cnicBackImage}
                                        alt="CNIC Back Scan"
                                        referrerPolicy="no-referrer"
                                        className="h-16 w-full object-contain hover:scale-110 transition-transform duration-300"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-slate-400 font-bold block py-2 bg-slate-100 rounded">No Image</span>
                                  )}
                                </div>
                              </div>
                              <p className="text-[9px] text-slate-500 font-semibold text-center leading-normal">
                                Identity verified on local environment. View cards carefully before updating badge approval status.
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-3 p-2 rounded bg-slate-50 border border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                          <span className="flex items-center text-slate-400 font-bold">
                            <Fingerprint className="w-3.5 h-3.5 mr-1.5 text-slate-350" /> ID Scan Status:
                          </span>
                          <span className="font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[9px]">Pending ID Upload (Pre-seeded)</span>
                        </div>
                      )}

                      {/* Contacts info */}
                      <div className="mt-3.5 grid grid-cols-2 gap-2 text-center text-[10px] font-black animate-fade-in">
                        <a
                          href={`tel:${pro.phoneNumber}`}
                          className="py-1.5 rounded bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none"
                        >
                          📞 Call Tech
                        </a>
                        <a
                          href={`https://wa.me/92${pro.whatsAppNumber.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="py-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 focus:outline-none"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </div>

                    {/* Bottom row actions */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-[10px]">
                      <span className="text-slate-400 font-bold">{pro.createdAt}</span>
                      <button
                        onClick={() => onDeletePro(pro.id)}
                        className="text-red-500 hover:text-red-700 font-black cursor-pointer"
                      >
                        Delete Partner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer info inside Admin */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-bold flex items-center justify-between">
          <p>Logged in as admin group (FixKer.pk CRM)</p>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black cursor-pointer text-xs"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
