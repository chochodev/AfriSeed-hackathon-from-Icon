import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: "e4a28af25dab6b700d1362db66298cf8"
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(84532),
  address: "0xfB107980714fcAf1EE5DB03a6Bd3d79A281B0b56",
});
