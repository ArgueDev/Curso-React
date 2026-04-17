import { create } from 'zustand';
import axios from 'axios';
import { CryptoCurrencySchema } from './schemas/crypto-schema';
import type { CryptoCurrency } from './types';
import { devtools } from "zustand/middleware";

type CryptoStore = {
    crypto: CryptoCurrency[],
    fetchCrypto: () => Promise<void>
}

async function getCrypto() {
    const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=10';
    const {data: {Data: {LIST}}} = await axios(url);
    
    const result = CryptoCurrencySchema.safeParse(LIST);
    
    if (result.success) {
        return result.data;
    }
    
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    crypto: [],
    fetchCrypto: async () => {
        const crypto = await getCrypto();
        set(() => ({
            crypto
        }))
    }
})))