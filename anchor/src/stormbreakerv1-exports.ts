// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import Stormbreakerv1IDL from '../target/idl/stormbreakerv1.json';
import type { Stormbreakerv1 } from '../target/types/stormbreakerv1';

// Re-export the generated IDL and type
export { Stormbreakerv1, Stormbreakerv1IDL };

// The programId is imported from the program IDL.
export const STORMBREAKERV1_PROGRAM_ID = new PublicKey(
  Stormbreakerv1IDL.address
);

// This is a helper function to get the Stormbreakerv1 Anchor program.
export function getStormbreakerv1Program(provider: AnchorProvider) {
  return new Program(Stormbreakerv1IDL as Stormbreakerv1, provider);
}

// This is a helper function to get the program ID for the Stormbreakerv1 program depending on the cluster.
export function getStormbreakerv1ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return STORMBREAKERV1_PROGRAM_ID;
  }
}
