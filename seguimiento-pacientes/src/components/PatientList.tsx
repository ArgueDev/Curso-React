import { usePatientStore } from "../store"
import PatienDetail from "../components/PatientDetail";

export default function PatientList() {
  
  const patients = usePatientStore(state => state.patients);

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {' '}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {patients.map(patient => (
            <PatienDetail
              key={patient.id}
              patient={patient}
            />
          ))}
        </>
      ) : (
          <>
            <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {" "}
              <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
            </p>
          </>
      )}
    </div>
  )
}
