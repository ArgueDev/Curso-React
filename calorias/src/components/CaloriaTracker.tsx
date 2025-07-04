import CaloriaDisplay from "./CaloriaDisplay";
import { useActivity } from "../hooks/useActivity";


export default function CaloriaTracker() {

    const { caloriasConsumed, caloriasBurned, netCalorias } = useActivity();

    return (
        <>
            <h2 className="font-black text-4xl text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriaDisplay
                    calorias={caloriasConsumed}
                    texto="Consumidas"
                    color="text-lime-500"
                />
                <CaloriaDisplay
                    calorias={caloriasBurned}
                    texto="Consumidas"
                    color="text-orange-500"
                />
                <CaloriaDisplay
                    calorias={netCalorias}
                    texto="Diferencia de Calorias"
                    color="text-white"
                />
            </div>
        </>
    )
}
