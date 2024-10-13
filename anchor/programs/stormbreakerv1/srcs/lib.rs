#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("2zdATqXkAkoFzJ5FPWoC2wkrS1BC5iDeDAebJx9xwM8P");

#[program]
pub mod stormbreakerv1 {
    use super::*;

  pub fn close(_ctx: Context<CloseStormbreakerv1>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.stormbreakerv1.count = ctx.accounts.stormbreakerv1.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.stormbreakerv1.count = ctx.accounts.stormbreakerv1.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeStormbreakerv1>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.stormbreakerv1.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeStormbreakerv1<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Stormbreakerv1::INIT_SPACE,
  payer = payer
  )]
  pub stormbreakerv1: Account<'info, Stormbreakerv1>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseStormbreakerv1<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub stormbreakerv1: Account<'info, Stormbreakerv1>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub stormbreakerv1: Account<'info, Stormbreakerv1>,
}

#[account]
#[derive(InitSpace)]
pub struct Stormbreakerv1 {
  count: u8,
}
