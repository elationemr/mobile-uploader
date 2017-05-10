import { createRouter } from '@expo/ex-navigation';
import PatientView from 'views/patient/PatientView';
import PatientSearchView from 'views/patient-search/PatientSearchView';
import UploadInsuranceView from 'views/upload-insurance/UploadInsuranceView';
import UploadDocumentView from 'views/upload-document/UploadDocumentView';


const router = createRouter(() => ({
  patientSearch: () => PatientSearchView,
  patient: () => PatientView,
  uploadInsurance: () => UploadInsuranceView,
  uploadDocument: () => UploadDocumentView,
}));

export default router;
