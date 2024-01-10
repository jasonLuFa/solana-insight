"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import * as solanaWeb3 from '@solana/web3.js';

const Lamport = 1_000_000_000

const getTransaction = async (address: string): Promise<solanaWeb3.ConfirmedSignatureInfo[]> => {
  const MAIN_NET = solanaWeb3.clusterApiUrl('mainnet-beta');
  const solanaConnection = new solanaWeb3.Connection("https://solana-mainnet.g.alchemy.com/v2/0nbjkAqdUweHtmwAtbquzsIBqcQa4Ewb");
  
  const getAddressTransactions = async (address: string, numTx = 100): Promise<solanaWeb3.ConfirmedSignatureInfo[]> => {
      const pubKey = new solanaWeb3.PublicKey(address);
      console.log(pubKey);
      
      const transactionList = await solanaConnection.getSignaturesForAddress(pubKey, { limit: numTx });
      const balance = await solanaConnection.getBalance(pubKey);
    
      return transactionList;
  };

  return getAddressTransactions(address);
}

const getBalance = async (address: string): Promise<number> => {
  const MAIN_NET = solanaWeb3.clusterApiUrl('mainnet-beta');
  const solanaConnection = new solanaWeb3.Connection("https://solana-mainnet.g.alchemy.com/v2/0nbjkAqdUweHtmwAtbquzsIBqcQa4Ewb");
  
  const getBalance = async (address: string, numTx = 100): Promise<number> => {
      const pubKey = new solanaWeb3.PublicKey(address);
      console.log(pubKey);
      
      const balance = await solanaConnection.getBalance(pubKey);
    
      return balance;
  };

  return getBalance(address);
}
export default function HistoryTransaction() {
  const [transactions, setTransactions] = useState<solanaWeb3.ConfirmedSignatureInfo[] | null>(null);
  const [balance, setBalance] = useState<number>(0);
  // const address = "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"; // Replace with the actual address
  const params = useParams()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getTransaction(params.address as string);
        setTransactions(balanceData);
        console.log(balanceData);
        const balance = await getBalance(params.address as string);
        setBalance(balance)
        
      } catch (error) {
        console.error('Error fetching balance:', error);
        setTransactions(null);
      }
    };

    fetchBalance();
  }, [params.address]);

  return (
    <div>
      <p>balance : {balance / Lamport}</p>
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
