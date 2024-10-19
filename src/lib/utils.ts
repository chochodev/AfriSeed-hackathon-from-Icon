import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// :::::::::::: global env variable
export const CONTRACT_ADDRESS = import.meta.env.VITE_APP_CONTRACT_ADDRESS;
export const CLIENT_ID = import.meta.env.VITE_APP_PUBLIC_CLIENT_ID;

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: CLIENT_ID
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(84532),
  address: CONTRACT_ADDRESS
});
