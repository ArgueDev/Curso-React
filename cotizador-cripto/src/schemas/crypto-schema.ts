import { z } from 'zod';

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
});

export const CryptoResponseSchema = z.object({
    NAME: z.string(),
    SYMBOL: z.string()
});

export const CryptoCurrencySchema = z.array(CryptoResponseSchema);