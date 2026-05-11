import type { Drink } from "../types"
import { useAppStore } from "../store/useAppStore"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {

    const selectReceta = useAppStore((state) => state.selectReceta);

    return (
        <div className="shadow-lg rounded-xl">
            <div className="overflow-hidden rounded-t-xl">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform"
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-xl cursor-pointer"
                    onClick={() => selectReceta(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}
