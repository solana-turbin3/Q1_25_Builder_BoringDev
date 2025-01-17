use solana_client::rpc_client::RpcClient;
use solana_program::{pubkey::Pubkey, system_instruction::transfer};
use solana_sdk::{signature::{Keypair, Signer, read_keypair_file}, transaction::Transaction};
use std::str::FromStr;
use solana_sdk::message::Message;

const RPC_URL: &str = "https://api.devnet.solana.com";

fn main() {
    // Import our keypair
    let keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");

    // Define the recipient's public key (Turbin3 public key in this case)
    let to_pubkey = Pubkey::from_str("FUcqVi1zyKKhPww7m1hxMKmjzHLiPA5v9Aacd1gYWvBt")
        .expect("Invalid public key format");

    // Create an RPC client
    let rpc_client = RpcClient::new(RPC_URL);

    // Get the recent blockhash
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .expect("Failed to get recent blockhash");

    // Get the wallet balance
    let balance = rpc_client
        .get_balance(&keypair.pubkey())
        .expect("Failed to get balance");

    // Calculate the transaction fee
    let message = Message::new_with_blockhash(
        &[transfer(&keypair.pubkey(), &to_pubkey, balance)], // Transfer the full balance
        Some(&keypair.pubkey()),
        &recent_blockhash,
    );
    
    // Get the fee for this transaction
    let fee = rpc_client
        .get_fee_for_message(&message)
        .expect("Failed to get fee calculator");

    // If the balance is greater than the fee, proceed to send the transfer
    if balance > fee {
        let transaction = Transaction::new_signed_with_payer(
            &[transfer(&keypair.pubkey(), &to_pubkey, balance - fee)], // Transfer balance minus fee
            Some(&keypair.pubkey()),
            &vec![&keypair],
            recent_blockhash,
        );

        // Send the transaction and wait for confirmation
        let signature = rpc_client
            .send_and_confirm_transaction(&transaction)
            .expect("Failed to send transaction");

        // Print the transaction URL
        println!(
            "Success! Check out your TX here: https://explorer.solana.com/tx/{}/?cluster=devnet",
            signature
        );
    } else {
        println!("Insufficient funds to cover the transaction fee.");
    }
}
