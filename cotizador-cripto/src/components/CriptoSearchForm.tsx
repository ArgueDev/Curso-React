import { useState, type ChangeEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CriptoSearchForm() {

    const crypto = useCryptoStore((state) => state.crypto);
    const fetchData = useCryptoStore((state) => state.fetchData);
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setError('');

        // Consultar la API
        fetchData(pair);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option
                            value={currency.code}
                            key={currency.code}
                        >
                            {currency.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda:</label>
                <select
                    name="cryptocurrency"
                    id="cryptocurrency"
                    onChange={handleChange}
                    value={pair.cryptocurrency}
                >
                    <option value="">-- Seleccione --</option>
                    {crypto.map(crypto => (
                        <option
                            value={crypto.SYMBOL}
                            key={crypto.SYMBOL}
                        >
                            {crypto.NAME}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" value='Cotizar' />
        </form>
    );
}
