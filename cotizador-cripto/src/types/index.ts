import { z } from 'zod';
import { CryptoPriceSchema, CryptoResponseSchema, CurrencySchema, PairSchema } from '../schemas/crypto-schema';

export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoResponseSchema>;
export type Pair = z.infer<typeof PairSchema>;
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>;