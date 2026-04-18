import { create } from 'zustand';
import type { CryptoCurrency, CryptoPrice, Pair } from './types';
import { devtools } from "zustand/middleware";
import { fetchCryptoPrice, getCrypto } from './services/CryptoService';

type CryptoStore = {
    crypto: CryptoCurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCrypto: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    crypto: [],
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,

    fetchCrypto: async () => {
        const crypto = await getCrypto();
        set(() => ({
            crypto
        }))
    },

    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))

        const result = await fetchCryptoPrice(pair);
        set(() => ({
            result,
            loading: false
        }))
    }
})))