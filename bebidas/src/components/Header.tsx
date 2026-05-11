import { useEffect, useMemo, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const path = useLocation();
    const isHome = useMemo(() => path.pathname === '/', [path.pathname]);

    const fetchCategorias = useAppStore((state) => state.fetchCategorias);
    const categorias = useAppStore((state) => state.categorias);
    const searchRecetas = useAppStore((state) => state.searchRecetas);

    useEffect(() => {
        fetchCategorias()
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if (Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        }

        // Consultar las recetas
        searchRecetas(searchFilters)

    }

    return (
        <header className={isHome ? "bg-[url(/img/bg.jpg)] bg-center bg-cover" : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img
                            src="/img/logo.svg"
                            alt="logotipo"
                            className="w-32"
                        />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to='/' className={({ isActive }) =>
                            isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                        }>Inicio</NavLink>
                        <NavLink to='/favoritos' className={({ isActive }) =>
                            isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                        }>Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o Ingredientes
                            </label>
                            <input 
                                type="text" 
                                name="ingredient" 
                                id="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white" 
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Gin, etc."
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>
                        <div className="space-y-4">
                            <label 
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoria
                            </label>
                            <select
                                name="category" 
                                id="category"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="" disabled>-- Seleciona --</option>
                                {categorias.drinks.map((drink) => (
                                    <option value={drink.strCategory} key={drink.strCategory}>{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value='Buscar Recetas'
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
