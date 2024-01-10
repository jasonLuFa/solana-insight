"use client";
import React, { useState, useEffect } from 'react';
import Moralis from "moralis";
import { SolNetwork } from "@moralisweb3/common-sol-utils";
import { usePathname, useParams } from 'next/navigation';

interface GetBalanceResponse {
  lamports: string;
  solana: string;
}

export const getBalance = async (address:string) => {
  // await Moralis.start({
  //   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBiZTE2ZjlkLWQ2YWMtNDc5YS04YzVjLTcwMzJkYzBlYzk0YyIsIm9yZ0lkIjoiMzcxMDM4IiwidXNlcklkIjoiMzgxMzI2IiwidHlwZUlkIjoiNTFiNTk1ZmItNjJjMC00ZWE2LWIyNTMtNTZhMDNhZGVmZmI1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDQ1MzI0NTYsImV4cCI6NDg2MDI5MjQ1Nn0.IIXrk9gUfOsnDTj5q2JVuWH89cBlxcAPTz2YcY5qnMw",
  //   // ...and any other configuration
  // });

  const network = SolNetwork.MAINNET;

  const response = await Moralis.SolApi.account.getBalance({
    address,
    network,
  });

  const balanceData: GetBalanceResponse = response.toJSON();
  return balanceData;
};

export default function Balance({ address }: { address: string }) {
  const [balance, setBalance] = useState<GetBalanceResponse | null>(null);
  // const address = "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"; // Replace with the actual address
  const params = useParams()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await getBalance(address);
        console.log(balanceData);
        
        setBalance(balanceData);
        
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [address]);

  return (
    <div>
      {balance ? (
        <p className="text text-xs">Sol : {balance.solana}</p>
      ) : (
        <span className='loading'></span>
      )}
    </div>
  );
}
