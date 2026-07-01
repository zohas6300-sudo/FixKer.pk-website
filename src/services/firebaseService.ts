import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { ServiceRequest, ProfessionalRegistration } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
      handleFirestoreError(e, OperationType.GET, REQUESTS_COLL);
    }
  },

  // Add or edit service request
  async saveRequest(request: ServiceRequest): Promise<void> {
    try {
      await setDoc(doc(db, REQUESTS_COLL, request.id), request);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${REQUESTS_COLL}/${request.id}`);
    }
  },

  // Update status of a service request
  async updateRequestStatus(id: string, status: ServiceRequest['status']): Promise<void> {
    try {
      const ref = doc(db, REQUESTS_COLL, id);
      await updateDoc(ref, { status });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${REQUESTS_COLL}/${id}`);
    }
  },

  // Delete a service request
  async deleteRequest(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, REQUESTS_COLL, id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${REQUESTS_COLL}/${id}`);
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
      handleFirestoreError(e, OperationType.GET, PROS_COLL);
    }
  },

  // Save pro registration
  async savePro(pro: ProfessionalRegistration): Promise<void> {
    try {
      await setDoc(doc(db, PROS_COLL, pro.id), pro);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${PROS_COLL}/${pro.id}`);
    }
  },

  // Update status of professional
  async updateProStatus(id: string, status: ProfessionalRegistration['status']): Promise<void> {
    try {
      const ref = doc(db, PROS_COLL, id);
      await updateDoc(ref, { status });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `${PROS_COLL}/${id}`);
    }
  },

  // Delete a professional registration
  async deletePro(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PROS_COLL, id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `${PROS_COLL}/${id}`);
    }
  }
};
