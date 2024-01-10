"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import * as solanaWeb3 from '@solana/web3.js';

const getTransaction = async (address: string): Promise<solanaWeb3.ConfirmedSignatureInfo[]> => {
  const MAIN_NET = solanaWeb3.clusterApiUrl('mainnet-beta');
  const solanaConnection = new solanaWeb3.Connection(MAIN_NET);
  
  const getAddressTransactions = async (address: string, numTx = 10): Promise<solanaWeb3.ConfirmedSignatureInfo[]> => {
      const pubKey = new solanaWeb3.PublicKey(address);
      console.log(pubKey);
      
      const transactionList = await solanaConnection.getSignaturesForAddress(pubKey, { limit: numTx });
      console.log(transactionList);
    
      return transactionList;
  };

  return getAddressTransactions(address);
}

export default function HistoryTransaction() {
  const [transactions, setTransactions] = useState<solanaWeb3.ConfirmedSignatureInfo[] | null>(null);
  // const address = "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"; // Replace with the actual address
  const params = useParams()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getTransaction(params.address as string);
        console.log(balanceData);
        
        setTransactions(balanceData);
        
      } catch (error) {
        console.error('Error fetching balance:', error);
        setTransactions(null);
      }
    };

    fetchBalance();
  }, [params.address]);

  return (
    <div>
      {transactions ? (
        transactions.map((transaction, index) => (
          <div key={index}>
            <p className='text text-xs'> {transaction.blockTime}</p>
            <p className='text text-xs'> {transaction.confirmationStatus}</p>
            <p className='text text-xs'> {transaction.memo}</p>
            <p className='text text-xs'> {transaction.signature}</p>
            <p className='text text-xs'> {transaction.slot}</p>
          </div>
        ))
      ) : (
        <span className='loading'></span>
      )}
    </div>
  );
}
