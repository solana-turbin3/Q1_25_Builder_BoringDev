import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("4GqVWURAoyVrfPNKXq5ni8AE6C1QaeoqceGf96K1uGrQ");

// Recipient address
const to = new PublicKey("KiraZNkDvqQrP4zd9eE71gySYo1fV6HNVeA2LqZBZSb");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromWallet = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toWallet = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created
    const signature = await transfer(
      connection,
      keypair,
      fromWallet.address,
      toWallet.address,
      keypair,
      100
    );

    console.log("Transaction Signature: {}", signature);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();