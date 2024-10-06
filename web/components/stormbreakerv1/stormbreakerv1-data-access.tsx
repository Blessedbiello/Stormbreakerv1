'use client';

import {
  getStormbreakerv1Program,
  getStormbreakerv1ProgramId,
} from '@stormbreakerv1/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useStormbreakerv1Program() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getStormbreakerv1ProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getStormbreakerv1Program(provider);

  const accounts = useQuery({
    queryKey: ['stormbreakerv1', 'all', { cluster }],
    queryFn: () => program.account.stormbreakerv1.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['stormbreakerv1', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ stormbreakerv1: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useStormbreakerv1ProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useStormbreakerv1Program();

  const accountQuery = useQuery({
    queryKey: ['stormbreakerv1', 'fetch', { cluster, account }],
    queryFn: () => program.account.stormbreakerv1.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['stormbreakerv1', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ stormbreakerv1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['stormbreakerv1', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ stormbreakerv1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['stormbreakerv1', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ stormbreakerv1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['stormbreakerv1', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ stormbreakerv1: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
