import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { db } from '../firebase';
import { ServiceRequest, ProfessionalRegistration } from '../types';

const REQUESTS_COLL = 'service_requests';
const PROS_COLL = 'pros';

export const firebaseService = {
  // Get all service requests ordered by createdAt descending
  async getRequests(): Promise<ServiceRequest[]> {
    try {
      const q = query(collection(db, REQUESTS_COLL));
      const querySnapshot = await getDocs(q);
      const items: ServiceRequest[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ServiceRequest);
      });
      // Sort by createdAt descending
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      console.error('Error fetching service requests:', e);
      throw e;
    }
  },

  // Add or edit service request
  async saveRequest(request: ServiceRequest): Promise<void> {
    try {
      await setDoc(doc(db, REQUESTS_COLL, request.id), request);
    } catch (e) {
      console.error('Error saving request:', e);
      throw e;
    }
  },

  // Update status of a service request
  async updateRequestStatus(id: string, status: ServiceRequest['status']): Promise<void> {
    try {
      const ref = doc(db, REQUESTS_COLL, id);
      await updateDoc(ref, { status });
    } catch (e) {
      console.error('Error updating request status:', e);
      throw e;
    }
  },

  // Delete a service request
  async deleteRequest(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, REQUESTS_COLL, id));
    } catch (e) {
      console.error('Error deleting request:', e);
      throw e;
    }
  },

  // Get all pro registrations
  async getPros(): Promise<ProfessionalRegistration[]> {
    try {
      const q = query(collection(db, PROS_COLL));
      const querySnapshot = await getDocs(q);
      const items: ProfessionalRegistration[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ProfessionalRegistration);
      });
      // Sort by createdAt descending
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      console.error('Error fetching professionals:', e);
      throw e;
    }
  },

  // Save pro registration
  async savePro(pro: ProfessionalRegistration): Promise<void> {
    try {
      await setDoc(doc(db, PROS_COLL, pro.id), pro);
    } catch (e) {
      console.error('Error saving professional:', e);
      throw e;
    }
  },

  // Update status of professional
  async updateProStatus(id: string, status: ProfessionalRegistration['status']): Promise<void> {
    try {
      const ref = doc(db, PROS_COLL, id);
      await updateDoc(ref, { status });
    } catch (e) {
      console.error('Error updating professional status:', e);
      throw e;
    }
  },

  // Delete a professional registration
  async deletePro(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PROS_COLL, id));
    } catch (e) {
      console.error('Error deleting pro:', e);
      throw e;
    }
  }
};
