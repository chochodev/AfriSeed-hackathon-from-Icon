import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { CLIENT_ID, CONTRACT_ADDRESS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
