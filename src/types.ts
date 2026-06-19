export interface ServiceRequest {
  id: string;
  fullName: string;
  mobileNumber: string;
  city: string;
  area: string;
  serviceType: string;
  description: string;
  status: 'Pending' | 'Contacted' | 'Assigned' | 'Completed';
  createdAt: string;
}

export interface ProfessionalRegistration {
  id: string;
  fullName: string;
  phoneNumber: string;
  whatsAppNumber: string;
  city: string;
  profession: string;
  experience: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  cnicNumber: string;
  cnicFrontImage?: string;
  cnicBackImage?: string;
}

export interface ProfessionalProfile {
  id: string;
  name: string;
  profession: string;
  experience: number;
  rating: number;
  city: string;
  imageUrl: string;
  completedJobs: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  service: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CityInfo {
  name: string;
  urduName: string;
  professionalCount: number;
}
