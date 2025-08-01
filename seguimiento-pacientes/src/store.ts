import { create } from 'zustand';
import type { DraftPatient, Patient } from './types';
import { v4 as uuidv4 } from 'uuid';

type PatientState = {
    patients: Patient[];
    addPatient: (data: DraftPatient) => void;
}

const createPatient = (patient: DraftPatient): Patient => {
    return { ...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    
    addPatient: (data) => {
        
        const newPatient = createPatient(data);

        set((state) => ({
            patients: [...state.patients, newPatient]
        }))

    }

}))