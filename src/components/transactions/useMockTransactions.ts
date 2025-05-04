import { useState, useEffect } from "react";
import { Transaction } from "./types";

export const useMockTransactions = (limit: number, propTransactions?: Transaction[]) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // If transactions are provided as props, use them
    if (propTransactions && propTransactions.length > 0) {
      // Map the incoming transactions format to our internal format if needed
      const mappedTransactions = propTransactions.map(tx => {
        // If transaction already has a name, use it; otherwise try to get from user object
        if (!tx.name && tx.user) {
          return {
            ...tx,
            name: tx.user.name,
          };
        }
        return tx;
      });
      
      setTransactions(mappedTransactions.slice(0, limit));
      return;
    }
    
    // Otherwise use mock data (this would normally be an API call)
    const mockTransactions: Transaction[] = [
      {
        id: "tx1",
        type: "receive",
        amount: 15000,
        name: "Amadou Diallo",
        date: new Date(2025, 4, 1),
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: "tx2",
        type: "send",
        amount: 5000,
        name: "Fatou Sow",
        date: new Date(2025, 4, 1),
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "tx3",
        type: "payment",
        amount: 7500,
        name: "Orange Télécom",
        date: new Date(2025, 3, 30),
      },
      {
        id: "tx4",
        type: "receive",
        amount: 35000,
        name: "Ibrahim Touré",
        date: new Date(2025, 3, 28),
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "tx5",
        type: "send",
        amount: 12000,
        name: "Aicha Koné",
        date: new Date(2025, 3, 27),
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "tx6",
        type: "payment",
        amount: 25000,
        name: "Loyer Mensuel",
        date: new Date(2025, 3, 26),
      },
    ];

    setTransactions(mockTransactions.slice(0, limit));
  }, [limit, propTransactions]);

  return transactions;
};
