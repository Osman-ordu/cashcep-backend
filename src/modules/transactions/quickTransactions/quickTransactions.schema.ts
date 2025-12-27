import { z } from 'zod';

export interface QuickTransaction {
  id: string;
  baseAsset: string;
  quoteAsset: string;
  amount: number;
  transactionDate: Date;
  total: number;
}

export type QuickTransactionResponse = QuickTransaction[];

