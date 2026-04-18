import axios from "axios";
import { CryptoCurrencySchema, CryptoPriceSchema } from "../schemas/crypto-schema";
import type { Pair } from "../types";

export async function getCrypto() {
    const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=10';
    const { data: { Data: { LIST } } } = await axios(url);
    
    const result = CryptoCurrencySchema.safeParse(LIST);
    
    if (result.success) {
        return result.data;
    }   
}

export async function fetchCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`;
    const { data: {DISPLAY} } = await axios(url);
    
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency]);

    if (result.success) { 
        return result.data;
    }
    
}