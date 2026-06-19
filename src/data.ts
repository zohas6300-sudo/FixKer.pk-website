import { ProfessionalProfile, Testimonial, FAQ, CityInfo } from './types';

export const CITIES_SERVED: CityInfo[] = [
  { name: 'Lahore', urduName: 'لاہور', professionalCount: 340 },
  { name: 'Karachi', urduName: 'کراچی', professionalCount: 420 },
  { name: 'Islamabad', urduName: 'اسلام آباد', professionalCount: 190 },
  { name: 'Rawalpindi', urduName: 'راولپنڈی', professionalCount: 220 },
  { name: 'Multan', urduName: 'ملتان', professionalCount: 150 },
  { name: 'Faisalabad', urduName: 'فیصل آباد', professionalCount: 180 },
  { name: 'Gujranwala', urduName: 'گوجرانوالہ', professionalCount: 140 },
  { name: 'Sialkot', urduName: 'سیالکوٹ', professionalCount: 110 },
  { name: 'Peshawar', urduName: 'پشاور', professionalCount: 130 },
  { name: 'Bahawalpur', urduName: 'بہاولپور', professionalCount: 95 },
];

export const POPULAR_SERVICES = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Wiring, short circuit fixes, fan & light installation, UPS setup.' },
  { id: 'plumber', name: 'Plumber', icon: '🚿', description: 'Leaking pipes, washroom fittings, geyser repair, water tank clean.' },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', description: 'Door repair, kitchen cabinets, sofa polishing, locks & wooden work.' },
  { id: 'welder', name: 'Welder', icon: '🔩', description: 'Gate repair, safety grills, iron structures, master fabrication.' },
  { id: 'solar', name: 'Solar Installer', icon: '☀', description: 'Solar panel mount, inverter setup, net metering, battery config.' },
  { id: 'ac', name: 'AC Technician', icon: '❄', description: 'AC gas charging, filter wash, master leakage fix, inverter service.' },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Wall paint, wood Polish, weatherproof coating, modern wall putty.' },
  { id: 'handyman', name: 'Handyman', icon: '🔨', description: 'TV mounting, wall drills, lock change, general home fixes.' },
];

export const FEATURED_PROFESSIONALS: ProfessionalProfile[] = [
  {
    id: 'p1',
    name: 'Zahid Iqbal',
    profession: 'Electrician & UPS Specialist',
    experience: 9,
    rating: 4.9,
    city: 'Lahore',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    completedJobs: 247,
  },
  {
    id: 'p2',
    name: 'Mohsin Raza',
    profession: 'Master Plumber & Gas Fitter',
    experience: 8,
    rating: 4.9,
    city: 'Karachi',
    imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80',
    completedJobs: 215,
  },
  {
    id: 'p3',
    name: 'Faisal Shahzad',
    profession: 'AC & Inverter Expert',
    experience: 8,
    rating: 4.9,
    city: 'Islamabad',
    imageUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=400&q=80',
    completedJobs: 312,
  },
  {
    id: 'p4',
    name: 'Nadeem Abbas',
    profession: 'Professional Solar Installer',
    experience: 7,
    rating: 4.8,
    city: 'Rawalpindi',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    completedJobs: 142,
  },
  {
    id: 'p5',
    name: 'Kashif Siddiqui',
    profession: 'Premium Home Painter',
    experience: 11,
    rating: 4.7,
    city: 'Multan',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    completedJobs: 415,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha Khan',
    role: 'Homeowner',
    city: 'Lahore (DHA)',
    rating: 5,
    comment: 'FixKer match made my life so easy! I submitted a request for a short circuit issue in our home at 8:00 PM, and by 8:30 PM, Asif was at our door. Professional, reasonable rate, and excellent service.',
    service: 'Electrician',
  },
  {
    id: 't2',
    name: 'Babar Azam',
    role: 'Office Manager',
    city: 'Karachi (Clifton)',
    rating: 5,
    comment: 'We needed a quick installation of 4 AC units before an important client meeting. The AC technician did an amazing job with proper piping. No hassle, very polite, highly recommended!',
    service: 'AC Technician',
  },
  {
    id: 't3',
    name: 'Zainab Bibi',
    role: 'Homeowner',
    city: 'Islamabad (F-11)',
    rating: 5,
    comment: 'Extremely professional plumbers. They solved our hidden water leakage issue that 3 other local plumbers couldn’t fix. FixKer.pk verified badge is truly reliable.',
    service: 'Plumber',
  },
  {
    id: 't4',
    name: 'Sohail Tanvir',
    role: 'Factory Supervisor',
    city: 'Faisalabad',
    rating: 4,
    comment: 'Excellent solar setup installation for our commercial warehouse. Professional earthing, wiring, and neat battery layout. Saved us immensely in energy costs.',
    service: 'Solar Installer',
  },
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'How does FixKer.pk work?',
    answer: 'It is simple! Select your required service and submit the form with your details. Within minutes, we match your request with our verified local professionals who will reach out to you via Phone or WhatsApp to discuss pricing and schedule.',
  },
  {
    id: 'f2',
    question: 'How much does it cost to use FixKer.pk?',
    answer: 'Submitting a service request and getting connected with professionals is 100% free for customers. You negotiate the job cost/rates directly with the matched professional with zero commission or hidden fees from us.',
  },
  {
    id: 'f3',
    question: 'Are the professionals verified?',
    answer: 'Yes! We run basic verification checks, including CNIC verification, phone line checks, past customer satisfaction reviews, and an evaluation of their technical expertise before onboarding professionals.',
  },
  {
    id: 'f4',
    question: 'Can I join FixKer.pk as a service partner?',
    answer: 'Absolutely! If you are a skilled professional, register using the "Join as Professional" form. Our team will verify your details and connect you with active paying customers in your city.',
  },
  {
    id: 'f5',
    question: 'How fast will a professional contact me?',
    answer: 'Most customers receive a phone call or WhatsApp message within 5 to 30 minutes after submitting their request during business hours (8 AM to 10 PM, 7 days a week).',
  },
];
