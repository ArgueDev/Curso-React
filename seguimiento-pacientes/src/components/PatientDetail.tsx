import { toast } from 'react-toastify';

import type { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";
import { usePatientStore } from "../store";

type PatientDetailProps = {
  patient: Patient;
};

export default function PatientDetail({ patient }: PatientDetailProps) {

  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);

  const handleClickDelete = () => {
    deletePatient(patient.id);
    toast.error('Paciente Eliminado Correctamente', {
      theme: 'colored',
      hideProgressBar: true
    })
  }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha de alta" data={patient.date.toString()} />
      <PatientDetailItem label="Sintomas" data={patient.symptoms} />
      <div className="flex flex-col md:flex-row gap-3 justify-between mt-10">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-bold uppercase rounded-lg"
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>
        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 cursor-pointer text-white font-bold uppercase rounded-lg"
          onClick={handleClickDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
