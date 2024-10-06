import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Stormbreakerv1 } from '../target/types/stormbreakerv1';

describe('stormbreakerv1', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Stormbreakerv1 as Program<Stormbreakerv1>;

  const stormbreakerv1Keypair = Keypair.generate();

  it('Initialize Stormbreakerv1', async () => {
    await program.methods
      .initialize()
      .accounts({
        stormbreakerv1: stormbreakerv1Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([stormbreakerv1Keypair])
      .rpc();

    const currentCount = await program.account.stormbreakerv1.fetch(
      stormbreakerv1Keypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Stormbreakerv1', async () => {
    await program.methods
      .increment()
      .accounts({ stormbreakerv1: stormbreakerv1Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.stormbreakerv1.fetch(
      stormbreakerv1Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Stormbreakerv1 Again', async () => {
    await program.methods
      .increment()
      .accounts({ stormbreakerv1: stormbreakerv1Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.stormbreakerv1.fetch(
      stormbreakerv1Keypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Stormbreakerv1', async () => {
    await program.methods
      .decrement()
      .accounts({ stormbreakerv1: stormbreakerv1Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.stormbreakerv1.fetch(
      stormbreakerv1Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set stormbreakerv1 value', async () => {
    await program.methods
      .set(42)
      .accounts({ stormbreakerv1: stormbreakerv1Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.stormbreakerv1.fetch(
      stormbreakerv1Keypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the stormbreakerv1 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        stormbreakerv1: stormbreakerv1Keypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.stormbreakerv1.fetchNullable(
      stormbreakerv1Keypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
