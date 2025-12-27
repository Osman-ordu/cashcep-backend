import { QuickTransaction } from './quickTransactions.schema';

export class QuickTransactionsService {
  async getQuickTransactions(): Promise<QuickTransaction[]> {
    // Mock data - gerçek uygulamada veritabanından veya API'den çekilebilir
    const transactions: QuickTransaction[] = [
      {
        id: '1',
        baseAsset: 'TRY',
        quoteAsset: 'USD',
        amount: 100,
        transactionDate: new Date(),
        total: 4200,
      },
      {
        id: '2',
        baseAsset: 'TRY',
        quoteAsset: 'EUR',
        amount: 100,
        transactionDate: new Date(),
        total: 5100,
      },
    ];

    return transactions;
  }
}

export default new QuickTransactionsService();

