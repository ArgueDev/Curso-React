export type Patient = {
    id: string;
    name: string;
    caretaker: string;
    email: string;
    date: Date;
    symptoms: string;
    maxLenght?: string; // Optional field for max length error
    pattern?: string; // Optional field for pattern error
}

export type DraftPatient = Omit<Patient, 'id'>;